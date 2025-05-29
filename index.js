require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000;
const sequelize = require('./db')
const app = express()
const fileupload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const path = require('path')

const models = require('./models/models')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'WORKING!'})
// })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started at port ${PORT}`))
        
    } catch (e) {
        console.error(e);
        
    }
}

start()