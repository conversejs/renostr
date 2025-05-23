import type { Renostr } from '../types/events';

export class MessageTranslator {
    private config: Renostr.BridgeConfig;

    constructor(config: Renostr.BridgeConfig) {
        this.config = config;
    }

    public xmppToNostr(message: Renostr.XMPPMessage): Renostr.NostrEvent {
        // Extract pubkey from JID (localpart@domain)
        const pubkey = message.from.split('@')[0];

        return {
            id: '', // Will be generated by nostr-tools
            pubkey,
            created_at: Math.floor(Date.now() / 1000),
            kind: 1, // Text note
            tags: [],
            content: message.body,
            sig: '', // Will be generated by nostr-tools
        };
    }

    public nostrToXMPP(event: Renostr.NostrEvent): Renostr.XMPPMessage {
        const jid = `${event.pubkey}@${this.config.xmppDomain}`;

        return {
            id: event.id,
            from: jid,
            to: '', // Will be set by XMPP component
            body: event.content,
            type: 'chat',
        };
    }
}
