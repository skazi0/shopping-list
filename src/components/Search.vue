<template>
  <div class="shopping-search">
    <vue-simple-suggest v-model="searchText"
      v-bind:list="items"
      v-bind:filter-by-query="true"
      v-bind:filter="checkItem"
      display-attribute="name">
    </vue-simple-suggest>
    <b-input-group>
      <b-form-input v-model="searchText"></b-form-input>
      <b-input-group-append>
        <b-button variant="primary">+</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import config from '../config.js';

export default {
  name: 'search',
  props: {
    items: Array,
  },
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    checkItem: function (item, query) {
      return item.name.includes(query);
    },
  },
}

</script>

<style lang="scss">
.shopping-search {
}
</style>
