import { describe, it, expect, jest } from '@jest/globals';

import searchHistoryModel, { ISearchHistory, SearchHistory } from "../../src/api/search-history/historySearchModel"
import * as searchHistoryRepository from "../../src/api/search-history/historySearchRepository"
import { FilterQuery, Query } from 'mongoose';

jest.mock("../../src/api/search-history/historySearchModel")

describe('searchHistoryRepository', () => {
    describe("getHistory", () => {
        // local Mock setup to avoid conflict
        let mockDBState = [
            { _id: '1', value: 'Item 1', field: "country" },
            { _id: '2', value: 'Item 2', field: "university" },
        ];
        jest.spyOn(searchHistoryModel, 'find').mockImplementation((query?: FilterQuery<ISearchHistory>) => mockDBState.filter(itm => query?.field && itm.field == query.field) as any);

        it('should return history record array when parameter is ("country", "")', async () => {
            const countryResult = await searchHistoryRepository.getHistory("country", "")
            const universityResult = await searchHistoryRepository.getHistory("university", "")

            expect(universityResult).toBeInstanceOf(Array)
            expect(universityResult?.length).toBe(1);
            expect(countryResult).toBeInstanceOf(Array)
            expect(countryResult?.length).toBe(1);
        });
    })

    describe("addHistoryItem", () => {
        // local Mock setup to avoid conflict
        let mockDBState = [
            { _id: '1', value: 'Item 1', field: "country" },
            { _id: '2', value: 'Item 2', field: "university" },
        ];
        jest.spyOn(searchHistoryModel, 'create').mockImplementation((itm: any) => mockDBState.push(itm) as any);

        it('should return an array of 2 objects when parameter is ("country", "")', async () => {
            // Mock
            const searchHistoryModelFindOne = jest.spyOn(searchHistoryModel, 'find');
            searchHistoryModelFindOne.mockResolvedValue([
                { _id: '1', value: 'Item 1' }, { _id: '2', value: 'Item 2' },
            ]);

            // execute & test target function
            await searchHistoryRepository.addHistoryItem({ value: "test", field: "university" })
            await searchHistoryRepository.addHistoryItem({ value: "test", field: "country" })

            expect(mockDBState).toBeInstanceOf(Array)
            expect(mockDBState?.length).toBe(4);
            expect(mockDBState?.filter(itm => itm.field == "country").length).toBe(2);
            expect(mockDBState?.filter(itm => itm.field == "university").length).toBe(2);
        });
    })

    describe("removeHistoryItem", () => {
        // local Mock setup to avoid conflict
        let mockDBState = [
            { _id: '1', value: 'Item 1', field: "country" },
            { _id: '2', value: 'Item 2', field: "university" },
        ];
        jest.spyOn(searchHistoryModel, 'deleteOne').mockImplementation((query: FilterQuery<ISearchHistory>) => {
            mockDBState.shift();
            return {} as any;
        });

        it('should return an array of 2 objects when parameter is ("country", "")', async () => {
            await searchHistoryRepository.removeHistoryItem('1')

            expect(mockDBState?.length).toBe(1);
            expect(mockDBState[0]._id).toBe("2");
            expect(mockDBState?.filter(itm => itm.field == "country").length).toBe(0);
            expect(mockDBState?.filter(itm => itm.field == "university").length).toBe(1);
        });
    })
});