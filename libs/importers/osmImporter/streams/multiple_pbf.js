let combinedStream = require('combined-stream');
let pbf = require('./protobufHandler');
let path = require('path');
let logger = require('../../../util/logger').get('osm');

function createCombinedStream(){
    let fullStream = combinedStream.create();
    let defaultPath= require('../../../../config/config').importers.osm;
    defaultPath.import.forEach(function( importObject){
        let conf = {file: path.join(defaultPath.dataPath, importObject.filename), leveldb: defaultPath.ldbPath};
        fullStream.append(function(next){
            logger.info('Creating read stream for: ' + conf.file);
            next(pbf.parser(conf));
        });
    });
console.log(fullStream);
    return fullStream;

}

module.exports.create = createCombinedStream;
