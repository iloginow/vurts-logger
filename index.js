import Logger from './lib/logger.js';

const logger = new Logger({ name: 'test' });
logger.info('Something happened');

export default Logger;
