const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./Tools/db-config.tool');
const ApiResponse = require('./Entity/Responses/api.response');

const {verifyToken,verifyApiKey} = require('./middleware/requestValidator.middleware')

require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.get('/', (req, res) => {
  const accepted = req.accepts(["json","html"]);
  if(accepted.includes("html"))
    res.sendFile( path.join(__dirname, 'index.html') );
  else if(accepted.includes("json")){
    const response = new ApiResponse(res);
    response.success( {
      "name" : 'Vitta API',
      "version" : "0.1.0",
      "owner" : "Ventoqipa"
    } );
    response.sendAsJson();
    //res.sendFile( path.join(__dirname, 'index.json') );
  }
  else
    res.sendStatus(406);
});

app.use('/auth', verifyApiKey, require('./routers/auth.router'));
app.use('/users', verifyToken, require('./routers/users.router'));

app.listen(port, () => {
  console.log(`Just doing magic for Vitta on port ${port}`);
  db.migrate.latest()
    .then(async() => {
      console.log("Migrated");
      await db.seed.run();
      console.log("Seed");
    })
    .catch((e) => console.error(e.message));
});

