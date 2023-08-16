import { Router } from "express"

// Routers / APIs
import searchHistoryRouter from "./search-history";

// api index router
const apiRouter = Router();

apiRouter.use("/search-history", searchHistoryRouter)

export default apiRouter;