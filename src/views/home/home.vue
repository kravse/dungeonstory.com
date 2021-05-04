<template>
  <div class="home">
    <div class="story">
      <h1>Dungeon Story</h1>
      <h4>Are choose your own adventures too hard for you? Let dungeonstory.com make the choices for you!</h4>
      <p class="prompt">
        {{story}}<span v-if="updated">{{updated}}</span><span class="typing" v-if="!typing">...</span>
      </p>
      <p class="instructions">
        <span v-if="loading || typing" class="loading">|</span>
        <span v-else>Provide 3 options to continue this story (one per line):</span>
      </p>
      <p class="error" v-if="error">Ok so. Something went wrong. You could try changing your input and submitting again, or refreshing.<br> {{error}}</p>
    </div>
    <form>
      <textarea ref="text" v-model="input" type="text"/>
      <button :disabled="loading || prevent" @click.prevent="submit()" submit="button">
        <span v-if="loading">Hang on...</span>
        <span v-else-if="prevent">Keep typing...</span>
        <span v-else>Write!</span>
      </button>
    </form>
    <div class="creds">
      <p>A website by <a href="https://twitter.com/kravse">kravse</a></p>
    </div>
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
      updated: '',
      prompt: '',
      error: '',
      generatedOnce: false,
      loading: false,
      typing: false
    }
  },
  created: async function () {
    this.prompt = prompts[Math.floor(Math.random() * prompts.length)]
    this.typeText(this.prompt, '')
    setTimeout(() => {
      this.$refs.text.focus()
    }, 50)
  },
  computed: {
    prevent: function () {
      let lines = this.input.split(/\r\n|\r|\n/)
      if (lines.length < 3 || lines.length === 3 && lines[lines.length - 1].length < 3) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    typeText: function (prompt, seed) {
      this.typing = true
      jsTypeText.start({
        text: prompt,
        speed: 45,
        cursor: false,
        cursorSpeed: 350,
        cursorStyle: "vertical"
      }, (result) => {
        this.updated = ` ${result}`
        if (result === prompt) {
          this.story = `${seed} ${prompt}`
          this.updated = ''
          this.typing = false
          jsTypeText.stop()
        }
      });
    },
    writeMore: function (seed) {
      this.$http.post('/.netlify/functions/generate',{
        "prompt": seed,
        "max_tokens": 40,
        "temperature": 1,
        "k": 5,
        "p": 1
      }).then(response => {
        this.typeText(response.data.text, this.story)
        this.$refs.text.focus()
        this.loading = false
      }).catch((error) =>{
        this.error = `GENERATE ERROR: ${error.response.status}: ${error.message}`
      })
    },
    submit: function () {
      this.loading = true
      this.error = ''
      let text = this.input.split('\n')
      let newPrompt = this.prompt
      if (this.prompt.indexOf('.') && this.prompt.length > 75) {
        newPrompt = this.story.slice(this.story.lastIndexOf('.'), this.story.length)
      }
      if (newPrompt.length > 75) {
        newPrompt = newPrompt.slice(newPrompt.length - 75, newPrompt.length)
        newPrompt = newPrompt.slice(newPrompt.indexOf(' '), newPrompt.length)
      }
      this.$http.post('/.netlify/functions/best', {
        query: newPrompt,
        options: text,
        mode: "APPEND_OPTION"
      }).then(response => {
        let results = response.data.likelihoods
        let winner = text[results.indexOf(Math.max(...results))]
        this.typeText(winner, this.story)
        this.writeMore(`${this.prompt} ${winner}`)
        this.input = ''
      }).catch((error) =>{
        this.error = `CHOOSE-BEST ERROR: ${error.response.status}: ${error.message}`
      })
    }
  }
});
</script>
<style scoped src="./home.styl" lang="stylus"></style>
