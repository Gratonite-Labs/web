import http from 'http';

const ports = [3000, 3001, 4173, 5173, 5174, 8080];

for (const port of ports) {
  const req = http.get(`http://localhost:${port}`, (res) => {
    console.log(`[v0] Port ${port}: OPEN (status ${res.statusCode})`);
    res.resume();
  });
  req.on('error', () => {
    console.log(`[v0] Port ${port}: CLOSED`);
  });
  req.setTimeout(2000, () => {
    console.log(`[v0] Port ${port}: TIMEOUT`);
    req.destroy();
  });
}
