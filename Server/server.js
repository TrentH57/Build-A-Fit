const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

require('./config/mongoose.config');

require('dotenv').config(); //I can now access my secret keys anywhere in the app.


app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}), express.json(), express.urlencoded({extended:true})); 

require('./routes/articles.routes')(app);
require('./routes/users.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );