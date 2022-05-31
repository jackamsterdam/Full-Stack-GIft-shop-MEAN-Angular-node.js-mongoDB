import express, { NextFunction, Request, Response } from 'express'
import { GiftModel } from '../03-models/gift-model'
import giftsLogic from '../05-logic/gifts-logic'

const router = express.Router()

//http://localhost:3001/api/targets/
router.get('/targets', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const targets = await giftsLogic.getAllTargets()
        response.json(targets)
    } catch (err: any) {
        next(err)
    }
})

// http://localhost:3001/api/gifts-by-target/928349382409/
router.get('/gifts-by-target/:targetId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const targetId = request.params.targetId
        const gifts = await giftsLogic.getGiftsByTarget(targetId)
        response.json(gifts)
    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/gifts/
router.post('/gifts', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const gift = new GiftModel(request.body)
        const addedGift = await giftsLogic.addGift(gift)
        response.status(201).json(addedGift)
    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/gifts/239473298/
router.delete('/gifts/:_id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await giftsLogic.deleteGift(_id)
        response.sendStatus(204)
    } catch (err: any) {
        next(err)
    }
})

export default router 