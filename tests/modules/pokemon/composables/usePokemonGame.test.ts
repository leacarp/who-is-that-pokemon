import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonListFake } from '../../../data/fake-pokemon';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  test('should initialize with the correct default values', async () => {
    const [result, app] = withSetup(usePokemonGame);

    expect(result.gameStatus.value).toBe(GameStatus.Playing);
    expect(result.isLoading.value).toBe(true);
    expect(result.pokemonsOptions.value).toEqual([]);
    expect(result.randomPokemon.value).toBe(undefined);

    await flushPromises();

    expect(result.isLoading.value).toBe(false);
    expect(result.pokemonsOptions.value.length).toEqual(4);
    expect(result.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correctly handle getNextRound', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();

    result.getNextRound(5);

    expect(result.gameStatus.value).toBe(GameStatus.Playing);
    expect(result.pokemonsOptions.value).toHaveLength(5);
  });

  test('should correctly handle getNextRound and return different pokemons', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();

    const firtsOptions = [...result.pokemonsOptions.value].map((p) => p.name);

    result.getNextRound();

    const secondOptions = [...result.pokemonsOptions.value];

    secondOptions.forEach((pokemon) => {
      expect(firtsOptions).not.toContain(pokemon.name);
    });
  });

  test('should correctly handle a incorrect answer', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus } = result;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(1000000000); // Pokemon ID not exists

    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correctly handle a incorrect answer', async () => {
    const [result] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = result;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(randomPokemon.value.id);
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
    });

    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
