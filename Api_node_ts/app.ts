import express, { Express } from 'express';
import cors from "cors";
import routes from "./src/routes/routes";
import dataBase from "./src/database/database";
import ingredienteEntity from './src/entity/ingrediente_entity';
import lancheEntity from './src/entity/lanche_entity';
import enumIngrediente from './src/enum/enumIngrediente';
import enumParse from './src/enum/enumParse';

const app: Express = express();
const PORT = process.env.PORT || 4001;

app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json());
app.use("/api", routes);

dataBase.once('open', async () => {
  console.log('Connected to MongoDB');

  const ingredienteCount = await ingredienteEntity.countDocuments();

  const lstIngredientes = [
    { id: enumParse.parse(enumIngrediente, enumIngrediente.Alface), name: enumIngrediente.Alface.toString(), valor: 0.40 },
    { id: enumParse.parse(enumIngrediente, enumIngrediente.Bacon), name: enumIngrediente.Bacon.toString(), valor: 2.00 },
    { id: enumParse.parse(enumIngrediente, enumIngrediente.HamburguerCarne), name: enumIngrediente.HamburguerCarne.toString(), valor: 3.00 },
    { id: enumParse.parse(enumIngrediente, enumIngrediente.Ovo), name: enumIngrediente.Ovo.toString(), valor: 0.80 },
    { id: enumParse.parse(enumIngrediente, enumIngrediente.Queijo), name: enumIngrediente.Queijo.toString(), valor: 1.50 }
  ];

  if(ingredienteCount == 0)
    ingredienteEntity.insertMany(lstIngredientes);

  const lancheCount = await lancheEntity.countDocuments();

  if(lancheCount == 0){

    let xBacon = [enumIngrediente.Bacon, enumIngrediente.HamburguerCarne, enumIngrediente.Queijo];
    let xBurger = [enumIngrediente.HamburguerCarne, enumIngrediente.Queijo];
    let xEgg = [enumIngrediente.Ovo, enumIngrediente.HamburguerCarne, enumIngrediente.Queijo];
    let xEggBacon = [enumIngrediente.Ovo, enumIngrediente.Bacon, enumIngrediente.HamburguerCarne, enumIngrediente.Queijo];

    let auxIngreXBacon = lstIngredientes.filter(f => xBacon.findIndex(fi => fi === f.id) >= 0);
    let auxIngrexBurger = lstIngredientes.filter(f => xBurger.findIndex(fi => fi === f.id) >= 0);
    let auxIngrexEgg = lstIngredientes.filter(f => xEgg.findIndex(fi => fi === f.id) >= 0);
    let auxIngrexEggBacon = lstIngredientes.filter(f => xEggBacon.findIndex(fi => fi === f.id) >= 0);

    const lstLanches = [
      { nome: "X-Bacon", valor: auxIngreXBacon.reduce((sum, current) => sum + current.valor, 0), ingredientes: xBacon },
      { nome: "X-Burger", valor: auxIngrexBurger.reduce((sum, current) => sum + current.valor, 0), ingredientes: xBurger },
      { nome: "X-Egg", valor: auxIngrexEgg.reduce((sum, current) => sum + current.valor, 0), ingredientes: xEgg },
      { nome: "X-Egg Bacon", valor: auxIngrexEggBacon.reduce((sum, current) => sum + current.valor, 0), ingredientes: xEggBacon },
    ];

    lancheEntity.insertMany(lstLanches);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
