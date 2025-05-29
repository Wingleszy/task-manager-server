const { Users, Specialists, Clients } = require("../models/models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const uuid = require('uuid')
const { Client } = require("pg")

const generateJWT = (id, email, role) => {
    return jwt.sign({id: id, email: email, role}, process.env.SECRET_KEY, {
        expiresIn: '24h'
    })
}

class UsersController {
    async registration(req, res) {
        const {email, password, role, full_name, department, phone} = req.body
        const {avatar} = req.files
        let fileName = uuid.v4() + '.jpg'
        avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
        if (!email || !password) {
            return res.json('Введите логин/пароль')
        }
        const candidate = await Users.findOne({where: {email}})
        if (candidate) {
            return res.json('Пользователь уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        
        if (role == 'USER') {
            await Clients.create({email, name: full_name, phone, department, avatar: fileName})
        } else {
            await Specialists.create({email, name: full_name, phone, department, avatar: fileName})
        }
        const user = await Users.create({email, role, full_name, password_hash: hashPassword})
        const token = generateJWT(user.user_id, user.email, user.role)
        return res.json({token})
    } 
    async login(req, res) {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}})
        
        if (!user) {
            return res.json('Не найдено пользователя с данным email')
        }
        let comparePass = bcrypt.compareSync(password, user.password_hash)
        if (!comparePass) {
            return res.json('Неправильный логин/пароль')
        }
        const token = generateJWT(user.user_id, user.email, user.role)
        return res.json({token})
    } 
    async check(req, res) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        const user = await Users.findOne({where: {email: req.user.email}})
        return res.json({token, id: user.user_id})
    } 
    async getOne(req, res) {
        const {id} = req.params
        const user = await Users.findOne({
            where: {user_id: id}
        })
        return res.json(user)
    } 
}

module.exports = new UsersController()