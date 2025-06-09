import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../db'

const router = Router()

const {
	Exercise,
	Program
} = models

export default () => {
	router.get('/', async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		const exercises = await Exercise.findAll({
			include: [{
				model: Program
			}]
		})

		return res.json({
			data: exercises,
			message: 'List of exercises'
		})
	})

	return router
}
