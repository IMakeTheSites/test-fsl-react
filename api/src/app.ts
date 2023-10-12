import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();
app.use(cors());

app.disable('etag');
app.use(express.json());
app.use(router);

export default app;
