const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const router = require('./routes/apiRoutes');
const connectDB = require('./utils/dbConnection');
const mongoose = require('mongoose');
const service = require("./service/service");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const port = process.env.PORT;

app.use(express.json());

//initiate database connection
connectDB(mongoose);
service(myCache);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use("/api",router);

//once my db connection is made then only i will start my server
mongoose.connection.once('open',()=>{
    console.log('Connected to DB');
    app.listen(port,()=>{
        console.log(`Listening to port: ${port}`);
    })
})
  