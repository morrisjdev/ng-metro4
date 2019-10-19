import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { Schema as LayoutOptions } from './schema';

export default function(options: LayoutOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const sourceTemplate = url('./files');

    const sourceParametrizedTemplate = apply(sourceTemplate, [
      template({
        ...options
      })
    ]);

    return mergeWith(sourceParametrizedTemplate)(host, context);
  };
}
