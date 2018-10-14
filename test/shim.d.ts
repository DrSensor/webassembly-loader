declare module '@webpack-contrib/test-utils' {
  import { Stats, Rule } from 'webpack';
  type Path = string;

  const compiler: (
    fixture: Path,
    config: Rule,
    options?: { [key: string]: any } /*🤔*/
  ) => Promise<Stats>;

  export = compiler;
}
