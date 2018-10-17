declare module 'schema-utils' {
  import { OptionObject } from 'loader-utils';

  type Primitive = string | number | boolean;
  interface JSONSchema {
    [key: string]: Primitive | JSONSchema | Primitive[];
  }

  export default function(
    schema: JSONSchema,
    options: OptionObject,
    name: string
  ): void;
}
