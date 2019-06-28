<template>
  <div class="shopping-search">
    <b-form-input v-model="searchText"></b-form-input>
  </div>
</template>

<script>
import config from '../config.js';

export default {
  name: 'search',
  data() {
    return {
      searchText: ''
    }
  },
}

</script>

<style lang="scss">
.shopping-search {
}
</style>
