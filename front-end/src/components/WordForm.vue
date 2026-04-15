<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error" style="color: red; font-weight: bold;">Please fill out all fields!</p>

        <div class="ui labeled input fluid" style="margin-bottom: 15px;">
          <div class="ui label">
            <i class="hashtag icon"></i> Issue Code
          </div>
          <input 
            type="text" 
            placeholder="The code will be generated automatically by the system..." 
            disabled 
            :value="localWord.key"
          />
        </div>

        <div class="ui labeled input fluid" style="margin-bottom: 15px;">
            <div class="ui label"><i class="info circle icon"></i> Issue Description</div>
            <input type="text" placeholder="Ví dụ: User forgot their login password..." v-model="localWord.description">
        </div>
        
        <div class="ui labeled input fluid" style="margin-bottom: 15px;">
            <div class="ui label"><i class="comment alternate icon"></i> Standard Response</div>
            <input type="text" placeholder="Enter standard response..." v-model="localWord.value">
        </div>

        <div class="ui labeled input fluid" style="margin-bottom: 20px;">
          <div class="ui label">
            <i class="folder open icon"></i> Category
          </div>
          <select v-model="localWord.category" class="ui dropdown" style="flex: 1; border: 1px solid rgba(34,36,38,.15); border-radius: 0 .28571429rem .28571429rem 0;">
            <option value="">-- Chọn danh mục --</option>
            <option value="IT">IT Support</option>
            <option value="HR">Human Resources</option>
            <option value="ACCOUNT">Accounting</option>
            <option value="GENERAL">General Question</option>
          </select>
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
      localWord: { ...this.word } 
    }
  },
  watch: {
    word: {
      handler(newVal) {
        this.localWord = { ...newVal }
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      // Validation: Ensure all fields are filled out before submission
      if (!this.localWord.value || !this.localWord.category || !this.localWord.description) {
        this.errorsPresent = true; 
        if (this.flash) this.flash('Please fill out all fields!', 'error');
        return;
      }
      
      this.errorsPresent = false; 

      // structure the data to send
      const dataToSend = {
        description: this.localWord.description,
        value: this.localWord.value,
        category: this.localWord.category
      };

      if (this.localWord.key) {
        dataToSend.key = this.localWord.key;
      }

      if (this.localWord._id) {
        dataToSend._id = this.localWord._id;
      }

      this.$emit('createOrUpdate', dataToSend); 
    }
  }
}
</script>