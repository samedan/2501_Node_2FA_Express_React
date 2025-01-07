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
