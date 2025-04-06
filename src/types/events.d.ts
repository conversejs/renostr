declare namespace Renostr {
    interface XMPPMessage {
        id: string;
        from: string;
        to: string;
        body: string;
        type: 'chat' | 'groupchat';
    }

    interface NostrEvent {
        id: string;
        pubkey: string;
        created_at: number;
        kind: number;
        tags: string[][];
        content: string;
        sig: string;
    }

    interface BridgeConfig {
        xmppDomain: string;
        maxMessageLength: number;
    }
}
