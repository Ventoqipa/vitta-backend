
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
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
  else if(accepted.includes("json"))
    res.sendFile( path.join(__dirname, 'index.json') );
  else
    res.sendStatus(406);
});

app.use('/auth', verifyApiKey, require('./router/auth.router'));
app.use('/users', verifyToken, require('./router/users.router'));

app.listen(port, () => {
  console.log(`Just doing magic for Vitta on port ${port}`);
});

