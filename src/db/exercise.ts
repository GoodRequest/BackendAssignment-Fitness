import { Sequelize, DataTypes, Model } from 'sequelize'
import { ProgramModel } from './program'

import { EXERCISE_DIFFICULTY } from '../utils/enums'

export interface ExerciseModel extends Model {
	id: number
	difficulty: EXERCISE_DIFFICULTY
	name: String

	program: ProgramModel
}

export default (sequelize: Sequelize, modelName: string) => {
	const ExerciseModelCtor = sequelize.define<ExerciseModel>(
		modelName,
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			difficulty: {
				type: DataTypes.ENUM(...Object.values(EXERCISE_DIFFICULTY))
			},
			name: {
				type: DataTypes.STRING(200),
			}
		}, 
		{
			paranoid: true,
			timestamps: true,
			tableName: 'exercises'
		}
	)

	ExerciseModelCtor.associate = (models) => {
		ExerciseModelCtor.belongsTo(models.Program, {
			foreignKey: {
				name: 'programID',
				allowNull: false
			},
		})
	}

	return ExerciseModelCtor
}
