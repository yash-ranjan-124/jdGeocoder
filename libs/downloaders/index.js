let osmDownloader = require('./osmDownloader/downloader');
let jdDownloader = require('./jdDownloader/downloader');

function downloadData(type) {
    if(type == "osm"){
        osmDownloader.start();
    }else if(type == "jd"){
        jdDownloader.start();
    }else{
        console.log({err:"no such type!!"});
        return false;
    }
}

module.exports = downloadData;