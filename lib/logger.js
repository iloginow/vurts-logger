import chalk from 'chalk';
import loglevel from 'loglevel';
import loglevelPluginPrefix from 'loglevel-plugin-prefix';
import loglevelFileSave from 'loglevel-filesave';

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

const normalPrefixSetup = {
  template: `${chalk.green('[VURTS]')} %t %l %n`,
  levelFormatter(level) {
    return colors[level.toUpperCase()](level.toUpperCase());
  },
  nameFormatter(name) {
    return chalk.green(`[${name}]:`);
  },
  timestampFormatter(timestamp) {
    return chalk.yellow(timestamp.toISOString());
  },
};

const errorPrefixSetup = {
  template: `${chalk.red('[VURTS]')} %t %l %n`,
  levelFormatter(level) {
    return chalk.red(level.toUpperCase());
  },
  nameFormatter(name) {
    return chalk.yellow(`[${name}]:`);
  },
  timestampFormatter(timestamp) {
    return chalk.yellow(timestamp.toISOString());
  },
};

class Logger {
  constructor(ctx = {}) {
    this.name = ctx.name || 'vurts';
    this.loglevel = loglevel;
    this.loglevel.enableAll();
    this.loglevelPluginPrefix = this.getLoglevelPluginPrefix();
    this.loglevelFileSave = loglevelFileSave;
    if (ctx.file) this.enableFileSave(ctx.file);
  }

  getLoglevelPluginPrefix() {
    loglevelPluginPrefix.reg(this.loglevel);
    loglevelPluginPrefix.apply(this.loglevel, normalPrefixSetup);
    return loglevelPluginPrefix;
  }

  enableFileSave(file) {
    this.loglevelFileSave(this.loglevel, { file });
  }

  trace(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.trace(...params);
  }

  debug(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.debug(...params);
  }

  log(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.log(...params);
  }

  info(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.info(...params);
  }

  warn(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.warn(...params);
  }

  error(...params) {
    const logger = this.loglevel.getLogger(this.name);
    loglevelPluginPrefix.apply(logger, errorPrefixSetup);
    logger.error(...params);
  }
}

export default Logger;
