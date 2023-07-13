import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  isTrue: {
    type: Boolean,
    required: true
  }
});

const questionSchema = new mongoose.Schema({
  complexity: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answers: {
    type: [answerSchema],
    required: true
  }
});

const itemSchema = new mongoose.Schema({
  complexity: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  }
});

const quizSchema = new mongoose.Schema({
    item1: {
        type: [itemSchema],
        required: true,
    },
    item2: {
        type: [itemSchema],
        required: true,
    },
    item3: {
        type: [itemSchema],
        required: true,
    },
    item4: {
        type: [itemSchema],
        required: true,
    },
    item5: {
        type: [itemSchema],
        required: true,
    },
    item6: {
        type: [itemSchema],
        required: true,
    },
    item7: {
        type: [itemSchema],
        required: true,
    },
    item8: {
        type: [itemSchema],
        required: true,
    },
    item9: {
        type: [itemSchema],
        required: true,
    },
    item10: {
        type: [itemSchema],
        required: true,
    },
    item11: {
        type: [itemSchema],
        required: true,
    },
    item12: {
        type: [itemSchema],
        required: true,
    },
    item13: {
        type: [itemSchema],
        required: true,
    },
    item14: {
        type: [itemSchema],
        required: true,
    },
    item15: {
        type: [itemSchema],
        required: true,
    },
});

export const Quiz = mongoose.model('Quiz', quizSchema);
