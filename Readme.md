### This Git

> https://github.com/samedan/2501_Node_2FA_Express_React.git

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

### Routes & Protected Routes

> client/src/routes.jsx -> export router

> app.jsx -> <RouterProvider router="router" />

# Protected routes

> client/src/routes.jsx -> {element: <ProtectedRoute />,children: [protected toutes]}

> src/components/ProtectedRoute.jsx -> return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

### Context, Session

> /src/context/SessionContext.jsx -> return <SessionContext.Provider value={(isLoggedIn, user, login, logout)}>...

> ![QRCode](https://github.com/samedan/2501_Node_2FA_Express_React/blob/main/_images/01_printscreen.jpg)
