declare module '@webpack-contrib/schema-utils' {
  import { OptionObject } from 'loader-utils';

  interface Options {
    name: string;
    schema: { [key: string]: any };
    target: OptionObject;
  }

  const validate: (options: Options) => void;
  export default validate;
}

declare interface Options {
  [key: string]: any;
}
