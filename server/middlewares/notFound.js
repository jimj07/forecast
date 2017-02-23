const ERROR_MSG = require('../../errormsg');
module.exports = (req, res) => {
    res.status(404).send({
        'error': ERROR_MSG.NOT_FOUND
    });
};