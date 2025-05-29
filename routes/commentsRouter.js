const Router = require('express')
const commentsController = require('../controllers/commentsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', commentsController.create)
router.get('/:id', checkRoleMiddleware('ADMIN USER'), commentsController.getAll)

module.exports = router