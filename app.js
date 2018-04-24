require('dotenv').config();
require('./db.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https').Server(app);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
//Creating a user
app.use('/api/user', require("./routes/user"));
// logging in a user
app.use('/api/login', require('./routes/session'));
//localhost:3000/api/login/
app.use('/api/definition', require('./routes/definition'));

app.use('/api/log', require('./routes/log'));

app.listen(process.env.PORT, function(){
	console.log(`app is running on ${process.env.PORT}`);
})

