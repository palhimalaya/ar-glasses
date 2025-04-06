const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      name: 'arGlasses',
      type: 'umd',
    },
    globalObject: 'this',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(bin|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'models/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
    },
  },
  optimization: {
    splitChunks: false, 
    runtimeChunk: false,
  },
  experiments: {
    topLevelAwait: true,
  },
  target: 'web',
};
