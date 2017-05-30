/** This file is where tjhe backend database goes  */
import {default as Logger} from '../../server/core/logger'
let logger = new Logger();
const connectionString = 'mongodb://apiuser:!Agile$@ds117839.mlab.com:17839/live-exam-practice';

import mongodb from 'mongodb';

class Database {
    static connect() {
        return mongodb.MongoClient.connect(connectionString).then((db) => {
            logger.log('successful db connection', 'info');/* eslint-disable no-console */
            this.db = db;
        }).catch((err) => {
            logger.error(err,'error');
        });
    }
}

Object.defineProperty(exports, "__esModule", { value: true });

export default Database;
