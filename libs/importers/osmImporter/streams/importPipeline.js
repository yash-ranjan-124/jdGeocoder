let logger = require('../../../util/logger').get('osm');
let streams = {};
streams.pbfParser = require('./multiple_pbf').create;


// default import pipeline
streams.import = function(){

    streams.pbfParser();
    console.log(streams);
        /*.pipe( streams.docConstructor() )
        .pipe( streams.tagMapper() )
        .pipe( streams.docDenormalizer() )
        .pipe( streams.addressExtractor() )
        .pipe( streams.categoryMapper( categoryDefaults ) )
        .pipe( streams.adminLookup() )
        .pipe( streams.deduper() )/*
    .pipe( streams.dbMapper() )
    .pipe( streams.elasticsearch() );*/
};

module.exports = streams;
