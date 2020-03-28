/**
 * index.js
 * Entry file for express server
 */

// Node Modules
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';

// Config
import APP from 'app';
import webpackConfig from './webpack.config';

const compiler = webpack(webpackConfig({express: true}));

let PORT;
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  PORT = APP.development.port;
} else {
  PORT = APP.production.port;
}

const middlewareOptions = {
  noInfo: true,
  publicPath: APP.express.publicPath,
};

const app = express();

// Webpack Hot Loading
app.use(middleware(compiler, middlewareOptions));
app.use(hot(compiler));

// Static Directory
app.use(express.static(path.join(__dirname, APP.express.static)));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, APP.express.static)),
);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.info(`Listening on ${PORT}`));
