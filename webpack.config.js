const path=require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports=()=>{
    return {
    entry:'./public/App.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'public')
    },
    mode:'development',
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, 
        { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin()
        ]
      }
,    
   devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}

}
