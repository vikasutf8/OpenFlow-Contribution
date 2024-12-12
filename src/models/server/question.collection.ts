import {} from 'node-appwrite'
import {db,questionCollection} from '../name'
import {databases} from './config'
import { permission } from 'node:process'

export default async function createQuestionCollection() {
    
    //create collection
    await databases.createCollection(db,questionCollection,questionCollection,
        [
            Permission.read("any"),
            Permission.read("users"),




    ])


}
