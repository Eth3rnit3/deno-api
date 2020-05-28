import { Application } from "https://deno.land/x/abc/mod.ts";
import { messageRouter } from "./routes/messageRouter.ts";

const app = new Application;

app
  .static("/js", "./public/js")
  .static("/css", "./public/css")

app.get("/", async ctx => await ctx.file('./public/index.html'));

messageRouter(app);

export default app;



