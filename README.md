# Renostr

_Note: this is a WIP pre-alpha project._

Renostr is a [Nostr](https://nostr.com/) <=> [XMPP](http://xmpp.org/) bridge which allows bidirectional communication between the two protocols.

It lets you communicate with Nostr users using your XMPP client, and vice versa.

## Benefits

Why would it be useful to use an XMPP client to access the Nostr network?

If you already use XMPP, this opens up a whole new communications network for you and you can continue using your existing XEP-0277-compliant XMPP client.

Other benefits include:

- More client diversity. XMPP is a well-established protocol with lots of clients.
- You only need a single connection to the XMPP server (and Renostr will manage the multiple connections to the Nostr relays)
- Your XMPP server can archive your Nostr messages, so you're not beholden to Nostr relays for storage.
- You can use your XMPP server's blocklist to block unwanted Nostr users
- Nostr contacts can be saved as XMPP contacts.

## Drawbacks

In order to let existing XMPP clients work with Nostr, Renostr needs access
to your Nostr private key, so that it can sign messages on your behalf.

This follows the same pattern as [Mostr](https://mostr.pub/), the Nostr to ActivityPub gateway.

## Architecture

Renostr is both a Nostr client and an XMPP server component.

It listens for Nostr events and translates them into XMPP stanzas.

Specifically, it translate Nostr notes into XEP-0277 microblogging stanzas,
which are published to a global PubSub node as well as a node specific to that
user (aka note publisher).

This enables vanilla XMPP clients (that support XEP-0122 microblogging) to
subscribe to those PubSub nodes and receive all the Nostr messages that
the Renostr relay knows about.
