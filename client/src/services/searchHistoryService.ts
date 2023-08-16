import { SearchFieldType, UniversitySearchFilter } from "@/typings";
import axios from 'axios'

const baseURL = "http://localhost/api"
const universitySearch = axios.create({ baseURL })

export async function getHistoryByField(field: SearchFieldType, value: string) {
    try {
        if (!field)
            return null;

        const response = await universitySearch.get(`/search-history/${field}/${value}`)
        if (response.status == 200) {
            return response.data
        }
    } catch (err) {
        console.error(err)
    }
    return null
}

export async function removeHistoryById(id: string, field: SearchFieldType) {
    try {
        if (!field || id)
            return null;

        const response = await universitySearch.delete(`/search-history/${id}/${field}`)
        if (response.status == 200) {
            return response.data
        }
    } catch (err) {
        console.error(err)
    }
    return null
}

export async function addHistory(field: SearchFieldType, value: string) {
    try {
        if (!field)
            return null;

        const response = await universitySearch.post(`/search-history`, { field, value })
        if (response.status == 200) {
            return response.data
        }
    } catch (err) {
        console.error(err)
    }
    return null
}