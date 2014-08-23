module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist/js',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {loader: 'jsx-loader'}
    ]
  }
};
