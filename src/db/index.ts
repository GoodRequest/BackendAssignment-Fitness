/* eslint import/no-cycle: 0 */

import path from 'path'
import fs from 'fs'
import { Sequelize } from 'sequelize'

import defineExercise from './exercise'
import defineProgram from './program'

const sequelize: Sequelize = new Sequelize('postgresql://localhost:5432/fitness_app', {
	logging: false
})

sequelize.authenticate().catch((e: any) => console.error(`Unable to connect to the database${e}.`))

const modelsBuilder = (instance: Sequelize) => ({
	// Import models to sequelize
	Exercise: instance.import(path.join(__dirname, 'exercise'), defineExercise),
	Program: instance.import(path.join(__dirname, 'program'), defineProgram),
})

const models = modelsBuilder(sequelize)

// check if every model is imported
const modelsFiles = fs.readdirSync(__dirname)
// -1 because index.ts can not be counted
if (Object.keys(models).length !== (modelsFiles.length - 1)) {
	throw new Error('You probably forgot import database model!')
}

Object.values(models).forEach((value: any) => {
	if (value.associate) {
		value.associate(models)
	}
})

export { models, modelsBuilder, sequelize }
