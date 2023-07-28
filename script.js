
const worker = new SharedWorker('shared-worker.js');

let workerConnectionId;

worker.port.addEventListener('message', function (e) {
    if (e.data.type === 'CONNECTION') {
        workerConnectionId = e.data.connectionId
    } else if (e.data.type === 'ALERT') {
        alert(`Hello ${e.data.name}!`);
    }
});

worker.port.start();

document.getElementById('worker-message').onclick = function(){
  worker.port.postMessage({
      name: 'John',
      type: 'ALERT',
      port: workerConnectionId
  });
};
