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
const Sequence = require('../sequence');
const SequenceDateNik = require('../sequence/datenik');
const SequenceSerial = require('../sequence/serial');

class Nik extends Identity {

    /**
     * Constructor.
     *
     * @param {string} nik The NIK value to decode upon creation
     */
    constructor(nik = null) {
        super();
        this
            .addSeq(new Sequence(6, Nik.WILAYAH))
            .addSeq(new SequenceDateNik(6, [Nik.DOB, Nik.GENDER], 'dmy'))
            .addSeq(new SequenceSerial(4, Nik.SEQUENCE))
            .decode(nik);
    }

    /**
     * Get `wilayah` part from NIK.
     *
     * @returns {string}
     */
    getWilayah() {
        return this.getValue(Nik.WILAYAH);
    }

    /**
     * Get date of birth part from NIK.
     *
     * @returns {Date}
     */
    getTglLahir() {
        return this.getValue(Nik.DOB);
    }

    /**
     * Get gender part from NIK.
     *
     * @returns {string}
     */
    getGender() {
        return this.getValue(Nik.GENDER);
    }

    /**
     * Get sequence part from NIK.
     *
     * @returns {number}
     */
    getUrut() {
        return this.getValue(Nik.SEQUENCE);
    }

    static get WILAYAH() {
        return 'wilayah';
    }

    static get DOB() {
        return 'dob';
    }

    static get GENDER() {
        return 'gender';
    }

    static get SEQUENCE() {
        return 'seq';
    }
}

module.exports = Nik;