// Discord client
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('error', (err) => {
  console.log(`[Discord Client] Error: ${err}`);
});

client.on('reconnecting', () => {
  console.log('[Discord Client] Reconnecting...');
});

client.on('resume', (replayed) => {
  console.log(`[Discord Client] WS connection resumed: ${replayed}`);
});

client.on('disconnect', (closeEv) => {
  console.log('[Discord Client] Disconnect:');
  console.log('A disconnect was emitted:');
  console.log('Clean: ' + closeEv.wasClean);
  console.log('Code: ' + closeEv.code);
  console.log('Reason: ' + closeEv.reason);
});



function channelUpdate(oldState, newState) {
  if (oldState.channel == null) {
    client.emit('channelConnect', newState);
    client.emit('channelJoin', newState);
  } else {
    client.emit('channelLeave', oldState);
    if (newState.channel == null) {
      client.emit('channelDisconnect', oldState);
    } else {
      client.emit('channelJoin', newState);
      client.emit('channelSwitch', oldState, newState);
    }
  }
}


client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.channel !== newState.channel) {
    channelUpdate(oldState, newState);
  }
});

module.exports = client;
