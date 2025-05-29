const Router = require('express')

const router = new Router()
const instructionsRouter = require('./instructionsRouter')
const tasksRouter = require('./tasksRouter')
const userRouter = require('./usersRouter')
const clientsRouter = require('./clientsRouter')
const specialistsRouter = require('./specialistsRouter')
const commentsRouter = require('./commentsRouter')

router.use('/user', userRouter)
router.use('/tasks', tasksRouter)
router.use('/instructions', instructionsRouter)
router.use('/clients', clientsRouter)
router.use('/specialists', specialistsRouter)
router.use('/comments', commentsRouter)

module.exports = router