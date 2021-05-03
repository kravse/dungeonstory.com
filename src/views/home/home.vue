<template>
  <div class="home">
    <div class="story">
      <h1>Adventure Writer</h1>
      <h4>Are choose your own adventures too hard for you? Let Adventure Writer make the choices for you!</h4>
      <p class="prompt">
        {{story}}
      </p>
      <!-- <p v-if="loading" class="loading">|</p> -->
      <p class="instructions" v-if="instructions">Enter some line-separated options to complete this prompt (min 3):</p>
    </div>
    <form>
      <textarea ref="text" v-model="input" type="text"/>
      <button @click.prevent="submit()" submit="button">Write!</button>
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
      story: '',
      instructions: true,
      prompt: '',
      generatedOnce: false,
      // loading: false
    }
  },
  created: async function () {
    this.prompt = prompts[Math.floor(Math.random() * prompts.length)]
    this.typeText('story', this.prompt, '')
    setTimeout(() => {
      this.$refs.text.focus()
    }, 50)
  },
  methods: {
    typeText: function (updateValue, prompt, seed) {
      if (seed) seed+= ' '
      jsTypeText.start({
        text: prompt,
        speed: 45,
        cursor: false,
        cursorSpeed: 350,
        cursorStyle: "vertical"
      }, (result) => {
        this[updateValue] = seed + result
      });
    },
    writeMore: function (seed) {
      // this.loading = true
      this.$http.post('/.netlify/functions/generate',{
        "prompt": seed,
        "max_tokens": 40,
        "temperature": 1,
        "k": 5,
        "p": 1
      }).then(response => {
        // this.loading = false
        this.typeText('story', response.data.text, this.story)
        this.input = ''
        this.instructions = true
        this.$refs.input.focus()
        this.$refs.text.focus()
      })
    },
    submit: function () {
      this.instructions = false
      let text = this.input.split('\n')
      let prompt = this.prompt
      if (this.prompt.indexOf('.')) {
        prompt = this.story.slice(this.story.lastIndexOf('.'), this.story.length)
      }
      this.$http.post('/.netlify/functions/best', {
        query: prompt,
        options: text,
        mode: "APPEND_OPTION"
      }).then(response => {
        let results = response.data.likelihoods
        let winner = text[results.indexOf(Math.max(...results))]
        this.typeText('story', winner, this.story)
        this.writeMore(`${this.prompt} ${winner}`)
      })
    }
  }
});
</script>
<style scoped src="./home.styl" lang="stylus"></style>
