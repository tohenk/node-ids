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

class Nrp extends Identity {

    /**
     * Constructor.
     *
     * @param {string} nrp The NRP value to decode upon creation
     */
    constructor(nrp = null) {
        super();
        this
            .addSeq(new SequenceDate(4, Nrp.LAHIR, 'ym'))
            .addSeq(new SequenceSerial(4, Nrp.SEQUENCE))
            .decode(nrp);
    }

    /**
     * Get date of birth from NRP.
     *
     * @returns {Date}
     */
    getLahir() {
        return this.getValue(Nrp.LAHIR);
    }

    /**
     * Get sequence part from NRP.
     *
     * @returns {number}
     */
    getUrut() {
        return this.getValue(Nrp.SEQUENCE);
    }

    static get LAHIR() {
        return 'lahir';
    }

    static get SEQUENCE() {
        return 'seq';
    }
}

module.exports = Nrp;