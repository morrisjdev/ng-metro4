import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import {addAssetToProject, addPackageToPackageJson, getLibraryVersion} from '../utils';

import { Schema as NgAddOptions } from './schema';

export default function(options: NgAddOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const version = getLibraryVersion();
    addPackageToPackageJson(host, 'ng-metro4', `^${version}`);
    addPackageToPackageJson(host, 'metro4', `^4.3.1`);
    addPackageToPackageJson(host, 'linq4js', `^2.2.2`);
    addPackageToPackageJson(host, 'moment', `^2.24.0`);
    context.logger.log(
      'info',
      `Added "ng-metro4@^${version}", "metro4@4.3.1", "linq4js@2.2.2" and "moment@2.24.0" into dependencies`
    );

    if (options.skipInstall) {
      context.logger.log(
        'warn',
        `The "--skip-install" flag was present, don't forget to install package manually`
      );
    } else {
      context.logger.log('info', `Installing added packages...`);
      context.addTask(new NodePackageInstallTask());
    }

    addAssetToProject(host, 'node_modules/metro4/build/css/metro-all.min.css', 'styles', options.project);
    addAssetToProject(host, 'node_modules/metro4/build/js/metro.min.js', 'scripts', options.project);
    context.logger.log('info', 'Added assets to "angular.json"');

    return host;
  };
}
