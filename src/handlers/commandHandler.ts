import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { Command, CommandMap } from '../types';
import { logger } from '../utils/logger';

export class CommandHandler {
    private commands: CommandMap = {};
    private commandDirectory: string;

    constructor(commandDirectory: string) {
        this.commandDirectory = commandDirectory;
    }

    public loadCommands(): void {
        this.readCommands(this.commandDirectory);
        logger.info(`Loaded ${Object.keys(this.commands).length} commands.`);
    }

    private readCommands(dir: string): void {
        const files = readdirSync(dir);

        for (const file of files) {
            const filePath = join(dir, file);
            const stat = statSync(filePath);

            if (stat.isDirectory()) {
                this.readCommands(filePath);
            } else if (file.endsWith('.ts') || file.endsWith('.js')) {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const commandModule = require(filePath);
                    const command: Command = commandModule.default || commandModule;

                    if (command.name && typeof command.execute === 'function') {
                        this.commands[command.name] = command;
                    }
                } catch (error) {
                    logger.error(`Failed to load command from ${file}:`, error);
                }
            }
        }
    }

    public getCommand(name: string): Command | undefined {
        return this.commands[name];
    }

    public getCommands(): CommandMap {
        return this.commands;
    }
}
