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

const Identity = require('.');
const SequenceDate = require('../sequence/date');
const SequenceSerial = require('../sequence/serial');

class Nip extends Identity {

    /**
     * Constructor.
     *
     * @param {string} nip The NIP value to decode upon creation
     */
    constructor(nip = null) {
        super();
        this
            .addSeq(new SequenceDate(8, Nip.DOB, 'Ymd'))
            .addSeq(new SequenceDate(6, Nip.CAPEG, 'Ym'))
            .addSeq(new SequenceSerial(1, Nip.GENDER))
            .addSeq(new SequenceSerial(3, Nip.SEQUENCE))
            .decode(nip);
    }

    /**
     * Get date of birth part from NIP.
     *
     * @returns {Date}
     */
    getTglLahir() {
        return this.getValue(Nip.DOB);
    }

    /**
     * Get date of capeg part from NIP.
     *
     * @returns {Date}
     */
    getTmtCapeg() {
        return this.getValue(Nip.CAPEG);
    }

    /**
     * Get gender part from NIP. It returns 1 for male and 2 for female.
     *
     * @returns {number}
     */
    getGender() {
        return this.getValue(Nip.GENDER);
    }

    /**
     * Get sequence part from NIP.
     *
     * @returns {number}
     */
    getUrut() {
        return this.getValue(Nip.SEQUENCE);
    }

    static get DOB() {
        return 'dob';
    }

    static get CAPEG() {
        return 'capeg';
    }

    static get GENDER() {
        return 'gender';
    }

    static get SEQUENCE() {
        return 'seq';
    }
}

module.exports = Nip;