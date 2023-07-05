// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "swapi";
var collectionName = "planets"

module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collection to use
    var collection = db.collection(collectionName);

    //Execute Operations
    // available operations: 
    // ['initbooks'|'clearbooks'|'findallbooks'|'findbook'|'updatebook' ]
    switch (operation.toLowerCase()) {
        case 'getplanets':
            collectionName = "planets";
            collection = db.collection(collectionName);
            const planets = await collection.find({}).toArray();
            callback({planets: planets});
            break;

        case 'getcharacters':
            collectionName = "characters";
            collection = db.collection(collectionName);
            const characters = await collection.find({}).toArray();
            callback({characters: characters});
            break;
        
        case 'getfilms':
            collectionName = "films";
            collection = db.collection(collectionName);
            const films = await collection.find({}).toArray();
            callback({films: films});
            break;

        case 'findplanet':
            collectionName = "planets";
            collection = db.collection(collectionName);
            const planet = await collection.findOne({ id: parameters.id });
            callback({ planet:planet });
            break;

        case 'updatebook':
            await collection.updateOne(
                { isbn: parameters.book.isbn },
                {$set: parameters.book},
                {upsert: true});
            callback({ status: 'item updated:'+parameters.book.isbn });
            break;

        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}