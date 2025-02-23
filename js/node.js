// linha de comando
const { readFile } = require('fs'); // ler arquivo
const express = require("express"); // http
const cors = require('cors'); // api

let data;
const app = express();

readFile('../data.json', 'utf8', (err, jsonString) => {
    if (err) { 
        console.log("File read failed:", err)
        return
    }
    data = jsonString; 
});

app.use(cors({
    origin: '*'
}));

app.get("/", function (req, res) {
  res.json(data);
});

app.listen(3000, function () {
  console.log("App de Exemplo escutando na porta 3000!");
});
