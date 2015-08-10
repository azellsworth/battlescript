var roomModel = require('../room/roomModel.js');

module.exports = function(socket){
  var joinedRoom = roomModel.createOrGetRoom();

  console.log('connected');
  // Join a room
  socket.join(joinedRoom.count);
  // Increment members
  joinedRoom.members++;

  socket.emit('test', 'SUPERMAN');

  // Save the room. Save it with the count (its like a key)
  roomModel.save(joinedRoom);
  socket.on('textChange', function(data){
    socket.broadcast.to(joinedRoom.count).emit('updateEnemy', data);
  });

  // I catch the disconnected client. What I do is 'remove' the memeber from the room
  // I also delete it if there are no people in the room
  // and save it if ppl remain.

  // The magic in this method is that the client is never really "disconnected..."
  // He's just moving from room to room. Or no room at all...

  socket.on('disconnectedClient', function(){
    console.log('disconnectedClient');
    console.log(joinedRoom.count);

    joinedRoom.members--;

    if (joinedRoom.members === 0) {
      roomModel.removeRoom(joinedRoom.count);
    } else {
      roomModel.save(joinedRoom.count);
    }

  });
};