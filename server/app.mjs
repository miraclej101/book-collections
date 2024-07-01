import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user.mjs';
import booksRouter from './routes/books.mjs';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

async function init() {
    const app = express();
    const port = 4000;
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/user", userRouter);
    app.use("/books", booksRouter);
   
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    const options = {
        definition: {
          openapi: "3.1.0",
          info: {
            title: "Book Collections Management System API",
            version: "0.1.0",
            description:
              "This is a CRUD API application of Book Collections Management System made with Express and documented with Swagger",
            contact: {
              name: "Malasri JANUMPORN",
              url: "https://miraclej101.github.io/",
              email: "malasrij101@gmail.com",
            },
          },
          servers: [
            {
              url: "http://localhost:4000",
            },
          ],
        },
        apis: ["./routes/*.mjs"],
      };
      
      const specs = swaggerJsDoc(options);
      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true} )
      );

    app.get("*", (req, res) => {
        res.status(404).send("Not found");
      });
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
  
init();
  