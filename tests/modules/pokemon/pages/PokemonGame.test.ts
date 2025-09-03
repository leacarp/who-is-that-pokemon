import { mount } from '@vue/test-utils';
import type { Mock } from 'vitest';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { GameStatus } from '@/modules/pokemon/interfaces';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonOptions = [
  {
    name: 'bulbasaur',
    url: '1',
  },
  {
    name: 'ivysaur',
    url: '2',
  },
  {
    name: 'venusaur',
    url: '3',
  },
  {
    name: 'charmander',
    url: '4',
  },
];

describe('<PokemonGame />', () => {
  test('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: undefined,
      isLoading: true,
      gameStatus: GameStatus.Playing,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Please wait');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
  });

  test('should render <PokemonPicture /> and <PokemonOptions />', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonOptions.at(0),
      isLoading: false,
      gameStatus: GameStatus.Playing,
      pokemonOptions: pokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const imageUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
    const pokemons = pokemonOptions.map((p) => p.name);

    expect(wrapper.find('img').attributes('src')).toBe(imageUrl);

    const buttons = wrapper.findAll('.capitalize');
    expect(buttons).length(4);
    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text());
    });
  });
});
