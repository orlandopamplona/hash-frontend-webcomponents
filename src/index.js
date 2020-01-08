import '@webcomponents/webcomponentsjs'
import '@webcomponents/custom-elements'
import './components/hashText/text'
import './components/hashInput/input'
import styleIndex from './css/styleIndex.css'
import styleText from './css/styleText.css'
import styleInput from './css/styleInput.css'
import messages from './messages'
import * as utils from './utils'
import { calcHashAnticipationDefault } from 'hash-anticipation-calc-library'

const locale = navigator.language
const localeSigns = utils.localeParams[locale]
const messagesByLocale = utils.flattenMessages(messages[utils.getLocale(locale)].detail)

export class Simulator extends HTMLElement {

    static get tag() {
        return 'hash-simulator';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'defaultSimulator'
    }

    static get observedAttributes() {
        return [
            'id'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id: () => (this._id = newValue)
            }
            elementUpdate[name]()
            this._updateRendering()
        }
    }

    /**
     * @param {string} event Listener event captured
     * @description Captures input and screen values and performs anticipation calculation.
     */
    listenerKeyUp(event) {
        if (event) {
            event.stopPropagation()
            if (event.detail.focuselement === 'inputSaleValue') {
                utils.inputValues.salesValue = utils.unformatString(locale, event.detail.inputvalues.replace(localeSigns[0], ''))
            }
            if (event.detail.focuselement === 'inputNumberInstallments') {
                utils.inputValues.numberInstallments = event.detail.inputvalues
            }
            if (event.detail.focuselement === 'inputMdrPercentage') {
                utils.inputValues.mdrPercentage = event.detail.inputvalues
            }
            if (utils.inputValues.salesValue && utils.inputValues.numberInstallments && utils.inputValues.mdrPercentage) {
                this.parseToLocalFormat(calcHashAnticipationDefault(utils.inputValues.numberInstallments, utils.inputValues.mdrPercentage, utils.inputValues.salesValue), false)
                return
            }
            if (!utils.inputValues.salesValue && utils.inputValues.numberInstallments && utils.inputValues.mdrPercentage) {
                this.parseToLocalFormat(undefined, true)
            }
        }
    }

    /**
     * @param {object} originalElement Element that contains the anticipation calculations performed
     * @param {boolean} resetValues Identifies whether values should be zeroed or display calculated values.
     * @description Injects calculated values into fields for screen display.
     */
    parseToLocalFormat(originalElement, resetValues) {
        for (let index = 0; index < 4; index++) {
            resetValues ?
                this.root.getElementById(utils.resultValues[index]).content = utils.currencyFormat('0.00', 2, localeSigns[0], localeSigns[1], localeSigns[2]) :
                this.root.getElementById(utils.resultValues[index]).content = utils.currencyFormat(originalElement[index].discountedInstallment, 2, localeSigns[0], localeSigns[1], localeSigns[2])
        }
    }

    connectedCallback() {
        this._updateRendering()
        this.root.addEventListener('keyupinput', e => {
            this.listenerKeyUp(e)
        })
    }

    disconnectedCallback() {
        this.root.removeEventListener('keyupinput', this.listenerKeyUp(null))
    }

    get id() {
        return this._id
    }

    set id(val) {
        this.setAttribute('id', val)
    }

    _updateRendering() {

        const template = `
            <style>
                ${styleIndex}
            </style>
            <div id='${this.id}' class='divForm'>
                <div id='divTitle' class='divTitle'>
                    <hash-text
                        content = '${messagesByLocale.textTitle}'
                        id = 'lblTitle'
                        classname = 'title'
                        styletext = '${utils.getClassName(['.title'], styleText)}'>
                    </hash-text>
                </div>
                <div id='divFieldSaleValue' class='divFieldSaleValue'>
                    <div id='divFieldSaleValueLabel' class='divFieldSaleValueLabel'>
                        <hash-text
                            content = '${messagesByLocale.textValue}'
                            id = 'lblSaleValue'
                            classname = 'saleValue'
                            styletext = '${utils.getClassName(['.saleValue'], styleText)}'>
                        </hash-text>
                    </div>
                    <div id='divFieldSaleValueInput' class='divFieldSaleValueInput'>
                        <hash-input
                            content = '${this.inputsalevalue ? this.inputsalevalue : ''}'
                            cashsymbol = '${messagesByLocale.textSignCashSymbol}'
                            id = 'inputSaleValue'
                            name = 'inputSaleValue'
                            classname = 'saleValueInput'
                            activelistener = 'true'
                            placeholder = '${messagesByLocale.textSignCash}'
                            styleinput = '${utils.getClassName(['.saleValueInput'], styleInput)}'>
                        </hash-input>
                    </div>
                </div>
                <div id='divFieldNumberInstallments' class='divFieldNumberInstallments'>
                    <div id='divFieldNumberInstallmentsLabel' class='divFieldNumberInstallmentsLabel'>
                        <hash-text
                            content = '${messagesByLocale.textInstallment}'
                            id = 'lblNumberInstallments'
                            classname = 'numberInstallments'
                            styletext = '${utils.getClassName(['.numberInstallments'], styleText)}'>
                        </hash-text>
                    </div>
                    <div id='divFieldNumberInstallmentsInput' class='divFieldNumberInstallmentsInput'>
                        <hash-input
                            content = '${this.numberInstallments ? this.numberInstallments : ''}'
                            id = 'inputNumberInstallments'
                            name = 'inputNumberInstallments'
                            classname = 'numberInstallmentsInput'
                            activelistener = 'true'
                            type = 'number'
                            min = '1'
                            max = '12'
                            placeholder = '1..12'
                            styleinput = '${utils.getClassName(['.numberInstallmentsInput'], styleInput)}'>
                        </hash-input>
                    </div>
                    <div id='divFieldMaxInstallmentsLabel' class='divFieldNumberInstallmentsLabel'>
                        <hash-text
                            content = '${messagesByLocale.textMaxInstallment}'
                            id = 'lblMaxInstallments'
                            classname = 'maxInstallments'
                            styletext = '${utils.getClassName(['.maxInstallments'], styleText)}'>
                        </hash-text>
                    </div>
                </div>
                <div id='divFieldMdrPercentage' class='divFieldMdrPercentage'>
                    <div id='divFieldMdrPercentageLabel' class='divFieldMdrPercentageLabel'>
                        <hash-text
                            content = '${messagesByLocale.textMDR}'
                            id = 'lblMdrPercentage'
                            classname = 'mdrPercentage'
                            styletext = '${utils.getClassName(['.mdrPercentage'], styleText)}'>
                        </hash-text>
                    </div>
                    <div id='divFieldMdrPercentageInput' class='divFieldMdrPercentageInput'>
                        <hash-input
                            content = '${this.mdrPercentage ? this.mdrPercentage : ''}'
                            id = 'inputMdrPercentage'
                            name = 'inputMdrPercentage'
                            classname = 'mdrPercentageInput'
                            activelistener = 'true'
                            type = 'number'
                            min = '1'
                            max = '100'
                            placeholder = '1..100'
                            styleinput = '${utils.getClassName(['.mdrPercentageInput'], styleInput)}'>
                        </hash-input>
                    </div>
                </div>
            </div>
            <div id='divResult' class='divResult'>
                <div id='divYouReceive' class='divYouReceive'>
                    <hash-text
                        content = '${messagesByLocale.textResultTitle}'
                        id = 'lblYouReceive'
                        classname = 'youReceive'
                        styletext = '${utils.getClassName(['.youReceive'], styleText)}'>
                    </hash-text>
                </div>
                <div id='divFieldTomorrowValue' class='divFieldDaysGroup'>
                    <div id='divFieldTomorrowLabel' class='divFieldDays'>
                        <hash-text
                            content = '${messagesByLocale.textResultTomorrow}'
                            id = 'lblTomorrow'
                            classname = 'days'
                            styletext = '${utils.getClassName(['.days'], styleText)}'>
                        </hash-text>
                    </div>
                    <div id='divFieldTomorrowValueLabel' class='divFieldDaysValue'>
                        <hash-text
                            content = '${messagesByLocale.textSignCash}'
                            id = 'lblTomorrowValue'
                            classname = 'daysValue'
                            styletext = '${utils.getClassName(['.daysValue'], styleText)}'>
                        </hash-text>
                    </div>
                </div>
                <div id='divField15DaysValue' class='divFieldDaysGroup'>
                    <div id='divField15DaysLabel' class='divFieldDays'>
                        <hash-text
                            content = '${messagesByLocale.textResult15Days}'
                            id = 'lbl15Days'
                            classname = 'days'
                            styletext = '${utils.getClassName(['.days'], styleText)}'>
                        </hash-text>
                    </div>
                    <div id='divField15DaysValueLabel' class='divFieldDaysValue'>
                        <hash-text
                            content = '${messagesByLocale.textSignCash}'
                            id = 'lbl15DaysValue'
                            classname = 'daysValue'
                            styletext = '${utils.getClassName(['.daysValue'], styleText)}'>
                        </hash-text>
                    </div>
                </div>
                <div id='divField30DaysValue' class='divFieldDaysGroup'>
                    <div id='divField30DaysLabel' class='divFieldDays'>
                        <hash-text
                            content = '${messagesByLocale.textResult30Days}'
                            id = 'lbl30Days'
                            classname = 'days'
                            styletext = '${utils.getClassName(['.days'], styleText)}'>
                        </hash-text>
                    </div>
                    <div id='divField30DaysValueLabel' class='divFieldDaysValue'>
                        <hash-text
                            content = '${messagesByLocale.textSignCash}'
                            id = 'lbl30DaysValue'
                            classname = 'daysValue'
                            styletext = '${utils.getClassName(['.daysValue'], styleText)}'>
                        </hash-text>
                    </div>
                </div>
                <div id='divField90DaysValue' class='divFieldDaysGroup'>
                    <div id='divField90DaysLabel' class='divFieldDays'>
                        <hash-text
                            content = '${messagesByLocale.textResult90Days}'
                            id = 'lbl90Days'
                            classname = 'days'
                            styletext = '${utils.getClassName(['.days'], styleText)}'>
                        </hash-text>
                    </div>
                    <div id='divField90DaysValueLabel' class='divFieldDaysValue'>
                        <hash-text
                            content = '${messagesByLocale.textSignCash}'
                            id = 'lbl90DaysValue'
                            classname = 'daysValue'
                            styletext = '${utils.getClassName(['.daysValue'], styleText)}'>
                        </hash-text>
                    </div>
                </div>
            </div>
    `
        this.root.innerHTML = template
    }

}

customElements.define(Simulator.tag, Simulator)
