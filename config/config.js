let path = require('path');

module.exports={
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
    importers:{
        osm:{
            dataPath:path.resolve(__dirname,"../data/osm/"),
            filename:"india-latest-osm.pbf"
        },
        jd:{
            dataPath:path.resolve(__dirname,"../data/jd/"),
            filename:[]
        }
    }

};