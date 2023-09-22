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

const Sequence = require('.');

class SequenceDate extends Sequence {

    format = null

    constructor(size, keys, format = 'Ymd') {
        super(size, keys);
        this.format = format;
    }

    extractDate(s, format) {
        const res = {};
        let pos = 0;
        for (let i = 0; i < format.length; i++) {
            const sz = this.getDateSize(format.charAt(i));
            let value = parseInt(s.substr(pos, sz));
            pos += sz;
            if (format.charAt(i) === 'y') {
                value = this.getYearFromMillenia(value);
            }
            res[format.charAt(i).toLowerCase()] = value;
        }
        return res;
    }

    getYearFromMillenia(value) {
        const yr = (new Date()).getFullYear();
        let millenia = parseInt(yr.toString().substr(0, 2));
        if ((millenia * 100) + value > yr) {
            millenia--;
        }
        return (millenia * 100) + value;
    }

    decodeDate(s, format) {
        const dt = this.extractDate(s, format);
        if (Object.keys(dt).length > 0) {
            if (dt.y === undefined) {
                dt.y = (new Date()).getFullYear();
            }
            if (dt.d === undefined) {
                dt.d = 1;
            }
            try {
                return new Date(Date.UTC(dt.y, dt.m - 1, dt.d));
            }
            catch (err) {
                console.error(`Create date ${dt} returns ${err}!`);
            }
        }
    }

    formateDate(date) {
        const res = '';
        for (let i = 0; i < format.length; i++) {
            res += this.getDateFormatted(format.charAt(i), this.getDateValue(date, format.charAt(i)), this.getDateSize(format.charAt(i)));
        }
        return res;
    }

    getDateSize(format) {
        return format === 'Y' ? 4 : 2;
    }

    getDateValue(date, format) {
        switch (format) {
            case 'Y':
            case 'y':
                return date.getFullYear();
            case 'm':
                return date.getMonth() + 1;
            case 'd':
                return date.getDate();
        }
    }

    getDateFormatted(format, value, size) {
        let res = value.toString();
        if (format == 'y') {
            res = res.substr(2, 2);
        }
        if (res.length < size) {
            res = res.padStart(size, '0');
        }
        return res;
    }

    doDecode() {
        const date = this.decodeDate(this.raw, this.format);
        if (date) {
            this.setValue(date);
        }
    }

    doEncode() {
        const date = this.getValue();
        if (date) {
            this.raw = this.formateDate(date);
        }
    }
}

module.exports = SequenceDate;