import dotenv from "dotenv";

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

export const {
    PORT,
    MONGO_USER,
    MONGO_PASWWORD,
    MONGO_HOST,
    MONGO_DATABASE,
    ENVIRONMENT,
    NODE_ENV
} = process.env

export const IS_DEVELOPMENT = (ENVIRONMENT || NODE_ENV) == "development";
export const IS_PRODUCTION = !IS_DEVELOPMENT;

export const MONGOOSE_CONNECTION_STRING = `mongodb+srv://${MONGO_USER}:${MONGO_PASWWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`
