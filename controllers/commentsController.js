const { Clients, Comments } = require("../models/models")
const uuid = require('uuid')
const path = require('path')


class CommentsController {
    async create(req, res) {
        const {task_id, client_id, specialist_id, text} = req.body
        let comment;
        if (client_id) {
            comment = await Comments.create({ task_id, client_id, text})
        } else {
            comment = await Comments.create({ task_id, specialist_id, text})
        }
        return res.json(comment)
    } 
    async getAll(req, res) {
        const {id} = req.params
        const comments = await Comments.findAll({
            where: {task_id: id}
        })
        return res.json(comments)
    } 
}

module.exports = new CommentsController()