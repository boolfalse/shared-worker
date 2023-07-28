
let connections = 0; // count active connections
const peers = [];

self.addEventListener("connect", function (e) {

    const port = e.ports[0];
    connections++;

    peers.push({
        connectionId: connections,
        port: port
    });

    port.postMessage({
        connectionId: connections,
        type: 'CONNECTION'
    });

    port.addEventListener("message", function (e) {
        peers.filter(function (peer) {
            return peer.connectionId !== e.data.port;
        }).forEach(function (peer) {
            peer.port.postMessage(e.data);
        });
    });

    port.start();

}, false);
