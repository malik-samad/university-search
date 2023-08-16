import { describe, it, expect, test, jest } from '@jest/globals';

import searchHistoryModel, { ISearchHistory } from "../../src/api/search-history/historySearchModel"
import * as searchHistoryController from "../../src/api/search-history/historySearchController"
import { FilterQuery } from 'mongoose';

jest.mock("../../src/api/search-history/historySearchModel")

let mockDBState = [
    { _id: '1', field: "country", value: 'Item 1', },
    { _id: '2', field: "university", value: 'Item 2' },
];

jest.spyOn(searchHistoryModel, 'deleteOne').mockImplementation((query: FilterQuery<ISearchHistory>) => {
    mockDBState = mockDBState.filter(itm => itm._id !== query._id)
    return {} as any;
});

jest.spyOn(searchHistoryModel, 'find').mockImplementation((query?: FilterQuery<ISearchHistory>) => mockDBState.filter(itm => query?.field && itm.field == query.field) as any);

jest.spyOn(searchHistoryModel, 'create').mockImplementation((itm: any) => mockDBState.push({ ...itm, _id: `${mockDBState.length}` }) as any);

describe('searchHistoryRepository', () => {
    describe("getHistory", () => {
        const request = { params: { field: "country", value: "" } }
        const response = { send: jest.fn(x => x), status: jest.fn(x => x), sendStatus: jest.fn(x => x) }
        it('should send response 200 status code and an array history', async () => {
            await searchHistoryController.getHistory(request as any, response as any)

            expect(response.status).toHaveBeenCalledWith(200);
            expect(JSON.stringify(response.send.mock.calls[0][0])).toBe(JSON.stringify([
                { _id: '1', field: "country", value: 'Item 1' }
            ]));
        });
    })

    describe("addHistoryItem", () => {
        const request = { params: { field: "country", value: "test" } }
        const response = { send: jest.fn(x => x), status: jest.fn(x => x), sendStatus: jest.fn(x => x) }

        it('should send an array history when params are { field: "country", value: "test" }', async () => {
            const initialDbCount = mockDBState.length;
            const expectedResponse = mockDBState.filter(itm => itm.field == "country"); // this may cause random failure - same array is being used by other test in parallel
            await searchHistoryController.getHistory(request as any, response as any)

            expect(response.send.mock.calls[0][0]).toBeInstanceOf(Array);
            expect(initialDbCount).toBeLessThan(mockDBState.length);
            expect(response.send).toHaveBeenCalledWith(expectedResponse);
        });
    })

    describe("removeHistoryItem", () => {
        // local Mock setup to avoid conflict
        const request = { params: { field: "country", id: "1" } }
        const response = { send: jest.fn(x => x), status: jest.fn(x => x), sendStatus: jest.fn(x => x) }

        it('should send an array of history', async () => {
            await searchHistoryController.removeHistoryItem(request as any, response as any)

            expect(response.send.mock.calls[0][0]).toBeInstanceOf(Array);
            expect(response.send).toHaveBeenCalledWith(mockDBState.filter(itm => itm.field == "country" && itm._id !== '1'));
        });

    })
});