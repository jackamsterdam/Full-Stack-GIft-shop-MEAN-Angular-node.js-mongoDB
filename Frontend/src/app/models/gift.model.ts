import { TargetModel } from "./target.model"

export class GiftModel {
    _id: string 
    name: string
    description: string
    price: number
    discount: number
    date: Date
    targetId: string
    target: TargetModel

}