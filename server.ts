import App from "./app.ts";
import WSServer from "./ws-server.ts";

App.start({ port: 3000 });
WSServer.start({ port: 8080 });