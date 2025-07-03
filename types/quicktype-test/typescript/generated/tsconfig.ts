export interface Tsconfig {
    compilerOptions: CompilerOptions;
    include:         string[];
    exclude:         string[];
}

export interface CompilerOptions {
    target:                           string;
    module:                           string;
    lib:                              string[];
    declaration:                      boolean;
    outDir:                           string;
    strict:                           boolean;
    esModuleInterop:                  boolean;
    skipLibCheck:                     boolean;
    forceConsistentCasingInFileNames: boolean;
}
