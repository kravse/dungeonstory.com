<template>
  <div class="home">
    <div class="story">
      <p>{{story}}</p>
      <p class="instructions" v-if="instructions">{{instructions}}</p>
    </div>
    <form>
      <textarea v-model="input" type="text"/>
      <button @click.prevent="submit()" submit="button">Next</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import prompts from './prompts.js'
import jsTypeText from 'js-type-text';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      input: '',
      story: ''
    }
  },
  created: async function () {
    this.story = jsTypeText.start({
      text: prompts[0],
      speed: 45,
      cursor: false,
      cursorSpeed: 350,
      cursorStyle: "vertical"
    }, (result) => {
      this.story = result
    });
  },
  computed: {
    instructions: function () {
      return this.story === prompts[0] ? 'Enter three options to complete this prompt (separated by line).' : ''
    }
  },
  methods: {
    submit: function () {
      this.$http.post('/.netlify/functions/best', {
        query: prompts[0].replace('{}', ''),
        options = this.input.split("\n"),
        mode: "APPEND_OPTION"
      }).then(response => {
        console.log(response, response.data, response.data.text)
        // this.employeeModel[answer] = response.data.text
      })
    }
  }
});
</script>
<style scoped src="./home.styl" lang="stylus"></style>
