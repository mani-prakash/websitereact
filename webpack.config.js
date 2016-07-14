
module.exports = {
    entry :
        './src/main.jsx',
    output : {
        path : './',
        filename : 'app.js'
    },
    devserver :{
        inline:true
    },
    module : {
        loaders : [{
            test : /\.jsx?$/,
            exclude: [/bower_components/, /node_modules/,/Gruntfile.js/],
            loader : 'babel-loader',
            query:{
                presets: ['es2015','react','stage-0'],
                plugins: ["transform-react-jsx","transform-runtime"]
            }
        }
        ]
    }
};