// Test command
const Command = require('../classes/command.js');
const CommandArgument = requireUncached('./classes/command_argument.js');
const CommandArgumentList = requireUncached('./classes/command_argument_list.js');


const command = {
  name: 'Test',  // The command's name
  description: 'A usefull command for me to test stuff.',  // What the command does
  category: 'Owner', // In wich category the command is (Category must exist)
  cmd: 'test',  // The actual command (Must be lowercase)
  aliases: ['t'], // A list of aliases
  owner: true, // Is reserved to bot Owner
  permissions: [], // Discord permissions required for the user
  clientPermissions: [], // Discord permissions required for this command
  arguments: [
    new CommandArgument('Emoji', 'guildemoji', false) 
  ], // Arguments that can or must be provided

  func: async (msg, args) => {  // The function executed on call
    console.log(args);

    msg.channel.send('Tested.');
  }
}

module.exports = new Command(command);  // Export command