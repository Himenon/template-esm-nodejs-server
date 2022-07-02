import express from "express";
import * as http from "http";

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", error => {
  console.error(error);
});

const createServer = () => {
  const app = express();

  app.get("*", (req: express.Request, res: express.Response) => {
    res.json({ query: (req as any).query });
    res.end();
  });

  const init = async (): Promise<express.Application> => {
    return new Promise(resolve => {
      app.listen(PORT, () => {
        console.log(`Serve start: http://localhost:${PORT}`);
      });
      resolve(app);
    });
  };

  const start = async (): Promise<http.Server> => {
    const app = await init();
    const httpServer = http.createServer(app);
    process.on("SIGTERM", () => {
      httpServer.close();
    });
    return httpServer;
  };

  return {
    start,
  };
};

const server = createServer();

server.start().catch(error => {
  console.error(error);
  process.exit(1);
});
