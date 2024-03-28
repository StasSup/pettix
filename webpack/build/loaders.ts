import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function loaders(options: BuildOptions): Array<webpack.RuleSetRule> {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: options.isDev
              ? '[path][name]__[local]--[hash:base64:8]'
              : '[hash:base64:8]',
          },
        }
      },
      "sass-loader",
    ]
  }

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const svgLoader = {
    test: /\.(svg)$/,
    use: [
      {loader: 'babel-loader'},
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
        },
      },
    ],
  }

  return [typescriptLoader, cssLoader, svgLoader]
}