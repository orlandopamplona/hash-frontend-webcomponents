export const localeParams = {
    'pt-BR': ['R$ ', '.', ','],
    'en-US': ['$ ', ',', '.']
}

export const resultValues = ['lblTomorrowValue', 'lbl15DaysValue', 'lbl30DaysValue', 'lbl90DaysValue']

export const inputValues = {
    salesValue: null,
    numberInstallments: null,
    mdrPercentage: null
}

/**
 * @param {String} injectProperty CSS tag to be added to the fetched element
 * @param {String} originalCss CSS element containing all tag used
 * @param {Object} classNameList CSS class identifier changed
 * @returns {Object} CSS block changed with new tag added
 * @description CSS class identifier changed
*/
export const setPropertyCss = (injectProperty, originalCss, classNameList) => {
    let cssInjected = originalCss
    let replaceElement = classNameList + ' {'
    let newElement = replaceElement + '\n  ' + injectProperty
    cssInjected = cssInjected.replace(replaceElement, newElement)
    return cssInjected
}

/**
 * @param {Object} classNameList CSS element containing all styles used
 * @param {String} css CSS style identifier that will be fetched from the full element
 * @param {String} injectProperty CSS tag to be added to the fetched element
 * @returns {Object} CSS block changed with new tag added
 * @description Searches for a particular element in the CSS style collection
 * and adds a certain tag to it
*/
export const getClassName = (classNameList, css, injectProperty) => {
    let styleElement = ''
    let matchFull = 0
    for (let className of classNameList) {
        let regexp = new RegExp(className + '([^<]+?)}')
        let classFound = regexp.exec(css)
        styleElement += (classFound[matchFull] + '\n\n')
    }
    return injectProperty ? setPropertyCss(injectProperty, css, classNameList) : styleElement
}


/**
 * @param {string} actualLocale Locale captured from the environment in which the application is running
 * @returns {string} Locale default (pt-BR) or the locale itself informed
 * @description Receives the value of the locale captured from the environment in which the application
 * is running, if it is invalid, returns the default locale pt-BR.
*/
export const getLocale = (actualLocale) => {
    return ((actualLocale) ? actualLocale : 'pt-BR')
}

/**
 * @param {Object} nestedMessages Element with all keys for current locale
 * @returns {Object} Default key/value element with internationalization information as per current locale
 * @description Search elements in key/value pattern for internationalization according to current locale
*/
export const flattenMessages = (nestedMessages, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key]
        let prefixedKey = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'string') {
            messages[prefixedKey] = value
        } else {
            Object.assign(messages, this.flattenMessages(value, prefixedKey))
        }
        return messages
    }, {})
}

/**
 * @param {string} value Value to be formatted
 * @param {string} places Decimal places
 * @param {string} symbol Currency symbol
 * @param {string} thousand Thousand symbol
 * @param {string} decimal Decimal symbol
 * @returns {string} Formatted monetary value field
 * @description Receives the value entered in the currency field and formats the numbers for display.
 */
export const currencyFormat = (value, places, symbol, thousand, decimal) => {
    places = !isNaN(places = Math.abs(places)) ? places : 2
    symbol = symbol !== undefined ? symbol : "R$"
    thousand = thousand || "."
    decimal = decimal || ","
    let number = value,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0

    return symbol + negative + (j ? i.substr(0, j) + thousand : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" +
            thousand) + (places ? decimal +
                Math.abs(number - i).toFixed(places).slice(2) : "");
}

/**
 * @param {string} locale Location detected in browser
 * @param {string} originalValueValue to be unformatted
 * @returns {string} Unformatted monetary value field
 * @description Converts monetary value to simple number.
 */
export const unformatString = (locale, originalValue) => {
    let parts = (1234.5).toLocaleString(locale).match(/(\D+)/g);
    let unformatted = originalValue;
    unformatted = unformatted.split(parts[0]).join("");
    unformatted = unformatted.split(parts[1]).join(".");
    return parseFloat(unformatted);
}
