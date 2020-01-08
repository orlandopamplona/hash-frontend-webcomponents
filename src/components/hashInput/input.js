export class Input extends HTMLElement {

    static get tag() {
        return 'hash-input';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'inputDefault'
        this._width = 10
        this._height = 10
        this._content = 'DefaultContent'
        this._placeholder = 'Insert text here...'
        this._align = 'center'
        this._boxshadow = '0px 0px 0px 0px transparent'
        this._backgroundcolor = '#fff'
        this._fontsize = '12px'
        this._fontfamily = 'Roboto,sans-serif'
        this._fontcolor = '#000000'
        this._type = 'text'
        this._name = 'defaultName'
        this._readonly = ''
        this._classname = undefined
        this._styleinput = undefined
        this._activelistener = undefined
        this._typeMailValidation = undefined
        this._border = '1px solid #F7968'
        this._cashsymbol = 'R$'
        this._min = 0
        this._max = 999999
    }

    static get observedAttributes() {
        return [
            'id',
            'width',
            'height',
            'content',
            'placeholder',
            'align',
            'boxshadow',
            'backgroundcolor',
            'fontsize',
            'fontfamily',
            'fontcolor',
            'type',
            'name',
            'readonly',
            'classname',
            'styleinput',
            'activelistener',
            'typeMailValidation',
            'border',
            'cashsymbol',
            'min',
            'max'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id                : () => (this._id = newValue),
                width             : () => (this._width = newValue),
                height            : () => (this._height = newValue),
                content           : () => (this._content = newValue),
                placeholder       : () => (this._placeholder = newValue),
                align             : () => (this._align = newValue),
                backgroundcolor   : () => (this._backgroundcolor = newValue),
                fontsize          : () => (this._fontsize = newValue),
                boxshadow         : () => (this._boxshadow = newValue),
                fontfamily        : () => (this._fontfamily = newValue),
                fontcolor         : () => (this._fontcolor = newValue),
                type              : () => (this._type = newValue),
                name              : () => (this._name = newValue),
                classname         : () => (this._classname = newValue),
                styleinput        : () => (this._styleinput = newValue),
                readonly          : () => (this._readonly = newValue),
                activelistener    : () => (this._activelistener = newValue),
                typeMailValidation: () => (this._typeMailValidation = newValue),
                border            : () => (this._border = newValue),
                cashsymbol        : () => (this._cashsymbol = newValue),
                min               : () => (this._min = newValue),
                max               : () => (this._max = newValue)
            }
            elementUpdate[name]()
            this._updateRendering()
        }
    }

    /**
     * @param {string} inputValue Input field contents
     * @param {string} moneySignDecimal Decimal symbol
     * @param {string} moneySignThousand Thousand symbol
     * @returns {string} Formatted monetary value field
     * @description Receives the value entered in the currency field and formats the numbers for display.
    */
    formatMoney(inputValue, moneySignDecimal, moneySignThousand) {
        const v = ((inputValue.replace(/\D/g, '') / 100).toFixed(2) + '').split('.')
        const m = v[0].split('').reverse().join('').match(/.{1,3}/g)
        for (let i = 0; i < m.length; i++)
            m[i] = m[i].split('').reverse().join('') + moneySignThousand
        const r = m.reverse().join('')
        return this.cashsymbol.concat(' ', r.substring(0, r.lastIndexOf(moneySignThousand)), moneySignDecimal, v[1])
    }


    /**
     * @returns {} no return
     * @description Add a default listener with its control parameters
    */
    actionInputKeyUp(event) {
        const locale = navigator.language
        if (this.type != 'number') {
          locale === 'pt-BR' ?
          this.root.getElementById(this.id).value = this.formatMoney(this.root.getElementById(this.id).value, ',', '.') :
          this.root.getElementById(this.id).value = this.formatMoney(this.root.getElementById(this.id).value, '.', ',')
        }
        const evt = new CustomEvent('keyupinput',  {
            detail: {
                inputvalues: this.root.getElementById(this.id).value,
                focuselement: this.id
            },
            bubbles: true,
            cancelable: true
        })

       this.dispatchEvent(evt)
    }

    /**
     * @returns {} no return
     * @description Add listeners for handling numeric and monetary inputs
    */
    addListener() {
        if (this.activelistener) {
            this.onkeyup = (event) => { this.actionInputKeyUp(event) }
            this.onmouseup = (event) => { this.actionInputKeyUp(event) }
        }
    }

    connectedCallback() {
        this._updateRendering()
        this.addListener()
    }

    disconnectedCallback() {
        this.removeEventListener('keyup', () => { this.actionInputKeyUp() })
        this.removeEventListener('keyupinput', () => { this.actionInputKeyUp() })
        this.removeEventListener('onmouseup', () => { this.actionInputKeyUp() })
    }

    get id() {
        return this._id
    }

    set id(val) {
        this.setAttribute('id', val)
    }

    get width() {
        return this._width
    }

    set width(val) {
        this.setAttribute('width', val)
    }

    get height() {
        return this._height
    }

    set height(val) {
        this.setAttribute('height', val)
    }

    get content() {
        return this._content
    }

    set content(val) {
        this.setAttribute('content', val)
    }

    get placeholder() {
        return this._placeholder
    }

    set placeholder(val) {
        this.setAttribute('placeholder', val)
    }

    get align() {
        return this._align
    }

    set align(val) {
        this.setAttribute('align', val)
    }

    get boxshadow() {
        return this._boxshadow
    }

    set boxshadow(val) {
        this.setAttribute('boxshadow', val)
    }

    get backgroundcolor() {
        return this._backgroundcolor
    }

    set backgroundcolor(val) {
        this.setAttribute('backgroundcolor', val)
    }

    get fontsize() {
        return this._fontsize
    }

    set fontsize(val) {
        this.setAttribute('fontsize', val)
    }

    get fontfamily() {
        return this._fontfamily
    }

    set fontfamily(val) {
        this.setAttribute('fontfamily', val)
    }

    get fontcolor() {
        return this._fontcolor
    }

    set fontcolor(val) {
        this.setAttribute('fontcolor', val)
    }

    get type() {
        return this._type
    }

    set type(val) {
        this.setAttribute('type', val)
    }

    get name() {
        return this._name
    }

    set name(val) {
        this.setAttribute('name', val)
    }

    get value() {
        return this._value
    }

    set readonly(val) {
        this.setAttribute('readonly', val)
    }

    get classname() {
        return this._classname
    }

    set classname(val) {
        this.setAttribute('classname', val)
    }

    get styleinput() {
        return this._styleinput
    }

    set styleinput(val) {
        this.setAttribute('styleinput', val)
    }

    get activelistener() {
        return this._activelistener
    }

    set activelistener(val) {
        this.setAttribute('activelistener', val)
    }

    get typeMailValidation() {
        return this._typeMailValidation
    }

    set typeMailValidation(val) {
        this.setAttribute('typeMailValidation', val)
    }

    get border() {
        return this._border
    }

    set border(val) {
        this.setAttribute('border', val)
    }

    get cashsymbol() {
        return this._cashsymbol
    }

    set cashsymbol(val) {
        this.setAttribute('cashsymbol', val)
    }

    get min() {
        return this._min
    }

    set min(val) {
        this.setAttribute('min', val)
    }

    get max() {
        return this._max
    }

    set max(val) {
        this.setAttribute('max', val)
    }

    _updateRendering() {
        const defaultStyle = this.styleinput ? this.styleinput : `.inputStyle {
                                                                 width : ${this.width};
                                                                 height: ${this.height};
                                                                 text-align: ${this.align};
                                                                 box-shadow: ${this.boxshadow};
                                                                 background-color: ${this.backgroundcolor};
                                                                 font-size: ${this.fontsize};
                                                                 font-family: ${this.fontfamily};
                                                                 color: ${this.fontcolor};
                                                                 border: ${this.border};}`

        const templateStyle = (this.classname ? this.classname : 'inputStyle')

        const template =
            `<style>
                ${defaultStyle}
            </style>
            <input
                type='${this.type}'
                min='${this.min}'
                max='${this.max}'
                id='${this.id}'
                name='${this.name}'
                class='${templateStyle}'
                placeholder='${this.placeholder}'
                value='${this.content}'
                onfocus='${this.type != 'number' ? 'this.setSelectionRange(this.value.length, this.value.length);' : ''}'
                ${this.readonly ? this.readonly : ''}
                ${this.setfocus ? 'autofocus' : ''}

            >
            </input>`
        this.root.innerHTML = template
    }
}

customElements.define(Input.tag, Input)
