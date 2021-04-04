const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const userRouter = require('./src/routes/userRouter');
const clientRouter = require('./src/routes/clientRouter');
const clientDBRouter = require('./src/routes/clientBDRouter');
const consultRouter = require('./src/routes/consultRouter');
const graphTypeRouter = require('./src/routes/graphTypeRouter');


app.get('/', (req,res)=>{
    res.send('Graficos API');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use ('/users', userRouter);
app.use ('/client', clientRouter);
app.use ('/clientBD', clientDBRouter);
app.use ('/consult', consultRouter);
app.use ('/graphType', graphTypeRouter);

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(' 🔥 Server running on port '+ port +'...'));