import { Document, model, Schema } from "mongoose";
import { TargetModel } from "./target-model";

//1. Model interface describing the data in the model:
export interface IGiftModel extends Document {
    name: string
    description: string
    price: number
    discount: number
    date: Date
    targetId: Schema.Types.ObjectId
}

//2. Model Schema describing validation, constraints and more:
const GiftSchema = new Schema<IGiftModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"],
        match: [/^[A-Z].+$/, "Name must start with a capital letter"],
        trim: true,
        unique: true

    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [3, "Description too short"],
        maxlength: [100, "Description too long"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]

    },
    discount: {
        type: Number,
        required: [true, "Missing discount"],
        min: [0, "Discount can't be negative"],
        max: [100, "Discount can't exceed 100"]

    },
    date: {
        type: Date,
        required: [true, "Missing date"],
    },
    targetId: Schema.Types.ObjectId

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
})

//Virtual Fields: 
GiftSchema.virtual('target', {
    ref: TargetModel,
    localField: 'targetId',
    foreignField: '_id',
    justOne: true

})

//3. Model Class - this is the final model class:
export const GiftModel = model<IGiftModel>('GiftModel', GiftSchema, 'gifts')

