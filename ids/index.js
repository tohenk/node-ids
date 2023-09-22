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

class Identity {

    sequences = []
    raw = null

    addSeq(seq) {
        this.sequences.push(seq);
        return this;
    }

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

    getLength() {
        const res = 0;
        this.sequences.forEach(seq => {
            res += seq.size;
        });
        return res;
    }

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

    setValue(name, value) {
        this.sequences.forEach(seq => {
            if (seq.hasKey(name)) {
                seq.setValue(value, name);
                return true;
            }
        });
        return this;
    }

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

    isLenValid() {
        return this.checkLength(this.raw);
    }

    checkLength(value) {
        return this.getLength() === value.length;
    }

    formatRaw(separator) {
        const raws = [];
        this.sequences.forEach(seq => {
            raws.push(seq.getRaw());
        });
        return raws.join(separator);
    }

    toString() {
        return this.raw;
    }
}

module.exports = Identity;