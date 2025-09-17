// Importo express, ne chiamo la funzione, salvo il valore nella variabile app e definisco la port '3000'
const express = require("express");
const app = express();
const port = 3000;

// Importo il file router per i post
const postsRouter = require(`./routers/postsRouter.js`);
// Definisco il middleware per le img (file statici)
app.use(express.static(`imgs/`));
// Importo il middleware notFound
const notFound = require("./middlewares/notFound.js");
// Importi il middleware errorsHandler
const errorsHandler = require("./middlewares/errorsHandler.js");

// Utilizzo il body parser per recuperare le informazioni della richiesta
app.use(express.json());

// Definisco rotta base
app.get("/", (req, res) => {});

// Aggiungo il router
app.use("/posts", postsRouter);

// Aggiungo il middleware notFound
app.use(notFound);
// Aggiungo il middleware errorsHandler
app.use(errorsHandler);

// Faccio in modo che app rimanga in ascolto sulla porta definita
app.listen(port, () => {
  console.log(`Sto ascoltando sulla porta ${port}...`);
});
