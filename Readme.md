# ES6

> package.json -> "type":"module"

### FirstFactor Authentication

# Passport local

> /src/config/passportConfig.js

# Usee Session

> index.js

```
app.use(session({...}));
app.use(passport.initialize());
app.use(passport.session());
```

### Serialize / Desirialize User

> /src/config/passportConfig.js

> Login -> serialize user in session
> Logout -> Deserialize user out of session

## Decode QR Code

> https://base64.guru/converter/decode/image

### FRONTEND Vite - React

> vite.config.js -> server: { port: 3001, open: true }

# Tailwind

## API + Frontend

> /src/service/api.js -> baseURL: `http://localhost:7001/api`,

> /src/service/authApi.js
