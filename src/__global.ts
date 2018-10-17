declare global {
  namespace Export {
    type Type =
      | 'buffer'
      | 'instance'
      | 'module'
      | 'async'
      | 'async-instance'
      | 'async-module';

    interface Options {
      export: Type;
    }
  }

  namespace Module {
    type Type = 'cjs' | 'esm';

    interface Options {
      export: Export.Type;
      errorHandler?: (message: string) => void | never;
      module?: Type;
    }
  }
}

export default null;
