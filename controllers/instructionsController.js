const { Instructions } = require("../models/models")

class instructionsController {
    async create(req, res) {
        const {name, author, description} = req.body
        const instructions = await Instructions.create({name, author, description})
        return res.json(instructions)
    } 
    async getAll(req, res) {
        let instructions = await Instructions.findAll()
        return res.json(instructions)
    } 
    async getOne(req, res) {
        const {id} = req.params
        const instructions = await Instructions.findOne({
            where: {instruction_id: id}
        })
        return res.json(instructions)
    } 
}

module.exports = new instructionsController()