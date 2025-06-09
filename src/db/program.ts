import { Sequelize, DataTypes, Model } from 'sequelize'
import { EXERCISE_DIFFICULTY } from '../utils/enums'
import { ExerciseModel } from './exercise'

export interface ProgramModel extends Model {
	id: number
	difficulty: EXERCISE_DIFFICULTY
	name: String

	exercises: ExerciseModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
	const ProgramModelCtor = sequelize.define<ProgramModel>(
		modelName,
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING(200),
			}
		}, 
		{
			paranoid: true,
			timestamps: true,
			tableName: 'programs'
		}
	)

	ProgramModelCtor.associate = (models) => {
		ProgramModelCtor.hasMany(models.Exercise, {
			foreignKey: {
				name: 'programID',
				allowNull: false
			}
		})
	}

	return ProgramModelCtor
}
