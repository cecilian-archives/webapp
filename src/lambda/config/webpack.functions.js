// Work around the really annoying issue with Webpack minification
// of the node-formidable module used by create-react-app-lambda
// https://github.com/netlify/netlify-lambda/issues/64
// --BAG 28 March 2019

const webpack = require("webpack");

module.exports = {
  mode: "development",
  plugins: [new webpack.DefinePlugin({ "global.GENTLY": false })],
};
