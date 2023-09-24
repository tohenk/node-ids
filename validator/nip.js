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

const Validator = require('.');
const Nip = require('../ids/nip');

class NipValidator extends Validator {

    keyId = 'id'
    keyDob = 'dob'
    keyCapeg = 'capeg'
    keyGender = 'gender'

    initialize() {
        this.id = 'NIP';
        this.title = 'Validasi ID dengan Nomor Induk Pegawai (NIP)';
        this.label = 'Nomor Induk Pegawai (NIP)';
        this.identity = Nip;
    }

    doValidate(values) {
        if (this.isKeySet(values, [this.keyId, this.keyDob, this.keyCapeg, this.keyGender])) {
            /** @type {Nip} id */
            const id = this.createIdentity(values[this.keyId]);
            return this.cmp({
                [this.keyDob]: values[this.keyDob],
                [this.keyCapeg]: values[this.keyCapeg],
                [this.keyGender]: values[this.keyGender],
            }, {
                [this.keyDob]: id.getTglLahir(),
                [this.keyCapeg]: id.getTmtCapeg(),
                [this.keyGender]: id.getGender(),
            });
        }
        return false;
    }
}

const validator = new NipValidator();

module.exports = () => {
    if (Validator.get(validator.id) === undefined) {
        Validator.register(validator);
    }
}