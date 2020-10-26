import { Model } from 'sequelize'

// eslint-disable-next-line
export class DatabaseModel<T = string, T2 = Model> extends Model<T, T2> {
	static associate?: (models: any) => void
}
