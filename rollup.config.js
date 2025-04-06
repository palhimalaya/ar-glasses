const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
module.exports = {
  input: './src/index.ts',
  output: {
    file: 'dist/ar-glasses.umd.js',
    format: 'umd',
    name: 'ARGlasses',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
      inlineSources: true,
    }),
    terser(),
  ],
};