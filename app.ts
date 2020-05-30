import { Application } from "./deps.ts";
import { messageRouter } from "./routes/messageRouter.ts";
import wsHandler from "./ws-server.ts";

const app = new Application;

app
  .static("/js", "./public/js")
  .static("/css", "./public/css")

app.get("/", async ctx => await ctx.file('./public/index.html'));
app.get("/ws", wsHandler);

messageRouter(app);

export default app;



