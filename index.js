const express = require('express');

const Router = require('./data/dbRouter.js');
const server = express();

server.use(express.json());
server.use('/api/posts', Router);

// server.get('/', (req, res) => {
//     res.send(`
//     <h1>this is working so far</h1>`);
// });


const port = 8080;
server.listen(port, () => {
    console.log(`/n***  Server Running on http://localhost:${port} ***/n`);
});