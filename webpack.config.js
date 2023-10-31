const path = require('path')

module.exports = {
  entry: './src/contentscript.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: ['/node_modules/', '/src/Tests/'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'contentscript.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
