import { Application } from "../deps.ts";
import { index, create, show, update, destroy } from "../controllers/messageController.ts";

export const messageRouter = (app: Application) => {
  return  app
          .get("/api/messages", index)
          .get("/api/messages/:id", show)
          .post("/api/messages", create)
          .put("/api/messages/:id", update)
          .delete("/api/messages/:id", destroy)
};