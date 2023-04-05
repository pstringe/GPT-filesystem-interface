import express from 'express';

// Import your routes here
// import { userRouter } from './Routes/userRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use your routes here
// app.use('/users', userRouter);

app.listen(port, () => {``
  console.log(`Server started on port ${port}`);
});
