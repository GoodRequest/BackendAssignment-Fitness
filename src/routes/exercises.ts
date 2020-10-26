import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../db'

const router: Router = Router()

const {
	Exercise,
	Program
} = models

export default () => {
	router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
		const exercises = await Exercise.findAll({
			include: [{
				model: Program,
				as: 'program'
			}]
		})

		return res.json({
			data: exercises,
			message: 'List of exercises'
		})
	})

	return router
}
