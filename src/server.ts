
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { join } from 'path';
import { ConnectionHandler } from './handlers/connectionHandler';

export class Server {
    private app: express.Application;
    private connectionHandler: ConnectionHandler;

    constructor(connectionHandler: ConnectionHandler) {
        this.app = express();
        this.connectionHandler = connectionHandler;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.static(join(__dirname, '../public')));
    }

    private initializeRoutes() {
        this.app.post('/pair', async (req, res) => {
            const { phoneNumber } = req.body;
            console.log('Pairing request received for:', phoneNumber);

            if (!phoneNumber) {
                return res.status(400).json({ error: 'Phone number is required' });
            }

            try {
                const code = await this.connectionHandler.requestPairingCode(phoneNumber);
                res.json({ code });
            } catch (error: any) {
                console.error('Pairing error:', error);
                res.status(500).json({ error: 'Failed to generate pairing code', details: error.message });
            }
        });
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}
