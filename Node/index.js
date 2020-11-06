const io = require('socket.io')(3000);

const users = {};

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() ;


io.on('connection', socket =>{
    
    socket.on('new-user-joined', name=>{

        // console.log('welcome  '+ name);
        
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{

        socket.broadcast.emit('receive', { message: message , name: users[socket.id], time:time});
    
    });

    socket.on('disconnect', () => {
        
        socket.broadcast.emit('left', {name: users[socket.id], time:time});
        delete users[socket.id];
        
      });

});