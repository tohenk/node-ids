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

const SequenceDate = require('./date');

/**
 * A date for NIK.
 */
class SequenceDateNik extends SequenceDate {

    GENDER = 'gender'

    extractDate(s, format) {
        const res = super.extractDate(s, format);
        if (res.d) {
            let gender = SequenceDateNik.GENDER_MALE;
            if (res.d - SequenceDateNik.GENDER_DIVISOR > 0) {
                res.d -= SequenceDateNik.GENDER_DIVISOR;
                gender = SequenceDateNik.GENDER_FEMALE;
            }
            if (this.hasKey(this.GENDER)) {
                this.setValue(gender, this.GENDER);
            }
        }
        return res;
    }

    getDateValue(date, format) {
        let res = super.getDateValue(date, format);
        if (format === 'd' && this.hasKey(this.GENDER) && this.getValue(this.GENDER) === SequenceDateNik.GENDER_FEMALE) {
            res += SequenceDateNik.GENDER_DIVISOR;
        }
        return res;
    }

    static get GENDER_MALE() {
        return 'L';
    }

    static get GENDER_FEMALE() {
        return 'P';
    }

    static get GENDER_DIVISOR() {
        return 40;
    }
}

module.exports = SequenceDateNik;