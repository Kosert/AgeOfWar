var path = require("path")

module.exports = {
    entry: {
        "dist/bundle.js": "./srcClient/game.ts",
    },
    output: {
        path: __dirname,
        filename: "[name]"
    },
    module: {
        rules: [{ test: /\.ts?$/, exclude: "/node_modules/", loader: 'ts-loader' }]
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname, "./"),
    //     publicPath: "/dist/",
    //     host: "127.0.0.1",
    //     port: 3000,
    //     open: true
    // },
    resolve: {
        extensions: [".ts", ".js"],
    }
}
