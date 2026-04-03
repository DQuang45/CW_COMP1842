<template>
    <div>
      <h1>Show Helpdesk Entry</h1>
  
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i></i> Issue Code
        </div>
        <input type="text" readonly  :value="word.key"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i></i> Response
        </div>
        <input type="text" readonly  :value="word.value"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i></i> Category
        </div>
        <input type="text" readonly  :value="word.category"/>
      </div>
      <div class="actions">
        <router-link :to="{ name: 'edit', params: { id: $route.params.id }}">
          Edit
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
    const id = this.$route.params.id
    this.word = await api.getwords(id)
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