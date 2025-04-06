import { startXMPPComponent } from './xmpp/component';
import { startNostrRelay } from './nostr/relay';
import { loadConfig } from './config';

async function main() {
    const config = loadConfig();

    const xmppComponent = startXMPPComponent(config.xmpp);
    const nostrRelay = startNostrRelay(config.nostr);

    try {
        await Promise.all([xmppComponent.start(), nostrRelay]);
        console.log('Renostr bridge started successfully');
    } catch (error) {
        console.error('Failed to start Renostr:', error);
        await xmppComponent.stop();
        process.exit(1);
    }

    // Handle shutdown gracefully
    process.on('SIGINT', async () => {
        console.log('Shutting down Renostr...');
        await xmppComponent.stop();
        process.exit(0);
    });
}

main().catch((error) => {
    console.error('Failed to start Renostr:', error);
    process.exit(1);
});
