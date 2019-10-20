import {apply, MergeStrategy, mergeWith, Rule, SchematicContext, template, Tree, url} from '@angular-devkit/schematics';
import {Schema as LayoutOptions} from './schema';

export default function(options: LayoutOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const sourceTemplate = url('./files');

    const sourceParametrizedTemplate = apply(sourceTemplate, [
      template({
        ...options
      })
    ]);

    return mergeWith(sourceParametrizedTemplate, MergeStrategy.Overwrite)(host, context);
  };
}
