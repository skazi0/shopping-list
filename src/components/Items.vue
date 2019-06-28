<template>
  <div class="shopping-items">
    <li v-for="item in items">{{ item }}</li>
  </div>
</template>

<script>
import config from '../config.js';

export default {
  name: 'items',
  data() {
    return {
      items: []
    }
  },
  mounted() {
    fetch(config.baseUrl + '/api/items')
      .then(response => response.json())
      .then((data) => {
        this.items = data;
      })
  },
}

</script>

<style lang="scss">
.shopping-items {
}
</style>
