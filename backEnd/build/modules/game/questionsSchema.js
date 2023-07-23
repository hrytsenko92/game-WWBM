import mongoose from 'mongoose';
const answerSchema = new mongoose.Schema({
    answer: String,
    isTrue: Boolean,
});
const questionSchema = new mongoose.Schema({
    id: String,
    question: String,
    answers: [answerSchema],
});
const quizSchema = new mongoose.Schema({
    complexity: Number,
    qData: [questionSchema],
});
export const QuizHandler = (i) => {
    let Quiz;
    return (Quiz = mongoose.model('Quiz', quizSchema, `questionData${i}`));
};
//# sourceMappingURL=questionsSchema.js.map