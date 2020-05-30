import { HandlerFunc } from "./deps.ts";
import { acceptWebSocket, isWebSocketCloseEvent, isWebSocketPingEvent, WebSocket } from "./deps.ts";
import { v4 } from './deps.ts'

const users = new Map<string, WebSocket>();

function broadcast(message: string, senderId?: string): void {
  if (!message) return
  for (const user of users.values()) {
    user.send(senderId ? `[${senderId}]: ${message}` : message)
  }
}

const wsHandler: HandlerFunc = async (c) => {
  const { conn, headers, r: bufReader, w: bufWriter } = c.request;
  try {
    const sock = await acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    });

    console.log("socket connected!");
    const userId = v4.generate()

    // Register user connection
    users.set(userId, sock)
    broadcast(`> User with the id ${userId} is connected`)

    try {
      for await (const ev of sock) {
        if (typeof ev === "string") {
          // text message
          console.log("ws:Text", ev);
          broadcast(ev, userId)
        } else if (ev instanceof Uint8Array) {
          // binary message
          console.log("ws:Binary", ev);
        } else if (isWebSocketPingEvent(ev)) {
          const [, body] = ev;
          // ping
          console.log("ws:Ping", body);
        } else if (isWebSocketCloseEvent(ev)) {
          // close
          const { code, reason } = ev;
          console.log("ws:Close", code, reason);
          users.delete(userId)
          broadcast(`> User with the id ${userId} is disconnected`)
        }
      }
    } catch (err) {
      console.error(`failed to receive frame: ${err}`);

      if (!sock.isClosed) {
        await sock.close(1000).catch(console.error);
      }
    }
  } catch (err) {
    console.error(`failed to accept websocket: ${err}`);
    await c.request.respond({ status: 400 });
  }
};

export default wsHandler;