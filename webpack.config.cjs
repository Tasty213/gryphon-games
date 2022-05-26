const sourceFolder = './src';
const fs = require('fs');
const path = require('path');


const configs = fs.readdirSync(sourceFolder, {withFileTypes: true})
    .filter((item) => item.isDirectory())
    .map((item) => require(`${sourceFolder}/${item.name}/webpack.config.cjs`));

const mainConfig = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, './gryphon-games-dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /gryphon-games\.php/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
};

configs.push(mainConfig);

module.exports = configs;
