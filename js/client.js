const socket = io('http://localhost:3000');

const form = document.getElementById('sendform');

// console.log(form);

const messageInput = document.getElementById('inputcss');

// console.log(messageInput);

const messageContainer = document.querySelector(".container");

// console.log(messageContainer);

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();


function append(message, position) {

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}

const name = prompt("enter your name");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(name + '  joined chat', 'center');
});

socket.on('receive', data => {
    append(`${data.name}  :  ${data.message}`, 'left');
});

socket.on('left', data => {
    append(`${data.name} : 'left the chet' --> ${data.time}`, 'center');
});


form.addEventListener('submit', (e) => {

    const message = messageInput.value + '-->' + time;
    // console.log(message);

    append(message, 'right');
    socket.emit('send', message);

    messageInput.value = '';
    e.preventDefault();

});