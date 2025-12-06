import makeWASocket, { DisconnectReason, useMultiFileAuthState, ConnectionState } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import * as qrcode from 'qrcode-terminal';
import { logger } from '../utils/logger';

export class ConnectionHandler {
    public sock: any;

    public async connect() {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

        this.sock = makeWASocket({
            printQRInTerminal: false, // Handle manually
            auth: state,
            logger: logger as any,
        });

        this.sock.ev.on('creds.update', saveCreds);

        this.sock.ev.on('connection.update', (update: ConnectionState) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                qrcode.generate(qr, { small: true });
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
                logger.info(`Connection closed due to ${lastDisconnect?.error}, reconnecting: ${shouldReconnect}`);
                if (shouldReconnect) {
                    this.connect();
                }
            } else if (connection === 'open') {
                console.log("I am the eminence in shadow, he who larks in the shadows to hunt the shadows, I am atomic");
                logger.info('Opened connection');
            }
        });
    }
    public async requestPairingCode(phoneNumber: string): Promise<string> {
        if (!this.sock) {
            throw new Error('Socket not initialized');
        }

        // Ensure phone number is formatted correctly (you might need more validation)
        // Baileys typically expects just numbers
        const pNum = phoneNumber.replace(/[^0-9]/g, '');

        if (!this.sock.authState.creds.me?.id) {
            // We are in a state where we can pair. 
            // NOTE: requestPairingCode is only available if we didn't provide auth creds with a "me" ID (i.e. not logged in)
            // But actually makeWASocket returns it.
            const code = await this.sock.requestPairingCode(pNum);
            return code;
        } else {
            throw new Error('Already connected');
        }
    }
}
