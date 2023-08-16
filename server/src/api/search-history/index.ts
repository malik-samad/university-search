import { Router } from "express"
import * as controller from './historySearchController'

const searchHistoryRouter = Router();

searchHistoryRouter.get("/:field/:value?", controller.getHistory)

// TODO: need to add validation
searchHistoryRouter.post("/", controller.addHistoryItem)

searchHistoryRouter.delete("/:id/:field", controller.removeHistoryItem)


export default searchHistoryRouter;