import Vue from 'vue'
import VueFlashMessage from 'vue-flash-message'
import 'vue-flash-message/dist/vue-flash-message.min.css'
import axios from 'axios';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/words/';



const handleError = fn => async (...params) => {
  try {
    return await fn(...params);
  } catch (error) {

    let message = 'Unknown error';

    if (error.response && error.response.status) {
      message = `${error.response.status}: ${error.response.statusText}`;
    } 
    else if (error.request) {
      message = 'Server not responding';
    } 
    else {
      message = error.message;
    }

    vm.flash(message, 'error');

    throw error;
  }
};

export const api = {
    getwords: handleError(async id => {
        const res = await axios.get(baseURL + id);
        return res.data;
    }),
    getWords: handleError(async () => {
        const res = await axios.get(baseURL);
        return res.data;
    }),
    deleteWord: handleError(async id => {
        const res = await axios.delete(baseURL + id);
        return res.data;
    }),
    createWord: handleError(async payload => {
        const res = await axios.post(baseURL, payload);
        return res.data;
    }),
    updateWord: handleError(async payload => {
        const res = await axios.put(baseURL + payload._id, payload);
        return res.data;
    })
};