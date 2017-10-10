const router = require('express').Router()
const path = require('path')
const controller = require(`controllers/${path.parse(module.filename).name}`)

router.get('/', controller.index);
router.get('/new', controller.new);
router.post('/new', controller.create);
router.post('/destroy', controller.delete);

module.exports = router