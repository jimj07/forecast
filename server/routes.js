'use strict';

const Router = require('express').Router;
const processReq = require('./middlewares/processReq');

const router = new Router();

router.get('/weather/:location', processReq());

router.get('/weather/:location/:weekday', processReq());

router.get('/weather/:location/today', processReq({
    weekday: 'today'
}));

module.exports = router;