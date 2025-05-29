const Router = require('express')
const instructionsRouter = require('../controllers/instructionsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN USER'), instructionsRouter.create)
router.get('/', checkRoleMiddleware('ADMIN USER'), instructionsRouter.getAll)
router.get('/:id', checkRoleMiddleware('ADMIN USER'), instructionsRouter.getOne)

module.exports = router