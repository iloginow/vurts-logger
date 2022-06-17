import loglevel from 'loglevel';
import loglevelPluginPrefix from 'loglevel-plugin-prefix';
import loglevelFileSave from 'loglevel-filesave';
import { normalPrefixSetup, errorPrefixSetup } from './prefix.js';

/**
 * Class representing a Logger.
 */
class Logger {
  /**
   * Create a new `Logger`.
   * Initialize a loglevel instance and the plugins.
   *
   * @param {Object} [ctx] Execution context
   * @param {String} [ctx.name] Module name
   * @param {String} [ctx.file] Log file path (optional)
   */
  constructor(ctx = {}) {
    this.name = ctx.name || 'vurts';
    this.loglevel = loglevel;
    this.loglevel.enableAll();
    this.loglevelPluginPrefix = this.getLoglevelPluginPrefix();
    this.loglevelFileSave = loglevelFileSave;
    if (ctx.file) this.enableFileSave(ctx.file);
  }

  /**
   * Initialize the loglevel prefix plugin,
   * bind it to the loglevel instance.
   *
   * @return {Object} A loglevel prefix plugin instance
   * @private
   */
  getLoglevelPluginPrefix() {
    loglevelPluginPrefix.reg(this.loglevel);
    loglevelPluginPrefix.apply(this.loglevel, normalPrefixSetup);
    return loglevelPluginPrefix;
  }

  /**
   * Enable the loglevel file save plugin,
   * bind it to the loglevel instance.
   *
   * @private
   */
  enableFileSave(file) {
    this.loglevelFileSave(this.loglevel, { file });
  }

  /**
   * Create a TRACE log record (shows the actual trace)
   *
   * @public
   */
  trace(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.trace(...params);
  }

  /**
   * Create a DEBUG log record
   *
   * @public
   */
  debug(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.debug(...params);
  }

  /**
   * Create a DEBUG log record (an alias for debug)
   *
   * @public
   */
  log(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.log(...params);
  }

  /**
   * Create an INFO log record
   *
   * @public
   */
  info(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.info(...params);
  }

  /**
   * Create a WARN log record
   *
   * @public
   */
  warn(...params) {
    const logger = this.loglevel.getLogger(this.name);
    logger.warn(...params);
  }

  /**
   * Create an ERROR log record
   *
   * @public
   */
  error(...params) {
    const logger = this.loglevel.getLogger(this.name);
    loglevelPluginPrefix.apply(logger, errorPrefixSetup);
    logger.error(...params);
  }
}

export default Logger;
