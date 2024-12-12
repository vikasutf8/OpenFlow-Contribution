import {IndexType, Permission} from 'node-appwrite'
import {db,commentCollection} from '../name'
import {databases} from './config'


// const result = await databases.**createCollection( '<DATABASE_ID>', **// **databaseId '<COLLECTION_ID>'**, // collectionId '',** // name ["read("any")"],**//permissions (optional) false, // documentSecurity (optional) false // enabled (optional) );

export default async function createCommentCollection() {
    //create-collection
   // what permission of questions -anyone readit but logged users will performed CURD onit
    await databases.createCollection(db,commentCollection,commentCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
    ])
    console.log("Comments collections are created");

    //creating attributes
    await Promise.all([
        databases.createStringAttribute(db,commentCollection,"content",10000,true),
        databases.createEnumAttribute(db,commentCollection,"type",["answer","question"],true),
        databases.createStringAttribute(db,commentCollection,"typeId",100,true),
        databases.createStringAttribute(db,commentCollection,"autherId",100,false),
    ])
    console.log("Comment attribute created");

    //create indexes
    // await Promise.all([
    //     databases.createIndex(
    //         db,
    //         commentCollection,
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


