<template>
  <div>
    <h1>Helpdesk Entry Details</h1>

    <div class="ui segment">
      <div class="ui labeled input fluid" style="margin-bottom: 15px;">
        <div class="ui label">
          <i class="hashtag icon"></i> Issue Code
        </div>
        <input type="text" readonly :value="word.key"/>
      </div>

      <div class="ui labeled input fluid" style="margin-bottom: 15px;">
        <div class="ui label">
          <i class="info circle icon"></i> Issue Description
        </div>
        <input type="text" readonly :value="word.description"/>
      </div>

      
      <div class="ui labeled input fluid" style="margin-bottom: 15px;">
        <div class="ui label">
          <i class="comment alternate icon"></i> Response
        </div>
        <input type="text" readonly :value="word.value"/>
      </div>
      
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="folder open icon"></i> Category
        </div>
        <input type="text" readonly :value="word.category"/>
      </div>
    </div>

    <div class="actions">
      <router-link to="/words" class="ui button">
        <i class="arrow left icon"></i> Back to List
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '@/helpers/helpers'

export default {
  name: 'Show',
  data() {
    return {
      word: {}
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    this.word = await api.getwords(id);
  }
}
</script>
  
  <style scoped>
  .actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
  }
  </style>