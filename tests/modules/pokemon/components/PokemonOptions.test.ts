import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { mount } from '@vue/test-utils';

const options = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];

describe('<PokemonOptions />', () => {
  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: false },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(options.length);

    buttons.forEach((button, index) => {
      expect(button.attributes('class')).toBe(
        'bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100 capitalize disabled:shadow-none disabled:bg-gray-100',
      );
      expect(button.text()).toBe(options[index].name);
    });
  });

  test('should emit selectedOption event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: false },
    });

    const [b1, b2, b3] = wrapper.findAll('button');
    await b1.trigger('click');
    await b2.trigger('click');
    await b3.trigger('click');

    expect(wrapper.emitted().selectedOption).toBeTruthy();
  });

  test('should disabled buttons when blockSelection prop is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: { options, blockSelection: true },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      expect(button.attributes()).toHaveProperty('disabled', '');
    });
  });
});
