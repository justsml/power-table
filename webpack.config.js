// To build for release: NODE_ENV=production npm run build
const webpack = require('webpack');

const plugins = [];
const env     = process.env.NODE_ENV;

var suffix = '.js',
  devtool = 'inline-source-map';

if (env === 'production') {
  devtool = undefined;
  suffix = '.min.js';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['PowerTable', 'exports', 'require']
    }
  }));
}

module.exports = {
  devtool: devtool,
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'power-table.bundle' + suffix,
    library: 'PowerTable',
    umdNamedDefine: false,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      // { test: /\.css$/, exclude: /\.useable\.css$/, loader: 'style!css' },
      // { test: /\.useable\.css$/, loader: 'style/useable!css' },
      { test: require.resolve("./index.js"), loader: "expose?PowerTable" },
      { test: /\.less$/, loader: 'css!less' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: plugins
};
