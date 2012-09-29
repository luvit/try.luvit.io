# Try Luvit In Your Browser!

This is a node program that uses [architect][] and [smith][] in both [node.js][] and the browser.

It serves a simple rpc API over binary websockets using msgpack encoded smith messages.

The rpc API spawns pty sessions on my VPS box running in somewhat sandboxed luvit repls.

<iframe src="http://luvit.io:1337"></iframe>

[architect]: https://github.com/c9/architect
[smith]: https://github.com/c9/smith
[node.js]: http://nodejs.org/