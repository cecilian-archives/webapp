const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/_/functions/", {
      target: "http://localhost:9000/",
      pathRewrite: {
        "^/_/functions": "",
      },
    })
  );
};
