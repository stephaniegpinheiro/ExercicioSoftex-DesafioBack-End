//Importa o express:
const express = require('express');

//Utilizando o modelo hospitalization:
const { hospitalizations } = require('./models/hospitalizations');

//Utiliza o express no seu sistema
const app = express();

//Utilizando o método json do express para fazer o parse do body da requisição:
//Aqui é para que na hora de usar a rota POST, o express leia o arquivo JSON.
app.use(express.json());

//Rotas:

//1- Nossa rota raiz: mostra no navegador o array de objetos criado na pasta models
app.get('/hospitalizations', (req, res) => {
        res.send(hospitalizations);
    });

//2 - Outra rota para visualização de uma "hospitalization" pelo id:
app.get('/hospitalization/:hospitalizationId', (req, res) => {
    const { hospitalizationId } = req.params;
    const hospitalization = hospitalizations.find((hospitalizationValue) => hospitalizationValue.hospitalizationId === Number(hospitalizationId));
    if (!hospitalization) {
        return res.send("Hospitalization was not find.");
    }
    res.send(hospitalization);
});

//3 - Rota para criar uma nova internação utilizando o método send e o verbo http POST:
app.post('/hospitalization', (req, res) => {
    const hospitalizationName = req.body;
    const hospitalizationId = hospitalizations[hospitalizations.length - 1].hospitalizationId + 1;
    hospitalizations.push({ hospitalizationId, hospitalizationName })
    res.send("Hospitalization successfully created!")
});

//Porta em que o servidor vai rodar:
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
