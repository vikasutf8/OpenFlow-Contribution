import {IndexType, Permission} from 'node-appwrite'
import {db,questionCollection} from '../name'
import {databases} from './config'


// const result = await databases.**createCollection( '<DATABASE_ID>', **// **databaseId '<COLLECTION_ID>'**, // collectionId '',** // name ["read("any")"],**//permissions (optional) false, // documentSecurity (optional) false // enabled (optional) );

export default async function createQuestionCollection() {
    //create-collection
   // what permission of questions -anyone readit but logged users will performed CURD onit
    await databases.createCollection(db,questionCollection,questionCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
    ])
    console.log("Question collections are created");

    //creating attributes
    await Promise.all([
        databases.createStringAttribute(db,questionCollection,"title",100,true),
        databases.createStringAttribute(db,questionCollection,"tags",100,true,undefined,true),
        databases.createStringAttribute(db,questionCollection,"content",10000,true),
        databases.createStringAttribute(db,questionCollection,"authorId",100,true),
        databases.createStringAttribute(db,questionCollection,"attachmentId",100,false),
    ])
    console.log("question attribute created");

    //create indexes
    // await Promise.all([
    //     databases.createIndex(
    //         db,
    //         questionCollection,
    //         "title",
    //         IndexType.Fulltext,
    //         ["title"],
    //         ['asc']
    //     ),
    //     databases.createIndex(
    //         db,
    //         questionCollection,
    //         "content",
    //         IndexType.Fulltext,
    //         ["content"],
    //         ['asc']
    //     ),
    // ])
}


