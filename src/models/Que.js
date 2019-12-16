import mongoose from 'mongoose';

const optionSchema = mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

const queSchema = mongoose.Schema({
  question: {
    type: String,
    default: true
  },
  options: { type: [optionSchema], required: true }
});

const questionerSchema = mongoose.Schema({
  name: String,
  questions: [queSchema]
});

const Questioners = mongoose.model('Questioners', questionerSchema);

export default Questioners;
