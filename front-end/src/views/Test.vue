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
      words: [], // Lưu toàn bộ data từ CRUD
      currentQuestion: {}, // Câu hỏi hiện tại
      options: [], // 4 đáp án (1 đúng, 3 sai)
      score: 0,
      totalAsked: 0,
      hasAnswered: false, // Trạng thái đã chọn đáp án chưa
      isCorrect: false,
      selectedOption: null // Lưu lại đáp án user đã bấm
    };
  },
  async mounted() {
    // 1. Lấy toàn bộ dữ liệu từ database khi mở trang
    this.words = await api.getWords();
    
    // 2. Nếu đủ data thì tạo câu hỏi luôn
    if (this.words.length >= 4) {
      this.generateQuestion();
    }
  },
  methods: {
    generateQuestion() {
      // Reset trạng thái
      this.hasAnswered = false;
      this.selectedOption = null;

      // Chọn ngẫu nhiên 1 câu làm câu hỏi chính
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.currentQuestion = this.words[randomIndex];

      // Lọc ra các câu KHÔNG phải là câu chính để làm đáp án sai (Distractors)
      const wrongAnswers = this.words.filter(w => w._id !== this.currentQuestion._id);
      
      // Xáo trộn mảng đáp án sai và lấy 3 câu đầu tiên
      const shuffledWrong = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);

      // Gộp 1 câu đúng và 3 câu sai lại
      let allOptions = [this.currentQuestion, ...shuffledWrong];

      // Xáo trộn vị trí 4 đáp án này để câu đúng không phải lúc nào cũng nằm đầu
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

    // Đổi màu nút sau khi người dùng bấm
    getButtonClass(option) {
      if (!this.hasAnswered) return 'basic'; // Trạng thái bình thường
      
      if (option._id === this.currentQuestion._id) {
        return 'positive'; // Luôn tô xanh đáp án đúng
      }
      
      if (option._id === this.selectedOption?._id && !this.isCorrect) {
        return 'negative'; // Tô đỏ nếu user bấm sai
      }

      return 'basic disabled'; // Các nút còn lại làm mờ đi
    }
  }
};
</script>