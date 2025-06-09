import { Sequelize as OriginalSequelize } from 'sequelize/types/sequelize'
import { QueryInterface as OriginalQueryInterface } from 'sequelize/types/dialects/abstract/query-interface'
import {
	Model as OriginalModel,
	ModelStatic as OriginalModelCtor,
	ModelAttributes,
	ModelOptions,
	Attributes
} from 'sequelize/types/model'

import { Models } from '../../db'

declare module 'sequelize' {
	interface IModels extends Models {}

	export class Sequelize extends OriginalSequelize {
		// NOTE: redeclare getQueryInterface function to ours with overridden queryInterface return type, since it it not done automatically
		public getQueryInterface(): QueryInterface

		public define<M extends OriginalModel, TAttributes = Attributes<M>>(
			modelName: string,
			attributes: ModelAttributes<M, TAttributes>,
			options?: ModelOptions<M>
		): OriginalModelCtor<M> & {
			associate?: (models: IModels) => void
		}
	}

	export class QueryInterface extends OriginalQueryInterface {
		// NOTE: redeclare sequelize property to ours overridden sequelize type, since it it not done automatically
		public sequelize: Sequelize
	}
}
