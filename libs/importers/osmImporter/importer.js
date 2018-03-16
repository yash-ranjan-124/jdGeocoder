const logger = require('../../util/logger').get('osm');
const importPipeline = require('./streams/importPipeline');


function startImport(){
   logger.info("Starting OSM import!!");
    importPipeline.import();
}

module.exports = {
    start:startImport
};
