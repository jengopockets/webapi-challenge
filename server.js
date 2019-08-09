require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());

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

let chores = [
    {
        id:0,
        description:'Test Chores',
        notes:'Will it work',
        assignedTo: 0,
        completed: false,
    }
];

let choreId =0;

const insertChore = chore => {
    choreId += 1
    chore.id = choreId;
    chores.push(chore);
};
const modifyChore = (id, changes) => {
    for (let i = 0;i < chores.length; i++){
        if (chores[i].id = id){
            chores[i].description = changes.description;
            chores[i].assignedTo = changes.assignedTo;
            chores[i].completed = changes.completed;
            if (changes.notes) {
                chores[i].notes = changes.notes;
            }
            return chores[i];
        }
    }
}
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json(users)
});

server.get('/chores', (req,res) => {
    res.status(200).json(chores)
})
server.post('/chores', (req,res) => {
    if (!req.body){
        res.status(400).json({error: "You must send a new chore!"});
    }
    const ids = []
    for (let i = 0; i < users.length; i++){
        ids.push(users[i].id);
    }
    if (!ids.includes(req.body.assignedTo)){
        res.status(400).json({error: "Assigned user does not exist"});
    }
    else {
        insertChore(req.body);
        res.status(201).json({inserted: "new chore inserted"});

    }
})
server.put('/chores/:id', (req,res) => {
    if (!req.body){
        res.status(400).json({error: "You must send a new chore!"});
    }
    const userId = []
    const choreId = []
    for (let i = 0; i < users.length; i++){
        userId.push(users[i].id);
    }
    console.log("userId",userId);
    console.log("Assigned",req.body.assignedTo);
    if (!userId.includes(req.body.assignedTo)){
        res.status(400).json({error: "Assigned user does not exist."});
    }

    for (let i = 0; i < chores.length; i++){
        choreId.push(chores[i].id);
    }
    console.log("choreId",choreId);
    console.log("id",req.params.id)
    if (choreId.includes(req.params.id)){
        const returnedChore = modifyChore(req.params.id, req.body);
        res.status(201).json(returnedChore);
    }
    else {
        res.status(400).json({error: "Chore id does not exist."});

    }
})
server.delete('/chores/:id', (req,res) =>{

})






module.exports = server;