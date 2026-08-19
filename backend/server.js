import express from 'express';
//import security middlewares
import morgan from 'morgan';
import helmet from 'helmet';   
import cors from 'cors'; 
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import 
import {sql } from './config/db.js'
dotenv.config(); ///there is one more way for this its used in lib/arcjet.js


const app = express();
const PORT = process.env.PORT || 7001;
//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet()); //used for security purpose to get more http headers in the reaponse
app.use(morgan('dev'));

// rate limiting and bot detection
app.use(async (req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
})


app.use('/api/products', productRoutes);

// about app.use() -> if we dont give url it works for all the urls

async function initDB(){ 
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
    }
    catch(error){
        console.log(`Error in initDB function: ${error}`);
    }
}

initDB().then(()=>{ //only listen when the db is called
    app.listen(PORT,()=>{
        console.log(`server started at ${PORT}`);
    })
})




