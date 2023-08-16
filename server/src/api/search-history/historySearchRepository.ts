import model, { SearchHistory } from "./historySearchModel";

export async function getHistory(field: string, value: string) {
    const result = await model.find({ field: field, value: { $regex: value, $options: 'i' } },
        {},
        { sort: { updatedAt: -1 }, limit: 5 }); // only return last 20

    // Add new history in background - will fail if we run in serverless
    value?.trim() && addHistoryItem({ field, value });

    return result;
}

export async function addHistoryItem(newHistory: SearchHistory) {
    const result = await model.findOne({ field: newHistory.field, value: newHistory.value })
    if (result) {
        return await model.updateOne({ _id: result._id }, { value: newHistory.value })
    }
    return await model.create(newHistory);
}

export async function removeHistoryItem(_id: string) {
    return await model.deleteOne({ _id });
}