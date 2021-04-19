const form_user = document.getElementById('form_user');
const intro = document.getElementById('intro');
let socket = undefined;

form_user.addEventListener('submit', (e) =>{
	e.preventDefault();
	
	const name = e.target['name'].value;

	intro.style.display = 'none';
	
	if(name){
		//we are connecting the socket
		socket = window.io();

	socket.emit('user_joined', name);
	}
})

form_game.addEventListener('submit', (e) =>{
	
	//To do
	const name = e.target['game'].value;

	createGame.style.display = 'none';
	
	if(game){
		//we are creating a game?
	socket.emit('game_created', game);
	}
})



