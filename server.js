require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const choresRouter = require('./chores/chore-route');

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
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json(users)
});

function validateUserId(req, res, next) {
    const id = req.params.id;
    db.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(400).json({message: 'invalid user id'});
            }
        })
        .catch (err => {
            res.status(500).json({error: 'There was an error accessing that user from the database.'})
        })
}

module.exports = server;