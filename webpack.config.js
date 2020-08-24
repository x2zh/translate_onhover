const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const config = {
  devtool: 'inline-source-map',
  mode,
  entry: {
    background: './src/background.js',
    contentscript: './src/contentscript.js',
    options_script: './src/lib/options_script.js',
    tat_popup: './src/lib/tat_popup.js',
    popup: './src/lib/popup.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-classes']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin(
      [
        'manifest.json',
        'options.html',
        'src/lib/popup.html',
        'src/lib/tat_popup.html',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/xregexp/xregexp-all.js',
        'src/refresh_blue.png',
        'src/refresh_grey.png',
        'src/to_128.png',
        'src/to_16.png',
        'src/to_19.png',
        'src/to_38.png',
        'src/to_48.png',
        'src/to_bw_19.png',
        'src/to_bw_38.png',
      ],
      {
        to: 'build/dist',
      }
    )
  ]
}

module.exports = config
