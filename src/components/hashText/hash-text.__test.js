import { Text } from './text.js'
import { TestUtils } from '../test/test-utils.js';

describe('Testing web component <hash-text>', () => {
  it('displays hash-text default', async () => {
    const { shadowRoot } = await TestUtils.render(Text.tag);
    expect(shadowRoot.innerHTML.includes('DefaultContent')).toBeTruthy();
  });

  it('displays hash-text with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Text.tag, { id: 'idTextTest', content: 'testing...'}
      );
      const value = shadowRoot.innerHTML.includes('idTextTest');
      expect(value).toBeTruthy();
  });

});
