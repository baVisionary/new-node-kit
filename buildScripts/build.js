import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import {default as Logger} from '../src/server/core/logger'
let logger = new Logger();

process.env.NODE_ENV = 'production';

logger.log('Generating minified bundle for production. This will take a moment...','info');

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    logger.log(err, 'error');
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => logger.log(error,'error'));
  }

  if (jsonStats.hasWarnings) {
    logger.log('Webpack generated the following warnings: ', 'warn');
    jsonStats.warnings.map(warning => logger.log(warning),'warn');
  }

  logger.log(`Webpack stats: ${stats}`,'info');

  // if we got this far, the build succeeded.
  logger.log('Your app has been built for production and written to /dist!','info');

  return 0;
});
