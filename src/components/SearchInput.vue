<template>
    <div>
        <input type="text" aria-label="Search" name="Search" class="border my-8 py-2 px-4 mr-4" v-model="searchterm" @keyup.enter="getUrl()">
        <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" @click="getUrl()">Search</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchterm: '',
      searchPokemon: 'https://api.pokemontcg.io/v1/cards?name=',
    };
  },
  methods: {
    getUrl() {
      const searchUrl = `${this.searchPokemon}${this.searchterm}`;
      this.$emit('searching', searchUrl);
    },
  },
};
</script>

<style scoped>
</style>
