console.log("CaelumVoxGenesis");
console.log("What abou code? -__-");

// GET
fetch('http://localhost:3333/data')
  .then(res => res.json())
  .then(console.log);

// POST
fetch('http://localhost:3333/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ hello: "world" })
})
  .then(res => res.json())
  .then(console.log);
