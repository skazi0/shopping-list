<template>
  <div class="shopping-app container">
    <search></search>
    <items></items>
  </div>
</template>

<script>
import Items from './components/Items.vue';
import Search from './components/Search.vue';
import config from './config.js';

export default {
  name: 'app',
  components: {
    Items,
    Search,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App 2'
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
.shopping-app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
