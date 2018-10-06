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
}

export default null;
