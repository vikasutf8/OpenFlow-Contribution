import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { userPerf } from "@/store/auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

// here user want to answer the question
export async function POST(request: NextRequest) {
  try {
    // data coming from client
    const { answer, questionId, authorId } = await request.json();
    //2 . creating a new doc. of this above reqsone
    const respones = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        questionId,
        authorId,
      }
    );
    //as based on answer we inc/decr reputation author side--how to do
    // 1.user-perference whose login -- answer denawala ke id se
    //2. need users from db,getprefs. proivde author id
    const prefs = await users.getPrefs<userPerf>(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });

    return NextResponse.json(respones, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "error creating answer route ",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}

//here user want to delete own answer--answerId for perticular question
export async function DELETE(request: NextRequest) {
  try {
    //getting answer id form clinet whose deleting own answer
    const { answerId } = await request.json();
    //db removal
    const answer = await databases.getDocument(db, answerCollection, answerId);
    const respones = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );
    //now desc reputation
// ***********checking *******
    const prefs = await users.getPrefs<userPerf>(answer.authorId);
    await users.updatePrefs(answer.authorId, {
      reputation: Number(prefs.reputation) - 1,
    });

    return NextResponse.json(
      { data: respones },
      {
        status: 205,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "error deleting answer route ",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
