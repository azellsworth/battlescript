// var roomModel = require('../room/roomModel.js');

var socketList = {};

module.exports = function(socket, io){
  socket.join('dashboard');

  var username = socket.handshake.query.username;
  console.log(username, " JOINED DASHBOARD");
  socketList[username] = socket.id;
  
  // send signal that user has connected to dashboard
  var updateUsers = function(){
    socket.in('dashboard').emit('updateUsers');
  }

  // Update Users when first connected
  updateUsers();
  
  // look for signal that someone wants to battle
  socket.on('outgoingBattleRequest', function(users){
    var oppId = socketList[users.toUser];

    socket.broadcast.to(oppId).emit('incomingBattleRequest', {
      fromUser: users.fromUser
    });
  });

  // look for signal that a battle has been accepted
  socket.on('battleAccepted', function(users) {
    var opponentId = socketList[users.opponent];

    // now, need to broadcast to the opponent that it's time for battle
    socket.broadcast.to(opponentId).emit('prepareForBattle');
  });

  socket.on('userLoggedOut', function(){
    console.log("USER HAS LEFT DASHBOARD");
    updateUsers();
  });
};