require('dotenv').config();
const express = require('express');
const sequelize = require('./db/index');

const app = express();


const dbConection = async () => {
    try {
        await sequelize.authenticate()
        console.log('>> Connection has been established successfully')
    } catch (error) {
        console.log(error)
        throw new Error('>> Database connection error');
    }
}


const expressListener = async () => {
    try {
        await app.listen(process.env.PORT)
        console.log('>> Appsadero is running!')
        await dbConection();

    } catch (error) {
        console.log(error)
        throw new Error('>> Connection error')
    }

}

expressListener();