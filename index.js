
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
  const accepted = req.accepts(["json","html"]);
  if(accepted.includes("html"))
    res.sendFile( path.join(__dirname, 'index.html') );
  else if(accepted.includes("json"))
    res.sendFile( path.join(__dirname, 'index.json') );
  else
    res.sendStatus(406);
});

app.listen(port, () => {
  console.log(`Just doing magic for Vitta on port ${port}`);
});

