import { Simulator } from './index.js'
import { TestUtils } from './components/test/test-utils.js';


describe('Testing web component <hash-simulator>', () => {

  it('displays hash-simulator default', async () => {
    const { shadowRoot } = await TestUtils.render(Simulator.tag);
    expect(shadowRoot.innerHTML.includes('defaultSimulator')).toBeTruthy();
  });

  it('displays hash-simulator with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Simulator.tag, { id: 'idSimulatorTest' }
      );
      const mainDiv = shadowRoot.innerHTML.includes('idSimulatorTest');
      expect(mainDiv).toBeTruthy();
  });

  it('displays hash-simulator performing anticipation calculation', async () => {
    const { shadowRoot } = await TestUtils.render(
      Simulator.tag, { id: 'idSimulatorTest' }
    );
    const inputSaleValue = shadowRoot.getElementById('inputSaleValue');
    const inputNumberInstallments = shadowRoot.getElementById('inputNumberInstallments');
    const inputMdrPercentage = shadowRoot.getElementById('inputMdrPercentage');
    const evtSaleValue = new CustomEvent('keyupinput', {
      detail: {
                inputvalues : 'R$ 150,00',
                focuselement: 'inputSaleValue'
              },
              bubbles: true,
              cancelable: true
    })
    const evtNumberInstallments = new CustomEvent('keyupinput', {
      detail: {
                inputvalues : '3',
                focuselement: 'inputNumberInstallments'
              },
              bubbles: true,
              cancelable: true
    })
    const evtMdrPercentage = new CustomEvent('keyupinput', {
      detail: {
                inputvalues : '4',
                focuselement: 'inputMdrPercentage'
              },
              bubbles: true,
              cancelable: true
    })
    inputSaleValue.dispatchEvent(evtSaleValue);
    inputNumberInstallments.dispatchEvent(evtNumberInstallments);
    inputMdrPercentage.dispatchEvent(evtMdrPercentage);

    expect(shadowRoot.getElementById('lblTomorrowValue').content).toEqual('R$ 132,67');
    expect(shadowRoot.getElementById('lbl15DaysValue').content).toEqual('R$ 135,36');
    expect(shadowRoot.getElementById('lbl30DaysValue').content).toEqual('R$ 138,24');
    expect(shadowRoot.getElementById('lbl90DaysValue').content).toEqual('R$ 144,00');

});

});
