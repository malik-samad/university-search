export type UniversityDetail = {
    "country": string | null;
    "domains": string[];
    "alpha_two_code": string | null;
    "state-province": string | null;
    "web_pages": string[];
    "name": string | null;
}

export type UniversitySearchFilter = {
    universityName: string;
    country: string;
}

export type SearchFieldType = "country" | "university"

export type SearchHistory = {
    _id: string;
    value: string;
    field: string;
};