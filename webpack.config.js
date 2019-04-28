var path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    // dist/ - by default
    filename: "./bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          "presets": [
            "@babel/preset-env",
            
          ],
          "plugins": [
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000
  },
  watch: true
}
