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
