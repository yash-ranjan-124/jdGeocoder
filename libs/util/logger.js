/**
 * The main module of the logger package.
 */

'use strict';

const winston = require('winston');
const pkgConfig = require('../../config/config.js').logger;

function CreateLogger(name,loggerOpts) {
    if( loggerOpts === undefined ){
        loggerOpts = {
            transports: [
                new winston.transports.Console( {
                    colorize: pkgConfig.colorize,
                    timestamp: pkgConfig.timestamp,
                    level: pkgConfig.level,
                    label: name
                })
            ]
        };
    }

    return new winston.Logger( loggerOpts );
}


let loggers = {};

/**
 * If a logger named `name` exists, return it; otherwise, create a new one.
 */
function getLogger( name, loggerOpts ){
    if( name in loggers ){
        return loggers[ name ];
    }
    else {
        let logger = new CreateLogger( name, loggerOpts );
        loggers[ name ] = logger;
        return logger;
    }
}

module.exports = {
    get: getLogger,
    winston: winston
};