const sequelize = require('../db');
const { DataTypes } = require('sequelize');


const Users = sequelize.define('users', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    email: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    password_hash: { type: DataTypes.STRING, allowNull: false }, 
    full_name: { type: DataTypes.STRING }, 
    role: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        defaultValue: 'USER' 
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Clients = sequelize.define('clients', {
    client_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Specialists = sequelize.define('specialists', {
    specialist_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Tasks = sequelize.define('tasks', {
    task_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    task_number: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.TEXT },
    task_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Instructions = sequelize.define('instructions', {
    instruction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    instruction_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Comments = sequelize.define('comments', {
    comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tasks', // Ссылка на таблицу tasks
            key: 'task_id'  // Внешний ключ
        }
    },
    client_id: { // Внешний ключ для клиента (может быть NULL)
        type: DataTypes.INTEGER,
        references: {
            model: 'clients',
            key: 'client_id'
        }
    },
    specialist_id: { // Внешний ключ для специалиста (может быть NULL)
        type: DataTypes.INTEGER,
        references: {
            model: 'specialists',
            key: 'specialist_id'
        }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Tasks.hasMany(Comments, { foreignKey: 'task_id' });
Comments.belongsTo(Tasks, { foreignKey: 'task_id' });

Clients.hasMany(Comments, { foreignKey: 'client_id' });
Comments.belongsTo(Clients, { foreignKey: 'client_id' });

Specialists.hasMany(Comments, { foreignKey: 'specialist_id' });
Comments.belongsTo(Specialists, { foreignKey: 'specialist_id' });

Clients.hasMany(Tasks, { foreignKey: 'client_id' });
Tasks.belongsTo(Clients, { foreignKey: 'client_id' });

Specialists.hasMany(Tasks, { foreignKey: 'specialist_id' });
Tasks.belongsTo(Specialists, { foreignKey: 'specialist_id' });

Specialists.hasMany(Instructions, { foreignKey: 'author' });
Instructions.belongsTo(Specialists, { foreignKey: 'author' });

module.exports = {
    Clients,
    Specialists,
    Tasks,
    Instructions,
    Users,
    Comments
};