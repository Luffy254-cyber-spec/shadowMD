import { WASocket, WAMessage, AnyMessageContent } from '@whiskeysockets/baileys';

export interface Command {
    name: string;
    description: string;
    category: string;
    execute: (sock: WASocket, message: WAMessage, args: string[]) => Promise<void>;
}

export interface CommandMap {
    [key: string]: Command;
}
