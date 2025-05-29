const { Specialists } = require("../models/models")

const path = require('path')
const uuid = require('uuid')

class specialistsController {
    async create(req, res) {
        const {name, department, phone, email, client_id} = req.body
            let fileName = null
            if(req.files) {
    
                const {img} = req.files
                
                fileName = uuid.v4() + '.jpg'
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
        
        const specialist = await Specialists.create({client_id, name, department, phone, email, avatar: fileName})
        return res.json(specialist)
    } 
    async getAll(req, res) {
        const specialist = await Specialists.findAll();
        return res.json(specialist)
    } 
    async getOne(req, res) {
        const {id} = req.params
        const specialist = await Specialists.findOne({
            where: {specialist_id: id}
        })
        return res.json(specialist)
    } 
}

module.exports = new specialistsController()