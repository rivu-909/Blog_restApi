## CORS

-   cross origin resource sharing
-   typically when server and client is on the same domain and it is not allowed to share resources accross domains
-   to solve this we need to set the following headers:

```
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next;
})
```

## Authentication

-   using `jsonwebtoken` or jwt
-   we create a jwt while users logging in using a secretString
-   after which we create a is-auth middleware that checks if the correct token is being used or not for the following requests
-   while updating and deleting we check for authorization that is the signed in user and the user who created the post is the same or not

## Websockets

-   for realtime communication sent from server to client as requesting updates at some interval to the server from client is quite expensive
-   the package to be installed on server side is `socket.io` and on client side we use `socket.io-client`
-   on client side we use some code similar to:

```
const socket = openSocket('http://localhost:8080');

socket.on(
    'posts' /*since we are emitting 'posts' signal from server side */,
    data => {
        using the arguments handle the state changes
    })
```

-   we emit signal on updating, creating and deleting posts as:

```
io.getIO().emit("posts", { message: "Post deleted", postId });
```

# Deploying the app

-   use environmental variables
-   use production api keys
-   reduce error output details (hide sensitive info)
-   set secure response headers
-   add asset compression (reduce response size)
-   configure logging
-   use SSL/TLS (encript data in transit)
