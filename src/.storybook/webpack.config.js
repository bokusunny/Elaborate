const path = require("path")

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, '../components'),
    loader: require.resolve("ts-loader")
  });

  // addon-storysource使うときだけ
  config.module.rules.push({
    test: /\.stories\.(ts|tsx)$/,
    loaders: [
      {
        loader: require.resolve("@storybook/addon-storysource/loader"),
        options: { parser: "typescript" }
      }
    ],
    enforce: "pre"
  })
  config.resolve.extensions.push(".ts", ".tsx")

  return config
}
