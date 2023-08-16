import mongoose, { Schema, Document } from "mongoose";

export type SearchHistory = {
    value: string;
    field: string;
};

export interface ISearchHistory extends Document {
    _id: mongoose.Types.ObjectId;
    value: string;
    field: string;
}

const searchHistory: Schema = new Schema({
    value: { type: String, required: true },
    field: { type: String, enum: ['country', 'university'], required: true },
},
    { timestamps: true }
);

export default mongoose.model<ISearchHistory>("searchHistory", searchHistory);