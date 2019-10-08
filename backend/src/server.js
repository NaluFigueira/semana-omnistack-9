const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');
const app = express();

const server = http.Server(app);

const io = socketio(server);


//socket.emit = envia mensagem;
//socket.on = recebe mensagem;

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-esyy8.mongodb.net/semana09?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connectedUsers = {};

io.on('connection',socket => {
    
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

app.use((req,res,next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json()); //informa o express para usar o formato json
app.use('/files',express.static(path.resolve(__dirname,'..','upload')));
app.use(routes);

server.listen(3333);
/*
    GET: Buscar informação
    POST: Criar nova informação
    PUT: Editar alguma informação
    DELETE: Deletar informação

app.get('/users',(req,res)=>{ -- página (rota) inicial
     -- req: dados da requisição
     -- res: resposta da requisição
    return res.json({ idade: req.query.idade});  -- req.query: acessar query params (para filtros)
}) 
app.put('/users/:id', (req,res) =>{
    return res.json({id: req.params.id})  -- req.query: acessar route params (para edição/delete)
});
app.post('/users', (req,res) =>{
    return res.json(req.body)  -- req.body: acessar body params (para criação)
});
*/
