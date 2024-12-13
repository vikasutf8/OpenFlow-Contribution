import {db} from '../name'
import createVoteCollection from './vote.collection'
import createQuestionCollection from './question.collection'
import createCommentCollection from './comment.collection'
import createAnswerCollection from './answer.collection'
import { databases } from './config'

export default async function getOrcreateDB() {
    // console.log("making error in dbsetup 1")
    try {
        await databases.get(db);
        console.log("database already and connected")
    } catch (error) {
        try {
            await databases.create(db,db);
            console.log("database created");
            await Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createVoteCollection(),
            ])
            console.log("collection created")
        } catch (error) {
            console.error("Error on creating db and collection",error)
        }

    }
    return databases;
    console.log(databases)
}