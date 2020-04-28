# Discord.JS Bot base

The base I use to make Discord Bots.

This is kind of a "framework" I made to develop my bots. It provides advanced command handler and module system.
The main feature is the fact that everything can be added/modified/removed, such as command files or modules, without
stopping the process, with only a reload command.


# Features

- **Extremely modulable:** Create commands and modules in separate files easily.
- **Dynamic refresh:** Reload the commands and modules via the `reload` command (Wich is by default in commands). If any error occurs you will be told so and refresh will be canceled in order not to break the other commands. This way your bot doesn't need to stop its processes if you want to add features !
- **Crash Proof**: Everything is made to limit unhandled error and crashes. The reload fails ? No crash. A command or module fails ? no crash !
- **Easy to use, user friendly and powerful command handler:** Delay functionnality, prevent peoples from spamming commands ! Member permissions handler: Want to create a command only usable by member having the KICK_MEMBER permission ? Just precise it in the command file ! A member will be told he is missing such permissions if so. Same for the bot: your command require the bot do have any permissions ? Then precise it ! Oh, maybe would you like to make commands only usable by yourself ? It's easy as changing a boolean !

- **Powerful argument handler:** Want to add some arguments to your command ? You can easily add it in one line ! A command argument is composed of a Name (Something explicit enough for the user to understand what he is supposed to enter), a type (What kind of desired value you want to be retrieved, for exemple a number, a guild member or an url) and a boolean wether the argument is optionnal or not !

**And much more**

# Installation

> 1- Create a folder and unpack the base
>
> 2- Install Discord.JS v12 in this folder with NPM
>
> 3- Edit Settings.json and insert your credentials
>
> 4- You are ready to start !


# Create a commmand

There are the steps to create a new command:

> 1- Copy-paste another command in `commands/` and rename it.
>
> 2- Change all basic values such as Name, Description, cmd, ...
>
> 3- Start coding your command in `func(msg, args)`.

The passed values (msg and args) represent the message that called the command and the arguments parsed by the command handler.


# Base content

There are some basic commands and modules included so you can have a look at them. I'll recommend to let the **help** and **reload** command as they are very useful (especially the **reload**).



/!\ This file is not finished /!\


**Version:** 1.0
**Contact me via Discord for help and questions: Caesarovich#7167**
