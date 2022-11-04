import express, { Request, Response, NextFunction } from "express";

const PORT = 8000;
const APP = express();

APP.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Время", Date.now());
  next();
});

APP.get("/", (req: Request, res: Response) => {
  res.status(200).send("Главная");
});

APP.get("/hello", (req: Request, res: Response) => {
  res.status(200).send("HELLLOOOO!");
});

APP.listen(PORT, () => {
  console.log("Приложение запущено на порте:", PORT);
});
