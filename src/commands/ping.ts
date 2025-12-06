import { WASocket, WAMessage } from '@whiskeysockets/baileys';
import { Command } from '../types';

const pingCommand: Command = {
    name: 'ping',
    description: 'Check if the bot is alive',
    category: 'General',
    execute: async (sock: WASocket, message: WAMessage, args: string[]) => {
        await sock.sendMessage(message.key.remoteJid!, { text: 'Pong! I am here, lurking in the shadows.' });
    }
};

export default pingCommand;
