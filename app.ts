import { Application } from "https://deno.land/x/abc/mod.ts";
import { messageRouter } from "./routes/messageRouter.ts";

const app = new Application;

messageRouter(app);

export default app;



