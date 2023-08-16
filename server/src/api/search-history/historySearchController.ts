import { Request, Response } from "express";
import { logError } from "../../services/logger";
import * as repository from "./historySearchRepository"

export async function getHistory(req: Request, res: Response) {
    try {
        const { field, value } = req.params;
        const result = await repository.getHistory(field, value || "")
        res.status(200);
        return res.send(result)
    } catch (err: any) {
        logError(`Error occurred in searchHistoryRouter GET / :`, err)
        return res.sendStatus(500)
    }
}


export async function addHistoryItem(req: Request, res: Response) {
    try {
        // add history to the DB
        const { value, field } = req.body;
        await repository.addHistoryItem({ value, field })

        // return updated history
        const result = await repository.getHistory(field, value)
        res.status(201).send(result)
    } catch (err: any) {
        logError(`Error occurred in searchHistoryRouter POST / :`, err)
        res.sendStatus(500)
    }
}

export async function removeHistoryItem(req: Request, res: Response) {
    try {
        // add history to the DB
        const { id, field } = req.params;
        await repository.removeHistoryItem(id)

        // return updated history
        const result = await repository.getHistory(field, "")
        res.send(result)
    } catch (err: any) {
        logError(`Error occurred in searchHistoryRouter DELETE / :`, err)
        res.sendStatus(500)
    }
}