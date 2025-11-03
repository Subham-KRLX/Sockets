Sockets
=======

Simple socket.io + express demo. Endpoints:

- GET / - serves the chat HTML
- GET /users - returns current in-memory users
- POST /users - create a new user (JSON body: { "name": "..." })

Run locally:

```bash
npm install
node src/index.js
```
