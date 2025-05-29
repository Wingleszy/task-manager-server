const Router = require('express')
const specialistsRouter = require('../controllers/specialistsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', specialistsRouter.create)
router.get('/', checkRoleMiddleware('ADMIN USER'), specialistsRouter.getAll)
router.get('/:id', checkRoleMiddleware('ADMIN USER'), specialistsRouter.getOne)

module.exports = router