import fs from 'fs';
import path from 'path';
import { Tree } from '@angular-devkit/schematics';

export function getLibraryVersion() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
  ).version;
}

export function addPackageToPackageJson(
  host: Tree,
  pkg: string,
  version: string
): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

export function addAssetToProject(
  host: Tree,
  asset: string,
  assetArray: 'assets'|'styles'|'scripts',
  projectNameInput?: string
): Tree {
  if (host.exists('angular.json')) {
    const sourceText = host.read('angular.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    const projectName = projectNameInput || json.defaultProject;
    const projectConfig = json.projects[projectName];

    if (!projectConfig) {
      return host;
    }

    let configs: any[] = projectConfig.architect.build.options[assetArray];

    if (!configs) {
      configs = [asset];
    } else {
      configs = [asset].concat(configs);
    }

    projectConfig.architect.build.options[assetArray] = configs;

    host.overwrite('angular.json', JSON.stringify(json, null, 2));
  }

  return host;
}

function sortObjectByKeys(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}
