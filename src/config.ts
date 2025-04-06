import { z } from 'zod';

const configSchema = z.object({
    xmpp: z.object({
        service: z.string().url().describe('XMPP service URL (e.g. xmpp://localhost:5347)'),
        domain: z.string().describe('Component domain (e.g. renoster.example.org)'),
        secret: z.string().describe('Component shared secret'),
    }),
    nostr: z.object({
        port: z.number().int().positive().default(8080),
        enableWebSocket: z.boolean().default(true),
    }),
});

export type Config = z.infer<typeof configSchema>;

export function loadConfig(): Config {
    return configSchema.parse({
        xmpp: {
            service: process.env.XMPP_SERVICE,
            domain: process.env.XMPP_DOMAIN,
            secret: process.env.XMPP_SECRET,
        },
        nostr: {
            port: process.env.NOSTR_PORT ? parseInt(process.env.NOSTR_PORT) : undefined,
            enableWebSocket: process.env.NOSTR_WS !== 'false',
        },
    });
}
