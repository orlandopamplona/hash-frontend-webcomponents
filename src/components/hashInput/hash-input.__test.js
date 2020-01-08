import { Input } from './input.js'
import { TestUtils } from '../test/test-utils.js';

describe('Testing web component <hash-input>', () => {
  it('displays hash-input default', async () => {
    const { shadowRoot } = await TestUtils.render(Input.tag);
    expect(shadowRoot.innerHTML.includes('inputDefault')).toBeTruthy();
  });

  it('displays hash-input with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Input.tag, { id: 'idInputTest' }
      );
      const value = shadowRoot.innerHTML.includes('idInputTest');
      expect(value).toBeTruthy();
  });

});
