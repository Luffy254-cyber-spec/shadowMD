import { join } from 'path';
import { ConnectionHandler } from './handlers/connectionHandler';
import { Server } from './server';
import { CommandHandler } from './handlers/commandHandler';
import { logger } from './utils/logger';

async function start() {
    try {
        const commandHandler = new CommandHandler(join(__dirname, 'commands'));
        commandHandler.loadCommands();

        const connectionHandler = new ConnectionHandler();
        await connectionHandler.connect();

        const server = new Server(connectionHandler);
        server.listen(3000);

        // Bind command handler to connection events (simplified for now)
        // In a real scenario, we'd listen for messages and pass them to the command handler
        connectionHandler.sock.ev.on('messages.upsert', async (m: any) => {
            if (m.type === 'notify') {
                for (const msg of m.messages) {
                    if (!msg.message) continue;
                    // Basic message handling logic would go here
                    // For now, we just log
                    // logger.info('Received message');
                }
            }
        });

    } catch (error) {
        logger.error('Failed to start bot:', error);
    }
}

start();
