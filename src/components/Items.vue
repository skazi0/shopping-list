<template>
  <div class="shopping-items">
    <li v-for="item in items">{{ item }}</li>
  </div>
</template>

<script>
import config from '../config.js';

export default {
  name: 'items',
  props: {
    items: Array,
  },
  data() {
    return {
    }
  },
}

</script>

<style lang="scss">
.shopping-items {
}
</style>
