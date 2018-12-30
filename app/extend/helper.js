'use strict';
const moment = require('moment');
exports.format = time => moment(new Date(time * 1000)).format('YYYY-MM-DD HH:mm');
