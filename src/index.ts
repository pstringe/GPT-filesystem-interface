import express from 'express';
import plannerRouter from './controllers/planner';
require('dotenv').config();

// Import your routes here
// import { userRouter } from './Routes/userRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use your routes here
// app.use('/users', userRouter);
app.use('/planner', plannerRouter); // Mount the planner router

app.listen(port, () => {``
  console.log(`Server started on port ${port}`);
});