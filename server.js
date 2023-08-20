const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const dotenv = require( `dotenv`);
dotenv.config(); 
const authRoute = require(`./routes/auth`);
const jobsRoute = require(`./routes/jobs`);


// Created an express App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`./public`));


// Connected to MongoDB
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Database connection successful!`))
    .catch(error => console.log(error));


// Created Health API
app.get(`/health`, async(req, res) => {
    res.status(200).json(`server is running`)
});

app.use(`/api/auth`, authRoute);
app.use(`/api/job`, jobsRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
