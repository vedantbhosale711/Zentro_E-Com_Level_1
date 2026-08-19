import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const {PGHOST,PGDATABASE,PGUSER,PGPASSWORD} = process.env;

// this creates a sql connection usng our env variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
// Creates a Neon PostgreSQL SQL client using the database credentials stored in .env.



