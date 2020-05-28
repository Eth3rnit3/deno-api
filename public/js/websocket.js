const loc = window.location;
let uri = "ws:";

if (loc.protocol === "https:") {
  uri = "wss:";
}
uri += "//" + loc.host;
uri += loc.pathname + "ws";
uri = uri.replace('3000', '8080')
const ws = new WebSocket(uri);

ws.onopen = function () {
  console.log("Connected");
}

ws.onmessage = function (evt) {
  console.log(evt);
  fetchMessages()
}