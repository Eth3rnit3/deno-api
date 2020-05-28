import { Application, HandlerFunc } from "https://deno.land/x/abc/mod.ts";
import { acceptWebSocket } from "https://deno.land/std@0.53.0/ws/mod.ts";

const app = new Application();

const hello: HandlerFunc = async (c) => {
  const { conn, headers, r: bufReader, w: bufWriter } = c.request;
  const ws = await acceptWebSocket({
    conn,
    headers,
    bufReader,
    bufWriter,
  });

  for await (const e of ws) {
    console.log(e);
    await ws.send("client_can_fetch");
  }
};

app.get("/ws", hello).file("/", "./index.html");

export default app;