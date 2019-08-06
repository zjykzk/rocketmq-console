const path = require('path')
const apiMocker = require('mocker-api');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader'  ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "less-loader",
            options: {
              //modifyVars: themeVariables
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', {
                legacy: true
              }],
              ['@babel/plugin-proposal-class-properties', {'loose': true}],
              ['import', { libraryName: "antd", style: true  }]
            ]
          }
        }
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    before(app){
      apiMocker(app, path.resolve('./mock/index.js'))
    }
  }
};
