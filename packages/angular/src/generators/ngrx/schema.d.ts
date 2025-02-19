export interface NgRxGeneratorOptions {
  directory: string;
  minimal: boolean;
  module?: string;
  parent?: string;
  name: string;
  barrels?: boolean;
  facade?: boolean;
  root?: boolean;
  skipFormat?: boolean;
  skipImport?: boolean;
  skipPackageJson?: boolean;
}
