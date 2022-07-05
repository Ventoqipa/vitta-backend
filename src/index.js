const express = require('express');
const bodyparser = require('body-parser');
const db = require('./Tools/db-config.tool');

const {verifyToken,verifyApiKey} = require('./middleware/requestValidator.middleware')

require('dotenv').config();

const port = process.env.PORT;
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This the Vitta API documentation.',
            title: 'Swagger',
            version: '3.0.0',
        },
        host: `localhost:${process.env.PORT}`,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            basic : {
              type: 'basic',
                in: 'header',
                name: 'Authorization',
                description: ""
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routers/*.js'] //Path to the API handle folder
};
expressSwagger(options);  
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/', require('./routers/app.router'));
app.use('/resources', verifyApiKey, require('./routers/resources.router'));
app.use('/auth', verifyApiKey, require('./routers/auth.router'));

app.use('/users', verifyToken, require('./routers/users.router'));
app.use('/alarms', verifyToken, require('./routers/alarms.router'));

app.listen(port, () => {
  console.log(`Just doing magic for Vitta on port ${port}`);
  /*db.migrate.latest()
    .then(async() => {
      console.log("Migrated");
      await db.seed.run();
      console.log("Seed");
    })
    .catch((e) => console.error(e.message)); */
});

