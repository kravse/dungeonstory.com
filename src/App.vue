<template>
  <div id="app">
    <div class="app-inner">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  computed: {
    overlay: function () {
      return this.$route.name !== 'home'
    }
  }
});
</script>
<style src="@/assets/styles/main.styl" lang="stylus"></style>

