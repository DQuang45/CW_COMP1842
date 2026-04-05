<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i>Words
          </router-link>
          
          <router-link to="/words/new" class="item" v-if="isAdmin">
            <i class="plus circle icon"></i> New
          </router-link>
          
          <RouterLink to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash" ></flash-message> 
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isAdmin: false
    }
  },
  mounted() {
    // Kểm tra quyền lúc mới f5 trang
    this.checkAuth(); 
    
    // Lắng nghe tín hiệu khi gõ mật khẩu bên trang words.vue
    window.addEventListener('auth-change', this.checkAuth);
  },
  beforeDestroy() {
    window.removeEventListener('auth-change', this.checkAuth);
  },
  methods: {
    checkAuth() {
      // Nếu token trong bộ nhớ đúng thì bật isAdmin = true
      this.isAdmin = localStorage.getItem('admin_token') === 'admin123';
    }
  }
}
</script>

<style>
#app >div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50px;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>
