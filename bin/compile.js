require('babel/register');

const config   = require('../config');
const debug    = require('debug')('kit:bin:compile');
console.log(config)
debug('Create webpack compiler.');

const compiler = require('webpack')(
  require('../build/webpack/' + config.env)
);

compiler.run(function (err, stats) {
  const jsonStats = stats.toJson();

  debug('Webpack compile completed.');
  console.log(stats.toString({
    chunks : false,
    chunkModules : false,
    colors : true
  }));

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err);
    process.exit(1);
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.');
    process.exit(1);
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.');

    if (config.compiler_fail_on_warning) {
      process.exit(1);
    }
  }
});
