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

/**
 * An identity sequence.
 */
class Sequence {

    size = null
    keys = []
    values = {}
    raw = null

    /**
     * Constructor.
     *
     * @param {number} size The sequence size
     * @param {string|string[]} keys  The sequence keys
     */
    constructor(size, keys) {
        this.size = size;
        if (Array.isArray(keys)) {
            this.keys.push(...keys);
        } else {
            this.keys.push(keys);
        }
        this.initialize();
    }

    /**
     * Do initialize the sequence.
     */
    initialize() {
    }

    /**
     * Check if sequence key is exist?
     *
     * @param {string} name Sequence key
     * @returns {boolean}
     */
    hasKey(name) {
        return this.keys.indexOf(name) >= 0 ? true : false;
    }

    /**
     * Check if all values has been set?
     *
     * @returns {boolean}
     */
    hasValues() {
        let res = true;
        this.keys.forEach(key => {
            if (res && this.values[key] === undefined) {
                res = false;
            }
        });
        return res;
    }

    /**
     * Get raw value.
     *
     * @returns {string}
     */
    getRaw() {
        return this.raw;
    }

    /**
     * Get value for sequence key. If key is ommited then first key assumed.
     *
     * @param {string|undefined|null} name Sequence key
     * @returns {*}
     */
    getValue(name) {
        if (name === undefined || name === null && this.keys.length) {
            name = this.keys[0];
        }
        if (name && this.keys.indexOf(name) >= 0) {
            return this.values[name];
        }
    }

    /**
     * Set sequence value.
     *
     * @param {*} value Sequence value
     * @param {string|undefined|null} name Sequence key
     * @returns {Sequence}
     */
    setValue(value, name) {
        if (name === undefined || name === null && this.keys.length) {
            name = this.keys[0];
        }
        if (name && this.keys.indexOf(name) >= 0) {
            this.values[name] = value;
        }
        return this;
    }

    /**
     * Decode a raw sequence value.
     *
     * @param {string} raw Raw value to decode
     * @returns {Sequence}
     * @throws {Error}
     */
    decode(raw) {
        if (typeof raw !== 'string') {
            raw = raw + '';
        }
        if (raw.length !== this.size) {
            throw new Error(`%s expects size of %d, got %s!`, this.constructor.name, this.size, raw.length);
        }
        this.raw = raw;
        this.doDecode();
        return this;
    }

    /**
     * Do decode value internally.
     */
    doDecode() {
        this.setValue(this.raw);
    }

    /**
     * Encode sequence values into raw value. The encoded value
     * then can be retrieved using {@link getRaw}.
     *
     * @returns {Sequence}
     */
    encode() {
        this.doEncode();
        return this;
    }

    /**
     * Do encode internally.
     */
    doEncode() {
        this.raw = this.getValue();
    }

    /**
     * Reset sequence.
     *
     * @returns {Sequence}
     */
    reset() {
        this.values = {};
        return this;
    }
}

module.exports = Sequence;