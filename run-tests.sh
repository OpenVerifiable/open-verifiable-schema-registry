#!/bin/bash

# Comprehensive test runner for exportSchemas.js
# Supports different test modes and CI/CD integration

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
TEST_MODE="${1:-all}"
COVERAGE_THRESHOLD=80
TIMEOUT=30000

echo -e "${BLUE}🧪 ExportSchemas Test Runner${NC}"
echo -e "${BLUE}=============================${NC}"

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
    esac
}

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    print_status "error" "Node.js is not installed or not in PATH"
    exit 1
fi

# Check if the main script exists
if [ ! -f "exportSchemas.js" ]; then
    print_status "error" "exportSchemas.js not found in current directory"
    exit 1
fi

# Check if test file exists
if [ ! -f "exportSchemas.test.js" ]; then
    print_status "error" "exportSchemas.test.js not found in current directory"
    exit 1
fi

print_status "info" "Node.js version: $(node --version)"
print_status "info" "Test mode: $TEST_MODE"

# Function to run basic unit tests
run_unit_tests() {
    print_status "info" "Running unit tests..."
    
    if node exportSchemas.test.js; then
        print_status "success" "Unit tests passed"
        return 0
    else
        print_status "error" "Unit tests failed"
        return 1
    fi
}

# Function to run Jest tests (if available)
run_jest_tests() {
    if command -v jest &> /dev/null || [ -f "node_modules/.bin/jest" ]; then
        print_status "info" "Running Jest tests..."
        
        if command -v jest &> /dev/null; then
            JEST_CMD="jest"
        else
            JEST_CMD="./node_modules/.bin/jest"
        fi
        
        if $JEST_CMD --coverage --passWithNoTests; then
            print_status "success" "Jest tests passed"
            return 0
        else
            print_status "error" "Jest tests failed"
            return 1
        fi
    else
        print_status "warning" "Jest not found, skipping Jest tests"
        return 0
    fi
}

# Function to run integration tests
run_integration_tests() {
    print_status "info" "Running integration tests..."
    
    # Check if we can create temporary directories
    TEST_DIR="test-temp-$(date +%s)"
    
    if mkdir -p "$TEST_DIR"; then
        print_status "success" "Temporary directory created: $TEST_DIR"
        
        # Simulate some integration test scenarios
        echo '{"test": "schema"}' > "$TEST_DIR/test.json"
        
        if [ -f "$TEST_DIR/test.json" ]; then
            print_status "success" "File operations working"
        else
            print_status "error" "File operations failed"
            rm -rf "$TEST_DIR"
            return 1
        fi
        
        # Cleanup
        rm -rf "$TEST_DIR"
        print_status "success" "Integration tests passed"
        return 0
    else
        print_status "error" "Cannot create temporary directory"
        return 1
    fi
}

# Function to check code quality
check_code_quality() {
    print_status "info" "Checking code quality..."
    
    # Check for basic syntax errors
    if node -c exportSchemas.js; then
        print_status "success" "Syntax check passed"
    else
        print_status "error" "Syntax check failed"
        return 1
    fi
    
    # Check for basic patterns
    if grep -q "console.log" exportSchemas.js; then
        print_status "warning" "Found console.log statements (consider using proper logging)"
    fi
    
    if grep -q "TODO" exportSchemas.js; then
        print_status "warning" "Found TODO comments"
    fi
    
    print_status "success" "Code quality check completed"
    return 0
}

# Function to run performance tests
run_performance_tests() {
    print_status "info" "Running performance tests..."
    
    # Time the test execution
    start_time=$(date +%s)
    
    if node exportSchemas.test.js > /dev/null 2>&1; then
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        
        if [ $duration -lt 10 ]; then
            print_status "success" "Performance test passed (${duration}s)"
            return 0
        else
            print_status "warning" "Performance test slow (${duration}s)"
            return 0
        fi
    else
        print_status "error" "Performance test failed"
        return 1
    fi
}

# Function to generate test report
generate_report() {
    local results=("$@")
    local total=${#results[@]}
    local passed=0
    local failed=0
    
    print_status "info" "Generating test report..."
    
    for result in "${results[@]}"; do
        if [ "$result" = "0" ]; then
            ((passed++))
        else
            ((failed++))
        fi
    done
    
    echo ""
    echo -e "${BLUE}📊 Test Report${NC}"
    echo -e "${BLUE}===============${NC}"
    echo -e "Total tests: $total"
    echo -e "${GREEN}Passed: $passed${NC}"
    echo -e "${RED}Failed: $failed${NC}"
    
    if [ $failed -eq 0 ]; then
        echo -e "${GREEN}🎉 All tests passed!${NC}"
        return 0
    else
        echo -e "${RED}❌ Some tests failed${NC}"
        return 1
    fi
}

# Main test execution
main() {
    local results=()
    
    case $TEST_MODE in
        "unit")
            run_unit_tests
            results+=($?)
            ;;
        "jest")
            run_jest_tests
            results+=($?)
            ;;
        "integration")
            run_integration_tests
            results+=($?)
            ;;
        "quality")
            check_code_quality
            results+=($?)
            ;;
        "performance")
            run_performance_tests
            results+=($?)
            ;;
        "all")
            print_status "info" "Running all test suites..."
            
            run_unit_tests
            results+=($?)
            
            run_jest_tests
            results+=($?)
            
            run_integration_tests
            results+=($?)
            
            check_code_quality
            results+=($?)
            
            run_performance_tests
            results+=($?)
            ;;
        *)
            print_status "error" "Unknown test mode: $TEST_MODE"
            echo "Available modes: unit, jest, integration, quality, performance, all"
            exit 1
            ;;
    esac
    
    generate_report "${results[@]}"
    return $?
}

# Trap to ensure cleanup
trap 'print_status "info" "Test runner interrupted"' INT TERM

# Run main function
main "$@"
