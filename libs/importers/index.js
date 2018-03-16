let osmImporter = require('./osmImporter/importer');
let jdImporter = require('./jdbusinessImporter/importer');

function importData(type){
    if(type == "osm"){
        osmImporter.start();
    }
    else if(type == "jd"){
        jdImporter.start();
    }else{
        console.log({err:"no such type!!"});
        return false;
    }

}

module.exports = importData;