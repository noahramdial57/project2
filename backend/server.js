// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "swapi";
const collectionName = "planets"

module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collection to use
    const collection = db.collection(collectionName);

    //Execute Operations
    // available operations: 
    // ['initbooks'|'clearbooks'|'findallbooks'|'findbook'|'updatebook' ]
    switch (operation.toLowerCase()) {
        case 'getPlanets':
            const collectionPlanet = 'planets'
            await collectionPlanet.find({}).the.toArray();
            callback({ planets: planets})
            );
            break;

    //     case 'clearbooks':
    //         await collection.deleteMany({}).then(
    //             (result)=>{ callback({ status: "book records have been removed." })},
    //             (reason)=>{ callback({ status: "error removing book records." }) }
    //         );
    //         break;

    //     case 'findallbooks':
    //         const books = await collection.find({}).toArray();
    //         callback({ books: books });
    //         break;

    //     case 'findbook':
    //         const book = await collection.findOne({ isbn: parameters.isbn });
    //         callback({ book:book });
    //         break;

    //     case 'updatebook':
    //         await collection.updateOne(
    //             { isbn: parameters.book.isbn },
    //             {$set: parameters.book},
    //             {upsert: true});
    //         callback({ status: 'item updated:'+parameters.book.isbn });
    //         break;

        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}

