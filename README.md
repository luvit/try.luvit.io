# Try Luvit In Your Browser!

This is a node program that uses [architect][] and [smith][] in both [node.js][] and the browser.

It serves a simple rpc API over binary websockets using msgpack encoded smith messages.

The rpc API spawns pty sessions on my VPS box running in somewhat sandboxed luvit repls.

To play with the repl, simple go [here](http://luvit.io:1337/).

If you want to watch the decoded msgpack messages, append `?debug` to the url and open web inspector's console.

[architect]: https://github.com/c9/architect
[smith]: https://github.com/c9/smith
[node.js]: http://nodejs.org/