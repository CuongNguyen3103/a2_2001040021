const Question = require("./Question");

class Attempt {
    constructor(chooseQuestions) {
        this.questions = chooseQuestions;
        this.startedAt = new Date();
        this.completed = false;
    }
}
module.exports = Attempt;