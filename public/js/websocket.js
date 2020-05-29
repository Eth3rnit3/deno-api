const loc = window.location;
let uri = "ws:";

if (loc.protocol === "https:") {
  uri = "wss:";
}
uri += "//" + loc.host;
uri += loc.pathname + "ws";
const ws = new WebSocket(uri);

ws.onopen = function () {
  console.log("Connected");
}

ws.onmessage = function (evt) {
  console.log(evt);
  fetchMessages();
}