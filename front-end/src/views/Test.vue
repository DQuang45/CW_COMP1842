<template>
  <div>
    <h1 class="ui header">Staff Training Quiz</h1>
    <p>Test your knowledge on Helpdesk Standard Responses.</p>

    <div v-if="words.length < 4" class="ui negative message">
      <div class="header">Not enough data!</div>
      <p>Please add at least 4 entries in the Helpdesk system to start the quiz.</p>
    </div>
      <h3 class="ui dividing header">
        Scenario: A user reports...
      </h3>
      <div class="ui message info" style="font-size: 1.2em;">
        <strong>"{{ currentQuestion.description }}"</strong>
        <br>
        <span class="ui label teal" style="margin-top: 10px;">
          Issue Code: {{ currentQuestion.key }}
        </span>
      </div>

      <h4>What is the standard response?</h4>

      <div class="ui form">
        <div class="grouped fields">
          <button 
            v-for="(option, index) in options" 
            :key="index"
            class="ui fluid button" 
            :class="getButtonClass(option)"
            style="margin-bottom: 10px; text-align: left;"
            @click="selectAnswer(option)"
            :disabled="hasAnswered"
          >
            {{ option.value }}
          </button>
        </div>
      </div>

      <div v-if="hasAnswered" style="margin-top: 20px;">
        <div v-if="isCorrect" class="ui positive message">
          <i class="check icon"></i> Correct! Excellent job.
        </div>
        <div v-else class="ui negative message">
          <i class="times icon"></i> Incorrect. The correct response is: <strong>{{ currentQuestion.value }}</strong>
        </div>
        
        <button class="ui primary button" @click="generateQuestion">
          Next Question <i class="right arrow icon"></i>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { api } from '@/helpers/helpers';

export default {
  name: 'quiz-page',
  data() {
    return {
      words: [], 
      currentQuestion: {}, 
      options: [], 
      score: 0,
      totalAsked: 0,
      hasAnswered: false, 
      isCorrect: false,
      selectedOption: null 
    };
  },
  async mounted() {
    // 1. Fetch all data from the database
    this.words = await api.getWords();
    
      // 2.If there are at least 4 entries, generate the first question
    if (this.words.length >= 4) {
      this.generateQuestion();
    }
  },
  methods: {
    generateQuestion() {
      // Reset status
      this.hasAnswered = false;
      this.selectedOption = null;

      // randomly select a question from the words array
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.currentQuestion = this.words[randomIndex];

      // filter out the current question to get only the wrong answers
      const wrongAnswers = this.words.filter(w => w._id !== this.currentQuestion._id);
      
      // Randomly shuffle the wrong answers and take the first 3
      const shuffledWrong = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);

      // Combine the correct answer with the 3 wrong answers to create the options array
      let allOptions = [this.currentQuestion, ...shuffledWrong];

      // Randomly shuffle the options so the correct answer isn't always in the same position
      this.options = allOptions.sort(() => 0.5 - Math.random());
    },

    selectAnswer(option) {
      this.hasAnswered = true;
      this.selectedOption = option;
      this.totalAsked++;

      if (option._id === this.currentQuestion._id) {
        this.isCorrect = true;
        this.score++;
      } else {
        this.isCorrect = false;
      }
    },

    // This function returns a CSS class for the button based on the selected state and whether the answer is correct or incorrect
    getButtonClass(option) {
      if (!this.hasAnswered) return 'basic'; 
      
      if (option._id === this.currentQuestion._id) {
        return 'positive'; 
      }
      
      if (option._id === this.selectedOption?._id && !this.isCorrect) {
        return 'negative'; 
      }

      return 'basic disabled';
    }
  }
};
</script>