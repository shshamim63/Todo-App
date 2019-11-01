const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  output: {
    filename: 'main.[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'images',
          },
        },
      },
    ],
  },
};
