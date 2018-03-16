
/**
 The pbf parser is responsible for configuring and executing a pbf parser and
 returning a valid readable stream.
 **/

let fs = require('fs'),
    pbf2json = require('pbf2json'),
    settings = require('../../../../config/config.js'),
    features = require('../config/features'),
    path = require('path');

// Create a new pbf parser stream
function createPbfStream(opts){

    let conf = config(opts);

    validatePath( conf.file, 'failed to stat pbf file: ' + conf.file );
    validatePath( conf.leveldb, 'failed to stat leveldb path: ' + conf.leveldb );
    validateTags( conf.tags );

    return pbf2json.createReadStream(conf);
}

// Generate configuration options for pbf2json, apply default
// configurations where not explicitly specified.
function config(opts){

    if (!opts){
        opts = {};
    }

    // Use datapath setting from your config file
    // @see: github://pelias/config for more info.
    if(!opts.file){
        let filename = settings.importers.osm.filename;
        opts.file = path.join(settings.importers.osm.dataPath, filename);
    }

    // Use leveldb setting from your config file
    // @see: github://pelias/config for more info.
    if(!opts.leveldb){
        opts.leveldb = settings.importers.osm.ldbPath;
    }

    // Use default parser tags
    if(!opts.tags){
        opts.tags = features;
    }
    return opts;
}

// Check path exists
function validatePath( path, message ){
    try {
        fs.statSync( path );
    } catch( e ){
        throw new Error( message );
    }
}

// Validate the tag list
function validateTags( tags ){
    if( !Array.isArray(tags) || !tags.length ) {
        throw new Error( 'invalid tags' );
    }
}

module.exports.config = config;
module.exports.parser = createPbfStream;
