var path = require('path');

module.exports = {
    entry: ['whatwg-fetch', './src/main/js/app.js'],
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/bundle.js'
    }, 
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src/main/resources/static/',
    port: 8080
  },  
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {/*
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "file-loader?name=/src/main/js/images/[name].[ext]"
				*/
            }
        ]
    }
};