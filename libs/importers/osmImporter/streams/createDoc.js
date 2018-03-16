
/**
 The document constructor is responsible for mapping input data from the parser
 in to model.Document() objects which the rest of the pipeline expect to consume.
 **/

let through = require('through2');
//var Document = require('pelias-model').Document;
let Logger = require( '../../../util/logger' ).get( 'osm' );

function createDocument() {
    let stream = through.obj(function(item,enc,next){
        console.log(item);
    });
    return stream;
}
module.exports = createDocument();

