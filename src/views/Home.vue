<template>
  <div class="home container mx-auto">
    <HelloWorld msg="Pokemon TGC"/>

    <fetch-json url="https://api.pokemontcg.io/v1/cards">
      <div slot-scope="{ response: cards, loading }">
        <p v-if="loading">Loading...</p>
        <div v-else>
          <div class="flex flex-wrap justify-between">
            <pokemon-card v-for="pokemon in cards.cards" :key="pokemon.id" >
              <img slot="image" :src="pokemon.imageUrl" :alt="pokemon.name" class="w-full max-w-xxs" @click="thePokemon(pokemon)">
              <div slot="name" class="font-bold text-xl mb-2">{{ pokemon.name }}</div>
            </pokemon-card>
            <card-modal
                :show="modalOpen"
                @close="modalOpen = false"
                :card= "pokemonData"
              >
              </card-modal>
          </div>
        </div>
      </div>
    </fetch-json>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import FetchJson from "@/components/FetchJson.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import CardModal from "@/components/CardModal.vue";

export default {
  name: 'home',
  components: {
    HelloWorld,
    FetchJson,
    PokemonCard,
    CardModal
  },
  data(){
    return{
      modalOpen: false,
      pokemonData: {},
    }
  },
  methods: {
    thePokemon(pokemon) {
      this.modalOpen = true;
      this.pokemonData = pokemon;
    }
  }
};
</script>

