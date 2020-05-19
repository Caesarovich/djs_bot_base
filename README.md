# Discord.JS Bot base

The base I use to make Discord Bots.

This is kind of a "framework" I made to develop my bots. It provides advanced command handler and module system.
The main feature is the fact that everything can be added/modified/removed, such as command files or modules, without
stopping the process, with only a reload command.

**Make sure to read this whole ReadMe !**


# Features

- **Extremely modulable:** Create commands and modules in separate files easily.
- **Dynamic refresh:** Reload the commands and modules via the `reload` command (Wich is by default in commands). If any error occurs you will be told so and refresh will be canceled in order not to break the other commands. This way your bot doesn't need to stop its processes if you want to add features !
- **Crash Proof**: Everything is made to limit unhandled error and crashes. The reload fails ? No crash. A command or module fails ? no crash !
- **Easy to use, user friendly and powerful command handler:** Delay functionnality, prevent peoples from spamming commands ! Member permissions handler: Want to create a command only usable by member having the KICK_MEMBER permission ? Just precise it in the command file ! A member will be told he is missing such permissions if so. Same for the bot: your command require the bot do have any permissions ? Then precise it ! Oh, maybe would you like to make commands only usable by yourself ? It's easy as changing a boolean !

- **Powerful argument handler:** Want to add some arguments to your command ? You can easily add it in one line ! A command argument is composed of a Name (Something explicit enough for the user to understand what he is supposed to enter), a type (What kind of desired value you want to be retrieved, for exemple a number, a guild member or an url) and a boolean wether the argument is optionnal or not !

**And much more**

# Installation

> 1- Create a folder and unpack the base.
>
> 2- Install [Discord.JS v12](https://discord.js.org/#/) and [MySQL](https://www.npmjs.com/package/mysql) in this folder with NPM.
>
> 3- Edit `Settings.json` and insert your credentials.
>
> 4- You are ready to start the bot with `node bot.js`!


# Create a command

These are the steps to create a new command:

> 1- Copy-paste another command in `commands/` and rename it.
>
> 2- Change all basic values such as Name, Description, cmd, ...
>
> 3- Start coding your command in `func(msg, args)`.

The passed values (msg and args) represent the message that called the command and the arguments parsed by the command handler.


# Create a module

## Basics

These are the steps to create a new module:

> 1- Copy-paste another module in `modules/` and rename it.
>
> 2- Change the module's name initiated with `new CustomModuleBase` at the top of the file.
>
> 3- Put any code tu execute on initialisation within the Module.Init callback.

The passed values (msg and args) represent the message that called the command and the arguments parsed by the command handler.

## Advanced

If your module needs to keep data through a refresh, you will have to use the integrated solution for it. Ex:

```js
_module.Init = () => {
  _module.preciousData = _module.__addBackedUpVar('myData', {});
}
```

Here we define our module's property `preciousData` with the included solution method `__addBackedUpVar`.
This method takes two arguments: 

> - The name of the data, wich will be used to save it and retrieve it by the refresh handler.
>
> - A default value (What it is on first initialisation);

Then you can just access your data via `_module.preciousData`.

You will most certainly also need to use listeners within your modules. The problem is that if you use the conventionnal way `emitter.on` the listeners will stack during refreshes, wich is really bad. That's why I made an integrated solution for that too !
Let's see an exemple:

```js
_module.Init = () => {
  _module.__addListener(Bot, 'channelDisconnect', (oldState) => {
    console.log('Someone disconnected from a voicechat !');
  });
}
```

We use the `__addListener` method wich will deal with the refresh handler to keep the listeners unstacked. This method takes three arguments:

> - The emitter of the event.
>
> - The event's name.
>
> - The callback.

Now you know how to make nice modules that doesn't create problems on refresh !

**Note:** Do not override these two methods (`__addListener`, `__addBackedUpVar`)!

# Globals

These are some useful globals that you can reach from everywhere:

- `Bot`: Represents your bot's Discord.JS Client.
- `Settings`: Represents the parsed value of the `settings.json` file.
- `Modules`: The list of exported modules.
- `Commands`: The list of exported commands.
- `DB`: The MySQL Pool (If you connected a database).



# Base content

There are some basic commands and modules included so you can have a look at them. I'll recommend to let the **help** and **reload** command as they are very useful (especially the **reload**).


# Custom Events

I added some custom events to the default ones in Discord.JS. Those events are emitted by the **Bot**

- `onCommand` (Message, Arguments, Command): Emitted when a command is executed.
- `channelConnect` (NewVoiceState) : Emitted when a member connect to a voice chat (Means he wasn't in any voice chat before).
- `channelDisonnect` (OldVoiceState) : Emitted when a member disconnected from voice chat (Doesn't switch to another channel, just disconnect).
- `channelJoin` (NewVoiceState): Emmitted when a member joins a channel no matter if the user was in a channel before or not.
- `channelLeave` (OldVoiceState): Emitted when a user leaves a channel no matter if the user is going in another channel or not.
- `channelSwitch` (OldVoiceState, NewVoiceState): Emitted when a user switchs channel.


# Settings

The settings are a bunch of values that you want to be able to change easily. These includes many values by default (See below). You can add anything you want in the Settings. I recommand putting every password, API keys and sensitive information there. So you just need to be careful with this file when sharing your code. Here are the default settings and their utility:

> **Version** (Optionnal): Your bot's version number. This is only used by the `botinfo` command so if you don't want this command you can just ignore it.
>
> **BotToken** (Required): This is your bot's [Discord API Token](https://discord.com/developers/applications).
>
> **Prefix** (Required): This is the prefix used by the command handler. 
>
> **CommandDelay** (Required): The delay (In seconds) of the command handler. This delay the usage of command for the users to avoid your bot being spammed by the same user.
>
> **OwnerID** (Required): This is your [Discord User ID](https://www.youtube.com/watch?v=KAOfKtqE0X0). It's used by the bot to identify who is his owner. Usefull for commands that are reserved to you. You can access "yourself" with `Bot.owner`.
>
> **InviteLink** (Optionnal): This is the bot's invite link used by the `invite` command.
>
> **SupportInviteLink** (Optionnal): The link to your bot's support server. it's used by the `support` command.
>
> **Database** (Optionnal): There you put your database credentials. Leave it disabled if you don't want to connect a database. Be careful to disable commands and modules that uses a database if you disable it !
>
> **DisabledModules** (Required): An array of disabled modules. (Leave "GuildSettings" disabled if you don't conenct a database). You must put the module's name initialised with `new CustomModuleBase` and not the module's file name.
>
> **DisabledCommands** (Required): An array of disabled commands. As well as for the modules, you put the command's name and not the file name.

**Note:** Settings are dynamicaly refreshed by the refresh command.

/!\ This file is not finished /!\


**Version:** 1.0
**Contact me via Discord for help and questions: Caesarovich#7167**
