module.exports = {
  include: ["node_modules"],
  plugins: [
    require("postcss-nested"),
    require("postcss-hexrgba"),
    require("autoprefixer"),
  ],
};
