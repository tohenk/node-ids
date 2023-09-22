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

class Sequence {

    size = null
    keys = []
    values = {}
    raw = null

    constructor(size, keys) {
        this.size = size;
        if (Array.isArray(keys)) {
            this.keys.push(...keys);
        } else {
            this.keys.push(keys);
        }
        this.initialize();
    }

    initialize() {
    }

    hasKey(name) {
        return this.keys.indexOf(name) >= 0 ? true : false;
    }

    hasValues() {
        let res = true;
        this.keys.forEach(key => {
            if (res && this.values[key] === undefined) {
                res = false;
            }
        });
        return res;
    }

    getRaw() {
        return this.raw;
    }

    getValue(name) {
        if (name === undefined || name === null && this.keys.length) {
            name = this.keys[0];
        }
        if (name && this.keys.indexOf(name) >= 0) {
            return this.values[name];
        }
    }

    setValue(value, name) {
        if (name === undefined || name === null && this.keys.length) {
            name = this.keys[0];
        }
        if (name && this.keys.indexOf(name) >= 0) {
            this.values[name] = value;
        }
        return this;
    }

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

    doDecode() {
        this.setValue(this.raw);
    }

    encode() {
        this.doEncode();
        return this;
    }

    doEncode() {
        this.raw = this.getValue();
    }

    reset() {
        this.values = {};
        return this;
    }
}

module.exports = Sequence;