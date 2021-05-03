<template>
  <div id="footer">
    <section>
      <!-- <p> -->
        <!-- <a href="https://www.github.com/">Github</a> -->
        <!-- <a :href="`mailto:${email}`">{{email}}</a> -->
      <!-- </p> -->
      <!-- <p class="copyright">{{name}} © {{new Date().getFullYear()}}</p> -->
    </section>
  </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'site-footer',
  data() {
    return {
      // name: 'Jared',
      // email: 'email@domain.com'
    }
  }
});
</script>
<style scoped src="./footer.styl" lang="stylus"></style>

