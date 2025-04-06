import { component, xml } from '@xmpp/component';
import type { Config } from '../config';
import type { Renostr } from '../types/events';

export class XMPPComponent {
    private xmpp: any; // TODO: Import proper type from @xmpp/component
    private config: Config['xmpp'];

    constructor(config: Config['xmpp']) {
        this.config = config;
        this.xmpp = component({
            service: config.service,
            domain: config.domain,
            password: config.secret,
        });

        this.setupHandlers();
    }

    private setupHandlers(): void {
        this.xmpp.on('error', (error: Error) => {
            console.error('XMPP component error:', error);
        });

        this.xmpp.on('status', (status: string) => {
            console.log('XMPP status:', status);
        });

        this.xmpp.on('online', (address: string) => {
            console.log(`XMPP component connected as ${address}`);
        });

        this.xmpp.on('offline', () => {
            console.log('XMPP component disconnected');
        });

        this.xmpp.on('stanza', (stanza: any) => {
            if (stanza.is('message')) {
                this.handleMessage(stanza);
            }
        });
    }

    private handleMessage(stanza: any): void {
        const message: Renostr.XMPPMessage = {
            id: stanza.attrs.id || '',
            from: stanza.attrs.from || '',
            to: stanza.attrs.to || '',
            body: stanza.getChildText('body') || '',
            type: (stanza.attrs.type as 'chat' | 'groupchat') || 'chat',
        };

        console.log('Received XMPP message:', message);
        // TODO: Bridge to Nostr
    }

    public async start(): Promise<void> {
        await this.xmpp.start();
    }

    public async stop(): Promise<void> {
        await this.xmpp.stop();
    }

    public async sendMessage(to: string, body: string): Promise<void> {
        const message = xml('message', { to, type: 'chat' }, xml('body', {}, body));
        await this.xmpp.send(message);
    }
}

export function startXMPPComponent(config: Config['xmpp']) {
    return new XMPPComponent(config);
}
