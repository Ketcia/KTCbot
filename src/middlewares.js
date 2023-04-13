const {BOT_EMOJI} = require('./configs');
const {isCommand, extractDataFromMessage} = require('./utils/index')
const {default: MessageType} = require('@adiwajshing/baileys')

async function middlewares (bot){
    bot.ev.on('messages.upsert', async ({messages}) =>{
        const baileyMessage = messages[0]

        if (!baileyMessage?.message){
            return console
        }

        const { command, remoteJid } = extractDataFromMessage(baileyMessage)

        switch (command.toLowerCase()) {
            case 'everyone':

                //await bot.sendMessage(remoteJid, {text: `${BOT_EMOJI}  Pong`})

                group = await bot.groupMetadata(remoteJid);
                var participantsId = []
                ptcNumber = ''
                group['participants'].map(
                    async (uye) => {
                        ptcNumber += '@' + uye.id.split('@')[0] + ' '
                        participantsId.push(uye.id.replace('c.us', 's.whatsapp.net'))
                    }
                )
                await bot.sendMessage(remoteJid, { text: ptcNumber, mentions: participantsId })
                
                
                break
        }
        
    })
}

module.exports = middlewares