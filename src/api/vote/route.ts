import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { userPerf } from "@/store/auth";
import { Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    //1.grabing data
    const { votedById, voteStatus, type, typeId } = await request.json();
    //2.list doc :preciselly voterID ,types  all stuff
    const response = await databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("votedById", votedById),
    ]);
    //3. getting doc :performing 2 operations
    if (response.documents.length > 0) {
      // delete already exist vote
      await databases.deleteDocument(
        db,
        voteCollection,
        response.documents[0].$id
      );
      //decrease reputation
      const QuestionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId
      );

      const authorPrefs = await users.getPrefs<userPerf>(
        QuestionOrAnswer.autherId
      );

      await users.updatePrefs<userPerf>(QuestionOrAnswer.authorId, {
        reputation:
          response.documents[0].voteStatus === "upvoted"
            ? Number(authorPrefs.reputation) - 1
            : Number(authorPrefs.reputation) + 1,
      });
    }
    //that means previous vote doesn't exist or vote status changes
    if (response.documents[0]?.voteStatus !== voteStatus) {
      //creating  fresh new document
      const doc = await databases.createDocument(
        db,
        voteCollection,
        ID.unique(),
        {
          type,
          typeId,
          voteStatus,
          votedById,
        }
      );
      //increase /decrease reputation
      const QuestionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId
      );
      const authorPrefs = await users.getPrefs<userPerf>(
        QuestionOrAnswer.autherId
      );

      // if vote present
      if (response.documents[0]) {
        await users.updatePrefs<userPerf>(QuestionOrAnswer.authorId, {
          reputation:
            response.documents[0].voteStatus === "upvoted"
              ? Number(authorPrefs.reputation) - 1
              : Number(authorPrefs.reputation) + 1,
        });
      } else {
        await users.updatePrefs<userPerf>(QuestionOrAnswer.authorId, {
          reputation:
            voteStatus === "upvoted"
              ? Number(authorPrefs.reputation) + 1
              : Number(authorPrefs.reputation) - 1,
        });
      }
    }
    //after changes/ornot change return count of votes  -- above 2 operation complance
    
    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("voteStatus", "upvoted"), //this is hardcode as ENUM
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("voteStatus", "downvoted"), //this is hardcode as ENUM
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
    ]);

    return NextResponse.json(
      {
        data: {
          document: null,
          voteResult: upvotes.total == downvotes.total,
        },
        message: "vote handled",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error in creating vote on question",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
