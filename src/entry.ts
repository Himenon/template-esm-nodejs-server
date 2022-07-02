import express from "express";

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", error => {
  console.error(error);
});

const createApp = () => {
  const app = express();

  app.get("*", (req: express.Request, res: express.Response) => {
    console.log(`req = ${req.url}`);
    res.json({ query: (req as any).query });
    res.end();
  });

  return app;
};

const init = async () => {
  const app = createApp();

  let serverClosing = false;

  const startClose = (reason: string) => {
    if (serverClosing) {
      return;
    }
    serverClosing = true;
    console.log(`Start Close Serve by ${reason}r`);
    httpServer.close(() => {
      console.log(`Terminated by ${reason}`);
    });
  };

  const httpServer = app.listen(PORT, () => {
    console.log(`Serve[${process.env.APP_VERSION}] start: http://0.0.0.0:${PORT}`);
  });

  process.on("SIGTERM", () => {
    startClose("SIGTERM");
  });

  process.on("SIGINT", () => {
    startClose("SIGINT");
  });

  process.on("SIGHUP", () => {
    startClose("SIGHUP");
  });
};

init().catch(error => {
  console.error(error);
  process.exit(1);
});
