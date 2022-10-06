const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: [/\.css$/, /\.less$/],
    use: [
      "style-loader",
      "css-loader",
      "postcss-loader",
      {
        loader: "less-loader",
        options: { lessOptions: { javascriptEnabled: true } },
      },
    ],
  })
);
