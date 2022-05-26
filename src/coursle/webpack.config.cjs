const path = require('path');

const config = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, '../../gryphon-games-dist/coursle'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /coursle\.php/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
};

module.exports = config;
