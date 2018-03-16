let MongoAdapter = require('mongodb');

class MongoORM {
    constructor(dbConfig){
        this.url = dbConfig.url;
        this.db = dbConfig.database;

    }

    createDocuments(params){
        return new Promise((resolve,reject)=>{
            MongoAdapter.connect(this.url,function (err,client) {
                assert.equal(err,null);
                console.log("Connected successfully to Mongo server");
                const db = client.db(this.db);


                db.createCollection(params.document,params.data).then(result=>{

                            console.log("Collection created.");
                            return resolve({success:"document created!!"});

                }).catch(err=>{
                    return reject(err);
                });

                client.close();
            });
        });
    }

    getResults(params){
        let database = this.db;
        let url = this.url;
        return new Promise((resolve,reject)=>{
           MongoAdapter.connect(url,function (err,client) {
              if(err){
                  throw reject(err);
              } else{
                  console.log("Connected to server!!");
                  const db = client.db(database);
                  const collection = db.collection(params.document);

                  collection.find(params.query).then(resp=>{

                      console.log("Found the following records");
                      return resolve(resp);

                  }).catch(err=>{
                      reject(err);
                  });

                  client.close();
              }
           });
        });
    }


    deleteDocument(params){
        let url = this.url;
        let database = this.db;
        return new Promise((resolve,reject)=>{
            MongoAdapter.connect(url,function (err,client) {
               if(err){
                   return reject(err);
               } else{
                    console.log("connected to server");
                    const db = client.db(database);
                    const collection = db.collection(params.document);
                    if(params.deleteAll){
                        collection.deleteMany(params.query).then(result=>{
                            return resolve({success:"removed!!"});
                        }).catch(err=>{
                            return reject(err);
                        });

                    }else{
                        collection.deleteOne(params.query).then(result=>{
                            return resolve({success:"removed!!"});
                        }).catch(err=>{
                            return reject(err);
                        });
                    }

               }
            });
        });

    }


    updateDocument(params){
        let url = this.url;
        let database = this.db;
        return new Promise((resolve,reject)=>{
            MongoAdapter.connect(url,function (err,client) {
               if(err){
                    return reject(err);
               } else{
                    console.log("connected to server!!");
                    const db = client.db(database);
                    const collection = db.collection(params.document);
                    if(params.updateAll){
                        collection.updateMany(params.set,params.condition).then(resp=>{
                            return resolve({success:"updated records"});
                        }).then(err=>{
                            return reject(err);
                        });

                    }else{
                        collection.updateOne(params.set,params.condition).then(response=>{
                           return resolve({success:"updated records"});
                        }).then(err=>{
                            return reject(err);
                        });
                    }
               }
            });
        });
    }


    insertDocument(params){
        let url = this.url;
        let database = this.db;
        return new Promise((resolve,reject)=>{
            MongoAdapter.connect(url, function(err, client) {
                if(err){
                    return reject(err);
                }
                else{
                    console.log("Connected successfully to Mongo server");
                    const db = client.db(database);
                    const collection = db.collection(params.document);
                    collection.insertMany(params.data).then(response=>{

                            let length  = response.length;
                            console.log("Inserted "+length+" documents into the collection");
                            return resolve(response);

                    }).catch(err=>{
                        return reject(err);
                    });
                }

                client.close();
            });
        });
    }
}