const Router = require('express')
const tasksController = require('../controllers/tasksController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN USER'), tasksController.create)
router.get('/', tasksController.getAll)
router.get('/:id', tasksController.getOne)
router.put('/:id/status', tasksController.updateStatus);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);
module.exports = router