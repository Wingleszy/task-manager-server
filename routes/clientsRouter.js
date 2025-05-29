const Router = require('express')
const clientsController = require('../controllers/clientsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', clientsController.create)
router.get('/', checkRoleMiddleware('ADMIN USER'), clientsController.getAll)
router.get('/:id', checkRoleMiddleware('ADMIN USER'), clientsController.getOne)

module.exports = router