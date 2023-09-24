/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2023 Toha <tohenk@yahoo.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const Identity = require('../ids');

class Validator {

    id = null
    title = null
    label = null
    identity = null

    /**
     * Constructor.
     */
    constructor() {
        this.initialize();
    }

    /**
     * Do initialize.
     */
    initialize() {
    }

    /**
     * Get validator id.
     *
     * @returns {string}
     */
    getId() {
        return this.id;
    }

    /**
     * Get validator title.
     *
     * @returns {string}
     */
    getTitle() {
        return this.title;
    }

    /**
     * Get validator label.
     *
     * @returns {string}
     */
    getLabel() {
        return this.label;
    }

    /**
     * Validate an identity values.
     *
     * @param {object} values Value to validate
     * @returns {boolean}
     */
    validate(values) {
        return this.doValidate(values);
    }

    /**
     * Do internal validation.
     *
     * @param {object} values Value to validate
     * @returns {boolean}
     */
    doValidate(values) {
        return false;
    }

    /**
     * Check if values contains specified keys?
     *
     * @param {object} values Value to check
     * @param {string[]} keys Keys to check
     * @returns {boolean}
     */
    isKeySet(values, keys) {
        let res = true;
        const valueKeys = Object.keys(values);
        keys.forEach(key => {
            if (res && valueKeys.indexOf(key) < 0) {
                res = false;
                return true;
            }
        });
        return res;
    }

    /**
     * Create identity.
     *
     * @param {string} id The identity value
     * @returns {Identity}
     */
    createIdentity(id) {
        return new this.identity(id);
    }

    /**
     * Compare identity values.
     *
     * @param {object} id1 First identity values
     * @param {object} id2 Second identity values
     * @returns {boolean}
     */
    cmp(id1, id2) {
        const keys1 = Object.keys(id1);
        const keys2 = Object.keys(id2);
        if (keys1.length === keys2.length) {
            for (let i = 0; i < keys1.length; i++) {
                if (keys2.indexOf(keys1[i]) < 0) {
                    return false;
                }
                const value1 = id1[keys1[i]] instanceof Date ? id1[keys1[i]].getTime() : id1[keys1[i]];
                const value2 = id2[keys1[i]] instanceof Date ? id2[keys1[i]].getTime() : id2[keys1[i]];
                if (value1 != value2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * Get all validators.
     *
     * @returns {Validator[]}
     */
    static get validators() {
        if (this._validators === undefined) {
            this._validators = {};
        }
        return this._validators;
    }

    /**
     * Register validator.
     *
     * @param {Validator} validator The validator
     * @returns {Validator}
     */
    static register(validator) {
        if (!validator instanceof Validator) {
            throw new Error('Only validator instance allowed!');
        }
        if (this.validators[validator.getId()] === undefined) {
            this.validators[validator.getId()] = validator;
        }
        return this;
    }

    /**
     * Get validator by its id.
     *
     * @param {string} id Validator id
     * @returns {Validator}
     */
    static get(id) {
        return this.validators[id];
    }
}

module.exports = Validator;