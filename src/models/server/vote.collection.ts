import {IndexType, Permission} from 'node-appwrite'
import {db,voteCollection} from '../name'
import {databases} from './config'


// const result = await databases.**createCollection( '<DATABASE_ID>', **// **databaseId '<COLLECTION_ID>'**, // collectionId '',** // name ["read("any")"],**//permissions (optional) false, // documentSecurity (optional) false // enabled (optional) );

export default async function createVoteCollection() {
    //create-collection
   // what permission of questions -anyone readit but logged users will performed CURD onit
    await databases.createCollection(db,voteCollection,voteCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
    ])
    console.log("Vote collections are created");

    //creating attributes
    await Promise.all([
        databases.createEnumAttribute(db,voteCollection,"type",["answer","question"],true),
        databases.createStringAttribute(db,voteCollection,"typeId",100,true),
        databases.createStringAttribute(db,voteCollection,"votedById",100,true),
        databases.createEnumAttribute(db,voteCollection,"voteStatus",["upvoted","downvoted"],true)
    ])
    console.log("Vote attribute created");

    //create indexes
    // await Promise.all([
    //     databases.createIndex(
    //         db,
    //         voteCollection,
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


