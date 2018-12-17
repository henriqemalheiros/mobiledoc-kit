import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const deps = []
  .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
  .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);

function config (target) {
  const isUmd = target === 'umd';
  const isModule = target === 'module';
  const input = './src/index.js';

  const plugins = [
    resolve({
      browser: true,
    }),
    isUmd && commonjs({
      exclude: [
        'src/**',
      ],
    }),
    babel({
      include: [ 'src/**' ],
    }),
  ].filter(Boolean);

  if (isUmd) {
    return {
      plugins,
      input,
      output: {
        format: 'umd',
        file: pkg.umd,
        exports: 'named',
        name: 'MobiledocKit',
        globals: pkg.umdGlobals,
      },
      external: Object.keys(pkg.umdGlobals || {}),
    };
  }

  if (isModule) {
    return {
      plugins,
      input,
      output: [
        {
          file: pkg.module,
          format: 'es',
          sourcemap: true,
        },
        {
          file: pkg.main,
          format: 'cjs',
          exports: 'named',
          sourcemap: true,
        },
      ],
      external: id => {
        return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`));
      },
    };
  }
}

export default [
  config('module'),
  config('umd'),
];
