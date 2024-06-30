import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user.mjs';


async function init() {
    const app = express();
    const port = 4000;
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/user", userRouter);
  
  //  app.use("/auth", authRouter);
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  
    app.get("*", (req, res) => {
      res.status(404).send("Not found");
    });
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
  
init();
  