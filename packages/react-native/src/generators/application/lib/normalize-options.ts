import {
  getWorkspaceLayout,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';
import { join } from 'path';
import { Schema } from '../schema';

export interface NormalizedSchema extends Schema {
  className: string; // app name in class name
  projectName: string; // directory + app name in kebab case
  appProjectRoot: string; // app directory path
  lowerCaseName: string; // app name in lower case
  iosProjectRoot: string;
  androidProjectRoot: string;
  parsedTags: string[];
  entryFile: string;
}

export function normalizeOptions(
  host: Tree,
  options: Schema
): NormalizedSchema {
  const { fileName, className } = names(options.name);
  const { appsDir } = getWorkspaceLayout(host);

  const directoryName = options.directory
    ? names(options.directory).fileName
    : '';
  const projectDirectory = directoryName
    ? `${directoryName}/${fileName}`
    : fileName;

  const appProjectName = projectDirectory.replace(/\//g, '-');

  const appProjectRoot = joinPathFragments(appsDir, projectDirectory);
  const iosProjectRoot = join(appProjectRoot, 'ios');
  const androidProjectRoot = join(appProjectRoot, 'android');

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const entryFile = options.js ? 'src/main.js' : 'src/main.tsx';

  /**
   * if options.name is "my-app"
   * name: "my-app", className: 'MyApp', lowerCaseName: 'myapp', displayName: 'MyApp', projectName: 'my-app', appProjectRoot: 'apps/my-app', androidProjectRoot: 'apps/my-app/android', iosProjectRoot: 'apps/my-app/ios'
   * if options.name is "myApp"
   * name: "my-app", className: 'MyApp', lowerCaseName: 'myapp', displayName: 'MyApp', projectName: 'my-app', appProjectRoot: 'apps/my-app', androidProjectRoot: 'apps/my-app/android', iosProjectRoot: 'apps/my-app/ios'
   */
  return {
    ...options,
    unitTestRunner: options.unitTestRunner || 'jest',
    e2eTestRunner: options.e2eTestRunner || 'detox',
    name: fileName,
    className,
    lowerCaseName: className.toLowerCase(),
    displayName: options.displayName || className,
    projectName: appProjectName,
    appProjectRoot,
    iosProjectRoot,
    androidProjectRoot,
    parsedTags,
    entryFile,
  };
}
