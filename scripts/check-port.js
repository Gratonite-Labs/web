const net = require('net');
const http = require('http');

const portsToCheck = [3000, 3001, 4000, 5173, 5174, 8080];

async function checkPort(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => { socket.destroy(); resolve(true); });
    socket.on('timeout', () => { socket.destroy(); resolve(false); });
    socket.on('error', () => { resolve(false); });
    socket.connect(port, '127.0.0.1');
  });
}

async function fetchPage(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk.toString().substring(0, 500); });
      res.on('end', () => { resolve({ status: res.statusCode, body: data.substring(0, 300) }); });
    });
    req.setTimeout(2000);
    req.on('timeout', () => { req.destroy(); resolve({ status: 'timeout' }); });
    req.on('error', (e) => { resolve({ status: 'error', message: e.message }); });
  });
}

async function main() {
  console.log('--- Port scan ---');
  for (const port of portsToCheck) {
    const open = await checkPort(port);
    console.log(`Port ${port}: ${open ? 'OPEN' : 'closed'}`);
    if (open) {
      const result = await fetchPage(port);
      console.log(`  HTTP response:`, JSON.stringify(result));
    }
  }
}

main();
