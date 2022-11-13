
class Question {
    constructor(data) {
        this.answers = data.answers;
        this.text = data.text;
        this.correctAnswer = data.correctAnswer.$numberInt;
    }
}

module.exports = Question;