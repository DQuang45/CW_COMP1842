<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

        <div class="ui labeled input fluid">
            <div class="ui label"><i></i>Issue Code</div>
            <input type="text" placeholder="Enter issue code..." v-model="localWord.key">
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label"><i></i>Standard Response</div>
            <input type="text" placeholder="Enter standard response..." v-model="localWord.value">
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label"><i></i> Category</div>
            <input type="text" placeholder="Enter category..." v-model="localWord.category">
        </div>

        <button class="positive ui button">Submit</button>
    </form>
</template>

<script>
export default {
  name: 'word-form',
  props: {
    word: {
      type: Object,
      required: false,
      default: () => ({ key: '', value: '', category: '' })
    }
  },
  data() {
    return {
      errorsPresent: false,
      localWord: { ...this.word } // Copy dữ liệu từ prop sang state nội bộ
    }
  },
  watch: {
    // Theo dõi prop word, nếu trang Edit tải xong dữ liệu thì cập nhật lại localWord
    word: {
      handler(newVal) {
        this.localWord = { ...newVal }
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      if (!this.localWord.key || !this.localWord.value || !this.localWord.category) {
        this.errorsPresent = true
      } else {
        this.errorsPresent = false
        this.$emit('createOrUpdate', this.localWord) // Emit dữ liệu nội bộ
      }
    }
  }
}
</script>