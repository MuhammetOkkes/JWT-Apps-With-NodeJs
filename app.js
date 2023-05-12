const express = require('express')
const app = express();
require('express-async-errors')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler') 
const mainRouter = require('./routes/main')
require('dotenv').config();


//middleware
app.use(express.static('./public'))
app.use(express.json()) // (express.json()) fonksiyonu req'teki json verilerini işlemek için kullanılır.

//rootes


app.use('/api/v1',mainRouter)
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

//products route
const port = process.env.port || 3000;

const start = async () => {
    try {
        
        app.listen(port,() => console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()