import express from "express";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import hostsRouter from "./routes/hosts.js";
import amenitiesRouter from "./routes/amenities.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import logHandler from "./middleware/logHandler.js";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import genericErrorHandler from "./middleware/genericErrorHandler.js";

const app = express();

// SENTRY
Sentry.init({
  dsn: "https://55b85bc1df07cf065fa2b153078a9d93@o4508047798829056.ingest.de.sentry.io/4508291402825808",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

//JSON FORMAT
app.use(express.json());

// LOG HANDLER
app.use(logHandler);

// ROUTES
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

// MAIN PAGE
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// PORT
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// SENTRY HANDLER
app.use(Sentry.Handlers.errorHandler());

// ERROR HANDLER
app.use(genericErrorHandler);
