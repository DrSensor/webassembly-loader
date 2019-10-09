import * as path from 'path';
import { generateSchema, getProgramFromFiles } from 'typescript-json-schema';
import tsconfig from '../tsconfig.json';

export type WebAssemblyLoaderExportType =
  | 'buffer'
  | 'instance'
  | 'module'
  | 'async'
  | 'async-instance'
  | 'async-module';

export interface WebAssemblyLoaderOptions {
  export?: WebAssemblyLoaderExportType;
}

// bear in mind this is ran from dist
const program = getProgramFromFiles(
  [path.resolve(__dirname, '../types/options.d.ts')],
  tsconfig.compilerOptions,
  path.resolve(__dirname, '..')
);

export const schema = generateSchema(program, 'WebAssemblyLoaderOptions', {
  noExtraProps: true
});
