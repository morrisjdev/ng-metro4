import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import {addAssetToProject, addPackageToPackageJson, getDependencyVersion, getLibraryVersion} from '../utils';

import { Schema as NgAddOptions } from './schema';

export default function(options: NgAddOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const version = getLibraryVersion();
    addPackageToPackageJson(host, 'ng-metro4', `^${version}`);
    const metro4Version = getDependencyVersion('metro4');
    addPackageToPackageJson(host, 'metro4', `${metro4Version}`);
    const momentVersion = getDependencyVersion('moment');
    addPackageToPackageJson(host, 'moment', `${momentVersion}`);
    context.logger.log('info',
      `✅ Added "ng-metro4@^${version}", "metro4@${metro4Version}", ` +
      `and "moment@${momentVersion}" into dependencies`);

    if (options.skipInstall) {
      context.logger.log(
        'warn',
        `⚠ The "--skip-install" flag was present, don't forget to install package manually`
      );
    } else {
      context.logger.log('info', `✅ Installing added packages...`);
      context.addTask(new NodePackageInstallTask());
    }

    addAssetToProject(host, 'node_modules/metro4/build/css/metro-all.min.css', 'styles', options.project);
    context.logger.log('info', '✅ Added assets to "angular.json"');

    return host;
  };
}
