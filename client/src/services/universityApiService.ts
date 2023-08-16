import { UniversitySearchFilter } from "@/typings";
import axios from 'axios'

const baseURL = "http://universities.hipolabs.com"

const universitySearch = axios.create({ baseURL })

export async function getUniversityDataByCityCountry(filters: UniversitySearchFilter) {
    try {
        if (filters.country == "" && filters.universityName == "")
            return []
        const response = await universitySearch.get(`/search?name=${filters.universityName}&country=${filters.country}`)
        if (response.status == 200) {
            return response.data
        }
        console.log({ getUniversityDataByCityCountry: response })
    } catch (err) {
        console.error(err)
    }
    return []
}