let path = require('path');

module.exports={
    schema:{
        indexName:"jdgeocoder"
    },
    elasticSearch:{
        apiVersion: "6.2",
        keepAlive: true,
        requestTimeout: "120000",
        hosts: [{
            env: "development",
            protocol: "http",
            host: "localhost",
            port: 9200
        }],
        log: [{
            type: "stdio",
            level: [ "error", "warning" ]
        }]
    },
    logger: {
        level: "debug",
        timestamp: true,
        colorize: true
    },
    importers:{
        osm:{
            dataPath:path.resolve(__dirname,"../../data/osm/"),
            ldbPath:path.resolve(__dirname,"../../data/osmTemp/"),
            import:[{
                filename:"india-latest.osm.pbf"
            }],
            download: [{
                sourceURL: "https://download.geofabrik.de/asia/india-latest.osm.pbf"
            }],
        },
        jd:{
            dataPath:path.resolve(__dirname,"../data/jd/"),
            filename:[]
        }
    }

};