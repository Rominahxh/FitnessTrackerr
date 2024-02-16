const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();  

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors({
    origin: 'http://localhost:5174', 
    credentials: true,
}));
app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/workout.routes")(app);
require('./routes/registerLogIn.routes')(app);
require('./routes/video.routes')(app);

app.listen(8001, () => {
    console.log("Listening at Port 8001");
});

