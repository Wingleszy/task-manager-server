const uuid = require('uuid')
const path = require('path')
const { Tasks } = require('../models/models')

class TasksController {
    async create(req, res) {
        const {name, specialist_id, client_id, description, task_number, status} = req.body
        
        const task = await Tasks.create({name, task_number, client_id, description, specialist_id, status})
        return res.json(task)
    } 
    async getAll(req, res) {
       let tasks = await Tasks.findAll()
       return res.json(tasks)
    } 
    async getOne(req, res) {
        const {id} = req.params
        const task = await Tasks.findOne({
            where: {task_id: id}
        })
        return res.json(task)
    } 

    async updateStatus(req, res) {
        const { id } = req.params; // ID задачи
        const { status } = req.body; // Новый статус

        try {
            const task = await Tasks.findByPk(id);

            if (!task) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }

            // Обновляем статус задачи
            task.status = status;
            await task.save();

            return res.json({ message: 'Статус успешно обновлен', task });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async updateTask(req, res) {
        const { id } = req.params; // ID задачи
        const { name, specialist_id, client_id, description, task_number, status } = req.body; // Обновляемые данные

        try {
            const task = await Tasks.findByPk(id);

            if (!task) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }

            // Обновляем поля задачи
            task.name = name || task.name;
            task.specialist_id = specialist_id || task.specialist_id;
            task.client_id = client_id || task.client_id;
            task.description = description || task.description;
            task.task_number = task_number || task.task_number;
            task.status = status || task.status;

            await task.save();

            return res.json({ message: 'Задача успешно обновлена', task });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    
    async deleteTask(req, res) {
        const { id } = req.params;

        try {
            const task = await Tasks.findByPk(id);

            if (!task) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }

            await task.destroy();
            return res.json({ message: 'Задача успешно удалена' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new TasksController()