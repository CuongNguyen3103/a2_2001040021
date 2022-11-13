const response = require('express');
const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());
const Attempt = require("./model/Attempt")
const Question = require('./model/Question.js');

const DbName = "wpr-quiz";
const DbURL = `mongodb://localhost:27017/${DbName}`;

let client = null;
let db = null;

async function startServer() {
    client = await mongo.MongoClient.connect(DbURL);
    db = client.db();
    await app.listen();
}
startServer();

app.post("/attempts", async(req, res) => {
    const quesList = await db.collection("questions").find().toArray();
    const selectQues = selectRandom10Ques(quesList);

    const attempt = new Attempt(selectQues);

    await db.collection("attempts").insertOne(attempt);

    const response = createResponse(attempt);
    res.status(201).json(response);
})

function createResponse(attempt) {
    const onlyQuesArr = [];

    for(const question of attempt.questions) {
        const onlyQues = {
            _id: question._id,
            answers: question.answers,
            text: question.text,
        }
        onlyQuesArr.push(onlyQues);
    }

    const response = {
        _id: attempt._id,
        questions: onlyQuesArr,
        startedAt: attempt.createAt,
        completed: attempt.completed,
    }
    return response;
}


function selectRandom10Ques(quesList) {
    const listOf10Ques = [];
    for(let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random()* quesList.length);
        listOf10Ques.push(quesList[randomIndex]);
    }
    return listOf10Ques;
}


app.post("/attempts/:id/submit", async (req,res) => {
    const attemptId = req.params.id;
    const requestBody = req.body;
    const attempt = await db.collection("attempts").findOne({_id: new mongo.ObjectId(attemptId)})
   let score = 0;
   const correctAnswers = getAllCorrectAnswers(attempt.question);
    for(const questionId of userSubmit.key()) {
    }
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})