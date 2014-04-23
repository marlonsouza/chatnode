var socket = io.connect('http://localhost');

socket.on('welcome', function(){
	$('#updates').append('<li>Bem vindo, você entrou no chat</li>');
});

socket.on('user in', function(data){
	$('#updates').append('<li>O usuario <strong>'+data.userid+'</strong> entrou no chat</li>');
});

socket.on('name changed', function(data){
	$('#updates').append('<li>Seu nome foi alterado para <strong>'+data.nome+'</strong></li>');
});


socket.on('user changed name', function(data){
	$('#updates').append('<li>Usuário: <strong>'+data.userid+'</strong> alterou o nome para '+data.nome+'</li>');
});

socket.on('message sent', function(data){
	$('#chat ul').append('<li><strong>Me: </strong> '+data.msg+' </li>');
});

socket.on('message sent by user', function(data){
	$('#chat ul').append('<li><strong>'+data.nome+'</strong>: '+data.msg+'</li>');
});


$(function(){
	$('#form-alterar-nome').submit(function(){
		var nome = $('#nome').val();
		socket.emit('change name', {nome:nome});
		return false
	});
	
	$('#form-enviar-msg').submit(function(){
		var msg = $('#message').val();
		socket.emit('send message', {msg:msg});
		$('#message').val('');
		return false;
	});
});
