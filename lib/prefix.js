import chalk from 'chalk';

/**
 * Chalk colors.
 */
const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

/**
 * Prefix template
 * [VURTS] 2022-06-16T15:14:58.210Z INFO [SomeModule]: Message
 */
const template = `${chalk.green('[VURTS]')} %t %l %n`;

/**
 * Prefix for TRACE, DEBUG, INFO, WARN.
 * Colors: GREEN, YELLOW.
 */
export const normalPrefixSetup = {
  template,
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

/**
 * Prefix for ERROR
 * Colors: RED, YELLOW.
 */
export const errorPrefixSetup = {
  template,
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

/**
 * Prefix for HTTP-REQuEST.
 * Colors: GREEN, YELLOW.
 */
export const httpRequestPrefixSetup = {
  template: `${chalk.green('[VURTS]')} %t ${chalk.green('[HTTP-REQUEST]')} %n`,
  nameFormatter(name) {
    return chalk.green(`[${name}]:`);
  },
  timestampFormatter(timestamp) {
    return chalk.yellow(timestamp.toISOString());
  },
};
