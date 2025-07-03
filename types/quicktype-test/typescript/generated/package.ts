export interface Package {
    name:            string;
    version:         string;
    description:     string;
    main:            string;
    types:           string;
    keywords:        string[];
    scripts:         Scripts;
    dependencies:    Dependencies;
    devDependencies: DevDependencies;
    repository:      Repository;
    license:         string;
    homepage:        string;
}

export interface Dependencies {
    ajv:           string;
    "ajv-formats": string;
}

export interface DevDependencies {
    typescript:    string;
    "@types/node": string;
    jest:          string;
}

export interface Repository {
    type: string;
    url:  string;
}

export interface Scripts {
    build:    string;
    test:     string;
    validate: string;
}
