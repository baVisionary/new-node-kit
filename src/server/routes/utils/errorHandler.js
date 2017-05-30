/*eslint-disable no-console */
import {default as log} from '../../core/logger'
//create logger;
let logger = new log();

let errorHandler  = function() {
    let service = {
        init: init,
        mode: 'dev',
        logErrors: logErrors
    };
    return service;

    function init(err, req, res, next) {
        res.status(err['status'] || 500);
        if (err.message) {
          res.render('error', {
            message: err.message,
            error: err
          });

        }
        else {
                res.render('error', {
                message: err,
                error: err
          });
        }

        next();
    }

    /* Our fall through error logger and errorHandler  */
    function logErrors(err, req, res, next) {
        var status = err.statusCode || 500;
        logger.log(`${status}  ${(err.message ? err.message : err)}`,'error');
        if (err.stack) {
            logger.log(err.stack,'error');
        }
        next(err);
    }
};

export default errorHandler
