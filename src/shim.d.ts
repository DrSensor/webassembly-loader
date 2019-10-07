declare module 'schema-utils' {
  import { OptionObject } from 'loader-utils';
  import { Definition } from 'typescript-json-schema';

  export default function(
    schema: Definition | null,
    options: OptionObject,
    name: string
  ): void;
}
