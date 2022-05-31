import { Document, model, Schema } from "mongoose";

//1. Interface describing Target:
export interface ITargetModel extends Document {
    type: string
}

//2. Schema describing Target:
const TargetSchema = new Schema<ITargetModel>({
    type: {
        type: String,
        required: [true, "Missing type"],
        minlength: [2, "Type too short"],
        maxlength: [100, "Type too long"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
})

// 3. Target Model:
export const TargetModel = model<ITargetModel>('TargetModel', TargetSchema, 'targets')