const Discord = require("discord.js");
const client = new Discord.Client();
const bot = client;
const Prefix = "g!";
const prefix = Prefix;
const fs = require("fs-extra");
let cookie = JSON.parse(fs.readFileSync("./cookie.json", "utf8"));
var dispatcher;

function sendError(message, description) {
    message.channel.send({embed: {
        color: 0xFF0000,
        description: ':x:' + description
    }})
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame('g?help | Préfix => "g!"'),
    client.user.setUsername('๖̶̶̶ζ͜͡Gaming_Bot')
});

client.on('message', message => {
    var msgc = message.content;
    if(message.content === Prefix + 'ping') {
        var now = require('performance-now');
        var startTime = now();
        message.channel.send("**pong :ping_pong: = ? **")
        .then(message => {
            var endTime = now();
            return message.edit("**pong :ping_pong: = " + Math.round(endtime - starttime) + " mes. **")
        })
}
if (message.content.startsWith(Prefix + 'avatar')) {
    let Member = message.guild.member(message.mentions.users.first());
    if (message.mentions.users.size === 0) {
        return message.channel.send(message.author.avatarURL)
    }
    message.channel.send(Member.avatarURL)
}
if (message.content.startsWith(Prefix + "clear")) {
    let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
    let yourole = message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
    var logs = message.guild.channels.find("name", "mod-logs");
    if (!myrole) {
        return message.author.send("Je n'ai pas les permissions nécessaires pour effacer un/des message(s)");
    }

    if (!yourole) {
        return message.author.send("Vous n'avez pas les permissions nécessaires");
    }
    if (!message.guild.channels.exists("name", "mod-logs")) {
        message.guild.createChannel("name", "mod-logs");
        return message.channel.sendMessage("", {
            embed: {
                color: 0xFF0000,
                descripton: ":no_entry_sign: Le salon textuel `mod-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:"
            }
        })
    }

    var suppression = message.content.substr(8);
    if (suppression < 1 || suppression > 1000) {
        return message.reply("La valeur que vous avez entré est invalide. Merci de choisir une valeur comprise entre 1 et 1000");
    }
    message.channel.bulkDelete(suppression, true).then(ok => {
        message.channel.send("Suppression de " + "``" + suppression + "``" + " messages")
        .then(message => setTimeout(function () {message.delete()}, 1000))
        .catch(err => console.log(err))
});
    logs.send({
        embed: {
            color: 0x00AE86,
            title: "gestion des clear/clearall",
            fields: [{
                name: "_ _",
                value: "_ _"
            }, {
                name: "suppression de " + suppression + "message",
                value: "par : " + message.author.tag + " sur le salon #" + message.channel.name
            }]
        }
    })
}
if (message.content.startsWith(Prefix + 'say')) {
    if (message.author.id == "349260377231458325") {
        message.channel.send(message.content.substr(5))
        message.delete(message.author)
    } else {
        message.channel.send(":smiley: MDR t'es qui toi pour me dire quoi dire")
    }
}
if (message.content === 'g?help') {
    const embed = new Discord.RichEmbed()
        .setTitle("help de " + client.user.username)
        .setColor(0x00AE86)
        .setDescription("Le prefix pour chaque commande est " + Prefix)
        .setFooter("un bot creer par @wasstyle gaming#8433", client.user.avatarURL)
        .setThumbnail("http://maxpixel.freegreatpicture.com/static/photo/1x/Support-Red-Help-Button-Emergency-153094.png")
        .setTimestamp()
        .addField("💃fun", "ping => pong !\nsay => g?say\navatar => g?avatar\ncompteur => affiche un compteur de nombre", true)
        .addField("🔧 moderation", "kick => g?kick\nBan => bannir un membre\nclear => g?clear\nmute => mute un membre\nunmute =>démute un membre\ncc => creer un salon textuel\nwarn => averti un membre\naddr =>ajoute un role a un membre", true)
        .addField("📞 contact", "suggestion => donne une idée pour moi\nbug => signiale un bug")
        .addField("🔦 recherche", "yt => fait une recherche sur youtube\ngoogle =>fait une rechereche google\nwiki => fait une recherche wikipedia", true)
        .addField("📜 information", "infob => les information sur le bot\ninfoa => les information sur l'auteur", true)
        .addField("👑 les commandes master", "master => pour savoir si t'es mon maitre\nsetgame => pour changer mon jeux", true)
        .addField("➕ peitit plus +++", "le bot banni certain mot\nfait bvn pour afficher un gif de bienenue", true);
    message.author.send(embed)
    message.channel.send({
        embed: {
            color: 0x00AE86,
            description: ":incoming_envelope: page d'aide envoyer en mp/dm fait g?hh pour l'avoir ici"
        }
    })
}
if (message.content === Prefix + "infob") {
    message.channel.send({
        embed: {
            color: 344003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "les information sur le bot" + client.user.username,
            description: "ceci sont les information sur " + client.user.username,
            fields: [{
                name: "nom",
                value: client.user.username
            }, {
                name: "version",
                value: "1.2.1"
            }, {
                name: "auteur",
                value: "Pour le conaitre fait g?infoa"
            }, {
                name: "invite moi",
                value: "https://discordapp.com/oauth2/authorize?client_id=378811101187538944&scope=bot&permissions=8"
            }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "un bot creer par @waSStyle Gaming#8433"
            }
        }
    })
}
if (message.content.startsWith("fdp")) {
    message.delete(message.author)
    message.channel.send(':rage: surveille ton langage')
}
if (message.content.startsWith("FDP")) {
    message.delete(message.author)
    message.channel.send(':rage: surveille ton langage')
}
if (message.content.startsWith("putin")) {
    message.delete(message.author)
    message.channel.send(':rage: surveille ton langage')
}
if (message.content.startsWith("merde")) {
    message.delete(message.author)
    message.channel.send(':rage: surveille ton langage')
}
if (message.content.startsWith("TG")) {
    message.delete(message.author)
    message.channel.send(':rage: surveille ton langage')
}
if (message.content.startsWith("tg")) {
    message.delete(message.author)
    message.channel.send(':rage: surveille ton langage')
}
if (message.content === Prefix + "infoa") {
    message.channel.send({
        embed: {
            color: 344003,
            author: {
                icon_url: "https://cdn.discordapp.com/avatars/349260377231458325/dc9f18499c4743643a4394171ebb68b6.png?size=2048",
                name: "info sur @waSStyle Gaming"
            },
            title: "voici les information sur waSStyle  Gaming",
            description: " les information sont ci-desous",
            fields: [{
                name: "adrresse é-mail",
                value: "wasstylegaming@yahoo.com"
            },
                {
                    name: "devlopper depuis",
                    value: "euh.... depuis que t'est née quoi :smiley:"
                }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "un bot creer par @waSStyle Gaming#8433"
            }
        }
    })
}
if (message.content.startsWith("Fdp")) {
    message.delete(message.author)
    message.channel.send(':rage: surveille ton langage')
}
if (message.content === "g?kick") {
    message.channel.send({
        embed: {
            color: 344003,
            author: {
                icon_url: " https://cdn.discordapp.com/avatars/349260377231458325/4e5ec893dd27bb4aee987c1a14d7b8eb.png?size=2048",
                name: "info sur le kick de " + client.user.username
            },
            title: "les information",
            description: "les information sont ci-desous",
            fields: [{
                name: "info",
                value: "la commande est : g!kick + <@utilisateur> + raison"
            }, {
                name: "condition",
                value: "le Bot doit avoir la permission __expulser un membre__\nl'expulseur doit avoir la permission __expulser un membre__\nle senveur doit avoir un salon mod-logs"
            }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "un bot creer par @waSStyle Gaming#8433"
            }
        }
    })
}
if (message.content === "g?clear") {
    message.channel.send({
        embed: {
            color: 344003,
            author: {
                icon_url: " https://cdn.discordapp.com/avatars/349260377231458325/f671555ffd8436a430f2a22737d1d9ff&.png?size=2048",
                name: "info sur le clear de " + client.user.username
            },
            title: "les information",
            description: "les information sont ci-desous",
            fields: [{
                name: "info",
                value: "la commande est : g!clear + <nombre de message a clear>"
            }, {
                name: "condition",
                value: "le bot doit avoir la permission gerer les messsages\nl'utillisateur de la commande doit avoir la permission gerer les messages"
            }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "un bot creer par @waSStyle Gaming#8433"
            }
        }
    })
}
if (message.content === "g?avatar") {
    message.channel.send("```te donne lien de ton avatar(photo de profile) ou celui de la perssone mentonée```")
}
if (message.content === "g?say") {
    message.channel.send(" ```repete ton message``` ")
}
if (message.content === "bvn") {
    message.channel.send('http://gph.is/2jdbsbj')
}
if (message.content === Prefix + 'compteur') {
    (async function() {
        var i = 0;
        const messageInteractif = await
        message.channel.send(`${i}`);
        //Réagir à notre message
        await
        messageInteractif.react("➕");
        await
        messageInteractif.react("➖");
        //Créer le collecteur
        const collecteur = messageInteractif.createReactionCollector((reaction, user) => user.id === message.author.id);
        //Quand le collecteur collecte
        collecteur.on('collect', async(reaction) => {
            if(reaction.emoji.name === "➕"
    )
        { //Si la réaction est ce que l'on veut, on utilise toujours l'unicode
            i++;
            messageInteractif.edit(`${i}`);
        }
        await
        reaction.remove(message.author.id); //Supprime la réaction de l'auteur
    })
        ;
        collecteur.on('collect', async(reaction) => {
            if(reaction.emoji.name === "➖") { //Si la réaction est ce que l'on veut, on utilise toujours l'unicode
            i--;
            messageInteractif.edit(`${i}`);
        }
        await reaction.remove(message.author.id); //Supprime la réaction de l'auteur
    });
    }

    ()
)
    ;
}
if (message.content.startsWith(Prefix + 'setgame')) {
    if (message.author.id == "349260377231458325") {
        client.user.setGame(message.content.substr(10))
        message.delete()
        message.channel.send("Succes ! le jeu du bot est desormais :" + message.content.substr(10))
    } else {
        message.channel.send({
            embed: {
                color: 3447003,
                description: ":warning: stop t'es qui pour me dire a quoi jouer",
                author: {
                    name: "ERROR",
                    icon_url: clientu.user.avatarURL
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "un bot creer par waSStyle Gaming@8433"
                }
            }


        })
    }

}
if (message.content.startsWith(Prefix + 'master')) {
    if (message.author.id == "349260377231458325") {
        message.delete()
        message.channel.send("mon maitre bonjour je n'ai pas de bug")
    } else {
        message.channel.send(":smiley: MDR tu te prend pour qui t'es pas mon maitre t'es pas mon maitre")
    }
}
if (message.content.startsWith(Prefix + "yt")) {
    message.channel.send("https://www.youtube.com/results?search_query=" + message.content.substr(5))
}
if (message.content.startsWith(Prefix + "google")) {
    message.channel.send('https://www.google.dz/search?q=' + message.content.substr(9))
}
if (message.content.startsWith(Prefix + 'setavatar')) {
    if (message.author.id == "349260377231458325") {
        client.user.setAvatar(message.content.substr(10))
        message.delete()
        message.channel.send("Succes ! l'avatar du bot est desormais :" + message.content.substr(9))
    } else {
        message.channel.send({
            embed: {
                color: 3447003,
                description: ":warning: stop t'es qui pour me dire quoi maitre en photo de profile",
                author: {
                    name: "ERROR",
                    icon_url: client.user.avatarURL
                },
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "un bot creer par @waSStyle Gaming@8433"
                }
            }


        })
    }

}
if (message.content.startsWith(Prefix + "kick")) {
    let myrole = message.guild.member(client.user).hasPermission("KICK_MEMBERS"); // Récupération des droits nécéssaires du bot
    let yourole = message.guild.member(message.author).hasPermission("KICK_MEMBERS");
    var logs = message.guild.channels.find("name", "mod-logs");
    if (!myrole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Je n'a pas les permissions nécessaires pour expulser un membre"
            }
        });
    }

    if (!yourole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Tu n'as pas les permissions nécessaires pour expulser un membre"
            }
        });
    }
    if (!myrole) {
        return message.author.send("Je n'ai pas les permissions nécessaires pour expulser un membre");
    }
    if (message.mentions.users.size === 0) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: La commande est : g!kick + <utillisateur> +  <raison>"
            }
        });
    }
    if (!message.guild.channels.exists("name", "mod-logs")) {
// créer le channel
        message.guild.createChannel('mod-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le salon textuel `mod-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        })
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if (!message.guild.members.get(KickMember.id).bannable) return message.channel.send("L'utilisateur ne peut pas être banni");
    var member = message.mentions.users.first();
    var reason = message.content.split(" ").slice(2).join(" ");
    message.guild.member(kickMember).kick();
    logs.send({
        embed: {
            title: "**Gestion des bans/kicks**",
            color: 0xFF0000,
            fields: [{
                name: '_ _',
                value: '_ _'
            }, {
                name: "Kick de " + member.tag + " par " + message.author.tag,
                value: "Raison : " + reason
            }],
            timestamp: new Date(),
            footer: {
                text: "un bot creer par waSStyle Gaming#8433"
            }
        }
    });
}
if (message.content.startsWith(Prefix + "suggestion")) {
    message.reply({
        embed: {
            color: 3447003,
            description: "mon maitre vien de recevoir votre suggestion maintent a lui de voir si ca lui plait il executera votre demande"
        }
    })
    client.channels.get('383527121290526721').send("la suggestion est : " + message.content.substr(13) + `de : ${message.author.tag}`)
}
if (message.content.startsWith(Prefix + "bug")) {
    message.reply({
        embed: {
            color: 3447003,
            author: {
                name: "bug signialer",
                icon_url: client.user.avatarURL
            },
            description: "mon maitre vien d'etre signialer du bug il essayera de le regler au plus vite",
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "un bot creer par @waSStyle Gaming@8433"
            }
        }
    })
    client.channels.get('383537462871588864').send("un bug a était signialer : " + message.content.substr(6) + `de : ${author.user.tag}`)
}
if (message.content.startsWith(Prefix + 'mute')) {
    let modRole = message.guild.roles.find("name", "HMOD");
    if (!message.guild.roles.exists("name", "HMOD")) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le rôle **HMOD** n'existe pas dans ce serveur veuillez le créer pour Mute! :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (!message.guild.roles.exists("name", "mute")) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le rôle **mute** n'existe pas dans ce serveur veuillez le créer pour Mute! :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (!message.member.roles.has(modRole.id)) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (message.mentions.users.size === 0) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Format : **g!mute** + mention ! :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if (!muteMember) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Je n'ai pas la permissions pour faire cela __(MANAGE_MESSAGES)__ !").catch(console.error);
    }
    if (!message.guild.channels.exists("name", "mod-logs")) {
// créer le channel
        message.guild.createChannel('mod-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le salon textuel `mod-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    let mutedRole = message.guild.roles.find("name", "mute");
    var time = 500000;
    console.log(muteMember);
    muteMember.addRole(mutedRole).then(member => {
        message.channel.sendMessage("", {
        embed: {
            title: "Erreur:",
            color: 0xff0000,
            description: " :white_check_mark:  Vous avez bien mute ** " + muteMember + " dans le serveur " + message.guild.name + " ! :white_check_mark: ",
            footer: {
                text: "un bot creer par waSStyle Gaming#8433"
            }
        }
    }).then(message.guild.channels.find('name', 'mod-logs').sendMessage({
        embed: {
            type: 'rich',
            description: '',
            fields: [{
                name: '**L\'utilisateur <~>**',
                value: muteMember.user.username,
                inline: true
            }, {
                name: 'ID',
                value: muteMember.id,
                inline: true
            }, {
                name: '**Action**',
                value: "mute total",
                inline: true
            }, {
                name: 'Modérateur',
                value: message.author.username,
                inline: true
            }],

            color: 0xD30000,
            footer: {
                text: 'un bot creer par waSStyle Gaming#8433',
                proxy_icon_url: ' '
            },

            author: {
                name: muteMember.user.username,
                icon_url: " ",
                proxy_icon_url: ' '
            }
        }
    })).catch(console.error);
}
)
}
if (message.content === 'g?hh') {
    const embed = new Discord.RichEmbed()
        .setTitle("help de " + client.user.username)
        .setColor(0x00AE86)
        .setDescription("Le prefix pour chaque commande est " + Prefix)
        .setFooter("un bot creer par @wasstyle gaming#8433", client.user.avatarURL)
        .setThumbnail("http://maxpixel.freegreatpicture.com/static/photo/1x/Support-Red-Help-Button-Emergency-153094.png")
        .setTimestamp()
        .addField("💃fun", "ping => pong !\nsay => g?say\navatar => g?avatar\ncompteur => affiche un compteur de nombre", true)
        .addField("🎮 jeux")
        .addField("🔧 moderation", "kick => g?kick\nBan => bannir un membre\nclear => g?clear\nmute => mute un membre\nunmute =>démute un membre\ncc => creer un salon textuel\naddr =>  ajoute un role a un membre", true)
        .addField("📞 contact", "suggestion => donne une idée pour moi\nbug => signiale un bug")
        .addField("🔦 recherche", "yt => fait une recherche sur youtube\ngoogle =>fait une rechereche google\nwiki => fait une recherche wikipedia", true)
        .addField("📜 information", "infob => les information sur le bot\ninfoa => les information sur l'auteur\nsinfo => te donne les information sur le serveur\nstats => tedonne les statistique du bot", true)
        .addField("👑 les commandes master", "master => pour savoir si t'es mon maitre\nsetgame => pour changer mon jeux", true)
        .addField("➕ peitit plus +++", "le bot banni certain mot\nfait bvn pour afficher un gif de bienenue", true);
    message.channel.send(embed)
}
if (message.content.startsWith(Prefix + 'unmute')) {
    let modRole = message.guild.roles.find("name", "HMOD");
    if (!message.guild.roles.exists("name", "HMOD")) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le rôle **HMOD** n'existe pas dans ce serveur veuillez le créer pour unmute! :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (!message.guild.roles.exists("name", "mute")) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le rôle **mute** n'existe pas dans ce serveur veuillez le créer pour Unmute! :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (!message.member.roles.has(modRole.id)) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (message.mentions.users.size === 0) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Format ~> `g!unmute @mention` :no_entry_sign: ",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if (!muteMember) {
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :x:  L\'utilisateur que vous avez entré n'est pas valide ! :x:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Je n'ai pas la permissions pour faire cela __(MANAGE_MESSAGES)__ !").catch(console.error);
    }
    if (!message.guild.channels.exists("name", "h-logs")) {
// créer le channel
        message.guild.createChannel('h-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le salon textuel `h-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        }).catch(console.error);
    }
    let mutedRole = message.guild.roles.find("name", "mute");
    var time = 500000;
    console.log(muteMember);
    muteMember.removeRole(mutedRole).then(member => {
        message.channel.sendMessage("", {
        embed: {
            title: "Erreur:",
            color: 0xff0000,
            description: " :white_check_mark:  Vous avez bien unmute " + muteMember + " dans le serveur " + message.guild.name + " ! :white_check_mark: ",
            footer: {
                text: "un bot creer par waSStyle Gaming#8433"
            }
        }
    }).then(message.guild.channels.find('name', 'h-logs').sendMessage({
        embed: {
            type: 'rich',
            description: '',
            fields: [{
                name: '**L\'utilisateur**',
                value: muteMember.user.username,
                inline: true
            }, {
                name: 'ID',
                value: muteMember.id,
                inline: true
            }, {
                name: '**Action**',
                value: "unmute",
                inline: true
            }, {
                name: 'Modérateur',
                value: message.author.username,
                inline: true
            }],

            color: 0xD30000,
            footer: {
                text: 'un bot creer par waSStyle Gaming#8433',
                proxy_icon_url: ' '
            },

            author: {
                name: muteMember.user.username,
                icon_url: " ",
                proxy_icon_url: ' '
            }
        }
    })).catch(console.error);
}
)
}
if (message.content.startsWith(Prefix + "Ban")) {
    let myrole = message.guild.member(client.user).hasPermission("BAN_MEMBERS"); // Récupération des droits nécéssaires du bot
    let yourole = message.guild.member(message.author).hasPermission("BAN_MEMBERS");
    var logs = message.guild.channels.find("name", "mod-logs");
    if (!myrole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Je n'a pas les permissions nécessaires pour expulser un membre"
            }
        });
    }

    if (!yourole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Tu n'as pas les permissions nécessaires pour bannir un membre"
            }
        });
    }
    if (!myrole) {
        return message.author.send("Je n'ai pas les permissions nécessaires pour bannir un membre");
    }
    if (message.mentions.users.size === 0) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: La commande est : g!kick + <utillisateur> +  <raison>"
            }
        });
    }
    if (!message.guild.channels.exists("name", "mod-logs")) {
// créer le channel
        message.guild.createChannel('mod-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le salon textuel `mod-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        })
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if (!message.guild.members.get(KickMember.id).bannable) return message.channel.send("L'utilisateur ne peut pas être banni");
    var member = message.mentions.users.first()
    var reason = message.content.split(" ").slice(2).join(" ");
    message.guild.member(kickMember).Ban();
    logs.send({
        embed: {
            title: "Gestion des bans/kicks",
            color: 0xFF0000,
            fields: [{
                name: '_ _',
                value: '_ _'
            }, {
                name: "Ban de " + member.tag + " par " + message.author.tag,
                value: "Raison : " + reason
            }],
            timestamp: new Date(),
            footer: {
                text: "un bot creer par waSStyle Gaming#8433"
            }
        }
    });
}
if (message.content.startsWith(Prefix + "cc")) {
    var cc = message.content.substr(5)
    let myrole = message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"); // Récupération des droits nécéssaires du bot
    let yourole = message.guild.member(message.author).hasPermission("MANAGE_CHANNELS");
    var logs = message.guild.channels.find("name", "mod-logs");
    var cc2 = message.guild.roles.find("name", cc);
    if (!myrole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Tu n'as pas les permission necessaire pour creer un salon"
            }
        })
    }
    if (!yourole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Je n'ai pas les permission necessaire pour creer un salon"
            }
        })
    }
    if (!message.guild.channels.exists("name", "mod-logs")) {
// créer le channel
        message.guild.createChannel('mod-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le salon textuel `mod-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        })
    }
    Message.guild.createChannel(cc)
    logs.send({
        embed: {
            color: 0xff0000,
            title: "**creation d'un salon**",
            description: message.author.tag + " a creer le salon " + cc,
            timestamp: new Date(),
            footer: [{
                text: "un bot creer par waSStyle Gaming#8433"
            }]
        }
    })
}

if (message.content.startsWith(Prefix + "warn")) {
    let myrole = message.guild.member(client.user).hasPermission("MANAGE_ROLES");
    let yourole = message.guild.member(message.author).hasPermission("MANAGE_GUILD");
    var logs = message.guild.channels.find("name", "mod-logs");
    let warnrole = message.guild.roles.find("name", "warn");
    if (!myrole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Je n'ai pas les permission necessaire pour warn un membre __(gerer les roles)__"
            }
        })
    }
    if (!yourole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Tu n'as pas les permission necessaire pour warn un membre __(gerer le seveur)__"
            }
        })
    }
    if (!message.guild.channels.exists("name", "mod-logs")) {
        // créer le channel
        message.guild.createChannel('mod-logs');
        // Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le salon textuel `mod-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        })
    }
    if (message.mentions.users.size === 0) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: La commande est : g!warn + <utillisateur> + <raison>"
            }
        });
    }
    if (!message.guild.roles.exists("name", "warn")) {
        // créer le channel
        message.guild.createRole(warnrole);
        // Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le role `warn` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        })
    }
    let WarnMember = message.guild.member(message.mentions.users.first());
    var member = message.mentions.users.first()
    var reason = message.content.split(" ").slice(2).join(" ");
    WarnMember.addRole(warnrole);
    WarnMember.send({
        embed: {
            color: 0xFF0000,
            title: "⚠ Tu a était averti ⚠",
            fields: [{
                neme: "_ _",
                value: "_ _"
            }, {
                name: "sur le serveur",
                value: message.guild.name
            }, {
                neme: "_ _",
                value: "_ _"
            }, {
                name: "raison",
                value: reason
            }],
            timestamp: new Date(),
            footer: {
                icon_url: message.guild.iconURL,
                text: "un bot creer par waSStyle Gaming#8433"
            }
        }
    });
    logs.send({
        embed: {
            title: "**Gestion des Warn**",
            color: 0xFF0000,
            fields: [{
                name: '_ _',
                value: '_ _'
            }, {
                name: "Warn de " + member.tag + " par " + message.author.tag,
                value: "Raison : " + reason
            }],
            timestamp: new Date(),
            footer: {
                text: "un bot creer par waSStyle Gaming#8433"
            }
        }
    });
}
if (message.content.startsWith(Prefix + "wiki")) {
    message.channel.send("https://fr.wikipedia.org/wiki/" + message.content.substr(7))
}

if (message.content.startsWith(Prefix + "addr")) {
    let myrole = message.guild.member(client.user).hasPermission("MANAGE_ROLES"); // Récupération des droits nécéssaires du bot
    let yourole = message.guild.member(message.author).hasPermission("MANAGE_ROLES");
    var logs = message.guild.channels.find("name", "mod-logs");
    var radd = message.content.split(" ").slice(2).join(" ");
    let addRole = message.guild.roles.find("name", radd);
    if (!myrole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Tu n'as pas les permission necessaire pour ajouter un role"
            }
        })
    }
    if (!yourole) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: Je n'ai pas les permission necessaire pour ajouter un role"
            }
        })
    }
    if (!message.guild.channels.exists("name", "mod-logs")) {
// créer le channel
        message.guild.createChannel('mod-logs');
// Affiche un message d'erreur expliquant que le channel n'existait pas
        return message.channel.sendMessage("", {
            embed: {
                title: "Erreur:",
                color: 0xff0000,
                description: " :no_entry_sign: Le salon textuel `mod-logs` n'existait pas, je viens de le créer pour vous :white_check_mark: , Veuillez réessayer :wink:",
                footer: {
                    text: "un bot creer par waSStyle Gaming#8433"
                }
            }
        })
    }
    let NickMember = message.guild.member(message.mentions.users.first());
    if (message.mentions.users.size === 0) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: ":x: La commande est : g!addr + <utillisateur> + <role a ajouter>"
            }
        });
    }
    if(!message.guild.roles.exists("name", radd)) {
        message.guild.crateRole(addRole);
        return message.channel.send({embed: {
            color: 0xFF0000,
            description: ":x: le role a ajouter n'existe pas je vien de le creer pour vous ✔ reessayer "
        }})
    }
    NickMember.addRole(addRole);
    logs.send({
        embed: {
            color: 0xFF0000,
            title: "**gestion des ajout de role**",
            fields: [{
                name: "_ _",
                value: "_ _"
            }, {
                name: member.tag + " a reçu le role " + radd,
                value: "par : " + message.author.tag
            }],
            timestamp: new Date()
        }
    })
    NickMember.send({
        embed: {
            color: 0x00AE86,
            description: NickMember.tag + " Vous avez recu le role " + radd + " sur le serveur " + message.guild.name + " par " + message.author.tag
        }
    })
    }
    if (msgc.startsWith(prefix + "musique")) {
        const ytdl = require('ytdl-core');
        const streamOptions = { seek: 0, volume: 1};
        if(message.member.voiceChannel) {
            message.member.voiceChannel.join().then(connection => {
                const stream = ytdl(message.content.substr(10), { filter : 'audioonly' });
                const dispatcher = connection.playStream(stream, streamOptions);
                message.channel.send("le son est en cour clique sur : \n🔃 recommance a zero le son\n⏯️ metre le son en pause\n✖ arrete le son\n⏩ pour reprendre le son si elle est en pause").then(message => {
                    message.react("🔃")
                    message.react("⏯️")
                    message.react("✖")
                    message.react("⏩")
                    const collecteur = message.createReactionCollector((reaction, user) => user.id === message.author.id);
                    collecteur.on('collect', async(reaction) => {
                    if(reaction.emoji.name === "🔃") { //Si la réaction est ce que l'on veut, on utilise toujours l'unicode
                        const dispatcher = connection.playStream(stream, streamOptions);
                    }
                    await reaction.remove(message.author.id); //Supprime la réaction de l'auteur
                });
                collecteur.on('collect', async(reaction) => {
                    if(reaction.emoji.name === "⏯️") { //Si la réaction est ce que l'on veut, on utilise toujours l'unicode
                    dispatcher.pause();
                }
                await reaction.remove(message.author.id); //Supprime la réaction de l'auteur
                })
                collecteur.on('collect', async(reaction) => {
                    if(reaction.emoji.name === "✖") { //Si la réaction est ce que l'on veut, on utilise toujours l'unicode
                    if(message.member.voiceChannel) {
                        message.member.voiceChannel.leave()
                    }
                    message.edit("le son est fini")
                }
                    await reaction.remove(message.author.id); //Supprime la réaction de l'auteur
                });
                collecteur.on('collect', async(reaction) => {
                    if(reaction.emoji.name === "⏩") { //Si la réaction est ce que l'on veut, on utilise toujours l'unicode
                    dispatcher.leave();
                }
                await reaction.remove(message.author.id); //Supprime la réaction de l'auteur
                })
                })
            })
        } else {
            sendError(message, " rejoin d'abord un salon vocal")
        }
    }
    if (message.content.startsWith(Prefix + 'mycookie')) {
        var test5 = cookie[message.author.id].cookies
        if (!cookie[message.author.id]) {
          return message.channel.send("Oh, c'est triste, mais il semble que vous n'avez pas encore de cookies");
        }
          message.channel.send("Vous avez " + test5 + " cookies")
      }else if (msgc.startsWith(prefix + "cookie")) {
        var mentionned = message.mentions.users.first();
        if (!mentionned) return; //Si personne n'est mentionné, n'exécute pas la commande
        if ((cookie[message.author.id].ratelimit > Date.now()) && (cookie[message.author.id].ratelimit !== 0)) {
                     var now = new Date().getTime();
                     var distance = cookie[message.author.id].ratelimit - now;
                     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                     return message.channel.send(":x: Vous ne pouvez utiliser cette commande qu'une fois toutes les 24h, temps restant: ``" + hours + "h " + minutes + "m " + seconds + "s``");
                 }
        if (!cookie[mentionned.id]) {
           cookie[mentionned.id] = {
              cookies: "1" //On ne peut stocker que des strings(chaînes de caractères) en JSON
           }
           cookie[message.author.id].ratelimit = Date.now() + 86400000 //43200000 c'est 12h en millisecondes
           fs.writeFile("./cookie.json", JSON.stringify(cookie), (err) => { //Indispensable si vous voulez
                 if (err) console.error(err) //sauvegarder une modification du fichier
                 });
           message.channel.send("Vous avez donné un cookie à **" + mentionned.username + "**");    
        } else {
           cookie[mentionned.id].cookies++; //Ajoute 1 cookie
           cookie[message.author.id].ratelimit = Date.now() + 86400000 //43200000 c'est 12h en millisecondes
            fs.writeFile("./cookie.json", JSON.stringify(cookie), (err) => { //Indispensable si vous voulez
                 if (err) console.error(err) //sauvegarder une modification du fichier
                 });
           message.channel.send("Vous avez donné un cookie à **" + mentionned.username + "**");       
        }
     }
     if (msgc.startsWith(prefix + "stats")) {
        message.channel.send("", {
            embed: {
                color: 0xE15306, //La couleur que l'on voit sur le côté gauche de l'embed
                author:  message.author.name,

                title: 'Statistiques du bot', //Le titre de l'embed
                description: '', //La description, dans ce cas-ci mieux vaut la laisser vide
                fields: [
                    {
                        name: '**Salons textuels au total**',
                        value: client.channels.size,
                        inline: true
    }, {
                        name: '**Nombre d\'utilisateurs**',
                        value: client.users.size,
                        inline: true
    }, {
                        name: '**Nombre de serveurs**',
                        value: client.guilds.size,
                        inline: true
                   }],
                thumbnail: {
                    url: message.author.iconURL //l'avatar du bot
                },
                timestamp: new Date(), //La date d'aujourd'hui
                footer: {
                    text: 'un bot creer par @waSStyle Gaming#8433',
                }
            }
        });
    };
    if (msgc.startsWith(prefix + "sinfo")) {
        message.channel.send("", {
            embed: {
                color: 0xE15306, //La couleur que l'on voit sur le côté gauche de l'embed
                author: message.author.name,

                title: 'Informations sur le serveur', //Le titre de l'embed
                description: '', //La description, dans ce cas-ci mieux vaut la laisser vide
                fields: [
                    {
                        name: '**Nom**',
                        value: message.guild.name,
                        inline: true
    }, {
                        name: '**Membres**',
                        value: message.guild.memberCount,
                        inline: true
    }, {
                        name: '**Propriétaire**',
                        value: message.guild.owner.user.tag,
                        inline: true
    }, {
                        name: '**Région**',
                        value: message.guild.region,
                        inline: true
    }, {
                        name: '**ID**',
                        value: message.guild.id,
                        inline: true
                   }],
                thumbnail: {
                    url: message.guild.iconURL //l'avatar du bot
                },
                timestamp: new Date(), //La date d'aujourd'hui
                footer: {
                    text: 'un bot creer par @waSStyle Gaming#8433',
                }
            }
        });
    };
});

client.on('guildmembreadd', member => {
    var memberrole = guild.roles.find("name", "membre");
    member.createDM().then(channel => {
        return channel.send(`bienvenue ` + member.displayname + ` sur ${guild.name} http://gph.is/2jdbsbj`)
    }).catch(console.error);
    member.addRole(memberrole);
});

client.login('Mzc4ODExMTAxMTg3NTM4OTQ0.DO3jWQ.wmXxvG8WzPuVwtNBLub4fgEZg2Q');