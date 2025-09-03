<template>
  <section
    v-if="isLoading || randomPokemon?.id"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Please wait</h1>
    <h3 class="animate-pulse">Loading pokemons...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-2 text-2xl">Who's That Pokémon?</h1>
    <div class="h-20 mt-3.5">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
        @click="getNextRound(4)"
      >
        Play again?
      </button>
    </div>

    <!-- Pokemon picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- Pokemon options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';
const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonsOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();
</script>
