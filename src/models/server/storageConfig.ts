import {IndexType, Permission} from 'node-appwrite'
import {db,questionAttachmentBucket} from '../name'
import {storage} from './config'


// const result = await databases.**createCollection( '<DATABASE_ID>', **// **databaseId '<COLLECTION_ID>'**, // collectionId '',** // name ["read("any")"],**//permissions (optional) false, // documentSecurity (optional) false // enabled (optional) );

export default async function getOrCreateStorage() {
    //create-collection
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("storage connected")
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket,questionAttachmentBucket,
                [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,
                ['jpg','jpeg','png','svg','gif','html','pdf','mp4']
            );
            console.log("storage created")
        } catch (error) {
            console.error("Error on creating storage ",error)
        }
    }
}


