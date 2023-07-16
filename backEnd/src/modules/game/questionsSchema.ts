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

export const Quiz = mongoose.model('Quiz', quizSchema);
