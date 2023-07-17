import mongoose, { InferSchemaType } from 'mongoose';

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
export type QuizType = InferSchemaType<typeof quizSchema>;

export const QuizHandler = (i: number) => {
    let Quiz: any
    return (Quiz = mongoose.model('Quiz', quizSchema, `questionData${i}`));
}
