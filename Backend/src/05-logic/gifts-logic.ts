import ErrorModel from "../03-models/error-model"
import { GiftModel, IGiftModel } from "../03-models/gift-model"
import { ITargetModel, TargetModel } from "../03-models/target-model"

async function getAllTargets():Promise<ITargetModel[]>{
    return TargetModel.find().exec()
}

async function getGiftsByTarget(targetId: string):Promise<IGiftModel[]> {
  return GiftModel.find({targetId}).populate('target').exec()
}

async function addGift(gift: IGiftModel):Promise<IGiftModel> {
    const errors = gift.validateSync() 
    if (errors) throw new ErrorModel(400, errors.message)

   return gift.save()
}

async function deleteGift(_id:string):Promise<void> {
    const deletedGift = await GiftModel.findByIdAndDelete(_id).exec()
    if (!deletedGift) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
}





export default {
    getAllTargets,
    getGiftsByTarget,
    addGift,
    deleteGift
}