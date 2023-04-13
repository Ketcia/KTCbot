const {PREFIX} = require('../configs');

function extractDataFromMessage(baileyMessage){
    const textMessage = baileyMessage.message?.conversation
    const extendedTextMessage = baileyMessage.message?.extendedTextMessage?.text
    const imageTextMessage = baileyMessage.message?.imageMessage?.caption

    const fullMessage = textMessage || extendedTextMessage || imageTextMessage

    if (!fullMessage){
        return {
            remoteJid:'',
            fullMessage: '',
            command: '',
            args: '',
            isImage:false,
        }
    }

    const isImage = !!baileyMessage.message?.imageMessage || !!baileyMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage

    const [command, ...args] = fullMessage.trim().split(' ')

    const arg = args.reduce((acc, arg) => acc + ' ' + arg, '').trim()

    return {
        remoteJid: baileyMessage.key.remoteJid,
        fullMessage,
        command: command.replace(PREFIX, '').trim(),
        args: arg.trim(),
        isImage
    }

}

function isCommand(baileyMessage){
    const {fullMessage} = extractDataFromMessage(baileyMessage)
    return fullMessage && fullMessage.startsWith(PREFIX)
}

module.exports ={
    isCommand,
    extractDataFromMessage
}