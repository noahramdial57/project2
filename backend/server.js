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
            const planet = await collection.findOne({ id: parameters });
            callback({ planet:planet });
            break;
        
        case 'findcharacter':
            collectionName = "characters";
            collection = db.collection(collectionName);
            const character = await collection.findOne({id: parameters});
            callback({character: character});
            return
            // break;
        
        case 'findfilm':
            collectionName = "films";
            collection = db.collection(collectionName);
            
            const film = await collection.findOne({id: parameters});
            console.log(typeof(film))
            callback({film: film});
            break;

        case 'getcharsfromfilm':
            collectionName = "films_characters";
            collection = db.collection(collectionName);
            var characterS = await collection.find({film_id: parameters}).toArray();
               
        
            callback({chars: characterS});
            break;
        case 'getplanetsfromfilms':
            collectionName = "films_planets";
            collection = db.collection(collectionName);
            var characterS = await collection.find({film_id: parameters}).toArray();
                
        
            callback({chars: characterS});
            break;

        case 'getfilmsfromchars':
            collectionName = "films_characters";
            collection = db.collection(collectionName);
            var characterS = await collection.find({film_id: parameters}).toArray();
                
        
            callback({chars: characterS});
            break;
        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    // client.close();
    return 'call complete';
}