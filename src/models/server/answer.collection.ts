import {IndexType, Permission} from 'node-appwrite'
import {db,answerCollection} from '../name'
import {databases} from './config'


// const result = await databases.**createCollection( '<DATABASE_ID>', **// **databaseId '<COLLECTION_ID>'**, // collectionId '',** // name ["read("any")"],**//permissions (optional) false, // documentSecurity (optional) false // enabled (optional) );

export default async function createAnswerCollection() {
    //create-collection
   // what permission of questions -anyone readit but logged users will performed CURD onit
    await databases.createCollection(db,answerCollection,answerCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
    ])
    console.log("Answer  collections are created");

    //creating attributes
    await Promise.all([
        databases.createStringAttribute(db,answerCollection,"content",10000,true),
        databases.createStringAttribute(db,answerCollection,"authorId",100,true),
        databases.createStringAttribute(db,answerCollection,"questionId",100,false),
    ])
    console.log("answer attribute created");

    //create indexes
    // await Promise.all([
    //     databases.createIndex(
    //         db,
    //         answerCollection,
    //         "title",
    //         IndexType.Fulltext,
    //         ["title"],
    //         ['asc']
    //     ),
    //     databases.createIndex(
    //         db,
    //         answerCollection,
    //         "content",
    //         IndexType.Fulltext,
    //         ["content"],
    //         ['asc']
    //     ),
    // ])
}


