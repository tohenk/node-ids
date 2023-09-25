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

const SequenceDate = require('../sequence/date');

const date = new SequenceDate();
console.log(date.decodeDate('20240131', 'Ymd'));
console.log(date.decodeDate('20240229', 'Ymd'));
console.log(date.decodeDate('20240331', 'Ymd'));
console.log(date.decodeDate('20240430', 'Ymd'));
console.log(date.decodeDate('20240531', 'Ymd'));
console.log(date.decodeDate('20240630', 'Ymd'));
console.log(date.decodeDate('20240731', 'Ymd'));
console.log(date.decodeDate('20240831', 'Ymd'));
console.log(date.decodeDate('20240930', 'Ymd'));
console.log(date.decodeDate('20241031', 'Ymd'));
console.log(date.decodeDate('20241130', 'Ymd'));
console.log(date.decodeDate('20241231', 'Ymd'));
