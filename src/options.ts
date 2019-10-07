import * as path from 'path';
import { generateSchema, getProgramFromFiles } from 'typescript-json-schema';

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
  { strict: true },
  path.resolve(__dirname, '..')
);

export const schema = generateSchema(program, 'WebAssemblyLoaderOptions', {
  noExtraProps: true
});
