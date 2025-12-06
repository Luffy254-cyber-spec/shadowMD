import { WASocket, WAMessage } from '@whiskeysockets/baileys';
import { Command } from '../types';

// We need a way to access the command list. 
// For simplicity in this structure, we'll just hardcode the categories or 
// in a real app, we'd inject the CommandHandler or make it a singleton.
// For now, I'll create a simple menu.

const menuCommand: Command = {
    name: 'menu',
    description: 'Show available commands',
    category: 'General',
    execute: async (sock: WASocket, message: WAMessage, args: string[]) => {
        const menuText = `
*ShadowMD Bot Menu*

*AI Commands*
- .shadow <prompt>: Talk to the Shadow AI

*General*
- .menu: Show this menu
- .ping: Check bot status

_I am atomic._
        `;

        await sock.sendMessage(message.key.remoteJid!, { text: menuText });
    }
};

export default menuCommand;
