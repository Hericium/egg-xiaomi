'use strict';
const moment = require('moment');
exports.format = time => moment(time).format('YYYY-MM-DD HH:mm');
