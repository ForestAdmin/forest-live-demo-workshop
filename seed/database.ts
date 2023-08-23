import 'dotenv/config';
import { Pool } from 'pg';

const prodPool: Pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
  max: 10, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait before timing out when connecting a new client
  ssl: { rejectUnauthorized: false },
});

const devPool: Pool = new Pool({
  host: 'localhost',
  port: 5435,
  database: 'demo-workshop',
  user: 'forest',
  password: 'secret',
  max: 10, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait before timing out when connecting a new client
});

export default process.env.NODE_ENV === 'production' ? prodPool : devPool;
