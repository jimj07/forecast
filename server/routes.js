'use strict';

const Router = require('express').Router;
const processReq = require('./processReq');

const router = new Router();

router.get('/weather/:location', processReq());

router.get('/weather/:location/today', processReq({
    weekday: 'today'
}));

router.get('/weather/:location/:weekday', processReq());



module.exports = router;