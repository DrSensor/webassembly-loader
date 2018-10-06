declare module '@webpack-contrib/test-utils' {
  import { Stats, Configuration } from 'webpack';
  type Path = string;

  const compiler: (
    fixture: Path,
    config: Configuration,
    options: { [key: string]: any } /*🤔*/
  ) => Promise<Stats>;

  export default compiler;
}

declare module './helpers/on.js' {
  import { Stats, Configuration } from 'webpack';
  const on: (stats: Stats) => any;

  export default on;
}
