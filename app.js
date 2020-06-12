const express = require("express");
const app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

mongoose.connection.on("error", function (e) {
  console.error(e);
});
app.use(express.json());

// definimos el schema
var schema = mongoose.Schema({
  date: Date,
  name: String,
});

// definimos el modelo
var Visitor = mongoose.model("Visitor", schema);

// Routes
app.get("/", (req, res) => {
  Visitor.create({
    date: Date(),
    name: req.query.name ? req.query.name : "Anónimo",
  });
  res.send("<h1>El visitante fue almacenado con éxito</h1>");
});

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
