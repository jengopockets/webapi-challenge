require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const server = express();

let users = [
    {
        id: 0,
        name:'Jacob',
    },
    {
        id: 1,
        name:'Hailey',
    },
    {
        id: 2,
        name:'Calvin',
    },
];

let chores = []
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json(users)
});

server.get('/chores', (req,res) => {
    res.status(200).json(chores)
})
server.post('/:id/chores', (req,res) => {

})
server.put('/:id/chores/:id', (req,res) => {

})
server.delete('/:id/chores/:id', (req,res) =>{

})


module.exports = server;