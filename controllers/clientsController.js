const { Clients } = require("../models/models")
const uuid = require('uuid')
const path = require('path')


class ClientsController {
    async create(req, res) {
        const {name, department, phone, email} = req.body
        let fileName = null
        if(req.files) {

        const {img} = req.files
        
        fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        
        const client = await Clients.create({ name, department, phone, email, avatar: fileName})
        return res.json(client)
    } 
    async getAll(req, res) {
        const clients = await Clients.findAll();
        return res.json(clients)
    } 
    async getOne(req, res) {
        const {id} = req.params
        const client = await Clients.findOne({
            where: {client_id: id}
        })
        return res.json(client)
    } 
}

module.exports = new ClientsController()