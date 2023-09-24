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

const Sequence = require('../sequence');

/**
 * A common identity base class.
 */
class Identity {

    sequences = []
    raw = null

    /**
     * Add an identity sequence.
     *
     * @param {Sequence} seq The sequence instance
     * @returns {Identity}
     */
    addSeq(seq) {
        this.sequences.push(seq);
        return this;
    }

    /**
     * Decode a value.
     *
     * @param {string} value The value do decode
     * @returns {boolean} True if value successfully decoded
     */
    decode(value) {
        if (value !== undefined && value !== null) {
            this.raw = value;
            const len = value.length;
            let pos = 0;
            this.sequences.forEach(seq => {
                seq.reset();
                if (pos + seq.size <= len) {
                    seq.decode(value.substr(pos, seq.size));
                    pos += seq.size;
                }
            });
            return this.isValid();
        }
    }

    /**
     * Encode identity sequence values.
     *
     * @returns {string}
     */
    encode() {
        const raws = [];
        let count = 0;
        this.sequences.forEach(seq => {
            if (!seq.hasValues()) {
                return true;
            }
            raws.push(seq.getRaw());
            count++;
        });
        if (count === this.sequences.length) {
            this.raw = raws.join('');
            return true;
        }
    }

    /**
     * Get identity length.
     *
     * @returns {number}
     */
    getLength() {
        return this.sequences.reduce((value, current) => value + current.size, 0);
    }

    /**
     * Get identity sequence value.
     *
     * @param {string} name Sequence key
     * @returns {*}
     */
    getValue(name) {
        let res;
        this.sequences.forEach(seq => {
            if (seq.hasKey(name)) {
                res = seq.getValue(name);
                return true;
            }
        });
        return res;
    }

    /**
     * Set identity sequence value.
     *
     * @param {string} name Sequence key
     * @param {*} value Sequence value
     * @returns {Identity}
     */
    setValue(name, value) {
        this.sequences.forEach(seq => {
            if (seq.hasKey(name)) {
                seq.setValue(value, name);
                return true;
            }
        });
        return this;
    }

    /**
     * Check if decoded sequence values are valid?
     *
     * @returns {boolean}
     */
    isValid() {
        let res = true;
        this.sequences.forEach(seq => {
            if (!seq.hasValues()) {
                res = false;
                return true;
            }
        });
        return res;
    }

    /**
     * Check if decoded sequences length is valid?
     *
     * @returns {boolean}
     */
    isLenValid() {
        return this.checkLength(this.raw);
    }

    /**
     * Check if identity length is matched.
     *
     * @param {string} value The identity value
     * @returns {boolean}
     */
    checkLength(value) {
        return this.getLength() === value.length;
    }

    /**
     * Format identity using separator.
     *
     * @param {string} separator Identity separator
     * @returns {string}
     */
    formatRaw(separator) {
        const raws = [];
        this.sequences.forEach(seq => {
            raws.push(seq.getRaw());
        });
        return raws.join(separator);
    }

    /**
     * Get string representation.
     *
     * @returns {string}
     */
    toString() {
        return this.raw;
    }
}

module.exports = Identity;