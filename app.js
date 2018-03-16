let dataDownloader = require('./libs/downloaders/index');
let importer = require('./libs/importers/index');
let api = require('./api/index');
if(process.argv[2] == "download"){
    let downloadType = process.argv[3];
        if(downloadType){
            dataDownloader(downloadType);
        }else{
            console.log({error:"undefined download type"});
            return;
        }

}

else if(process.argv[2] == "import"){
    let importType = process.argv[3];
    if(importType){
        importer(importType);
    }else{
        console.log({error:"undefined import type"});
        return;
    }
}

else{
    api();
}