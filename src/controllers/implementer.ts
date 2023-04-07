import express, { Request, Response } from 'express';
import ImplementerService from '../services/implementer.service';

const router = express.Router();

router.post('/commands', async (req: Request, res: Response) => {
  try {
    const {prompt, context} = req.body;
    const implementerService = ImplementerService.getInstance();
    const implementerResponse = await implementerService.retrieveCommands([...prompt,  context]);
    // Your logic to handle the prompt submission goes here.
    // For example, you can call the GPT-4 API with the prompt and process the response.

    res.status(200).json({
      success: true,
      message: 'Prompt submitted successfully',
      response: implementerResponse,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting the prompt',
      error: error.message,
    });
  }
});

export default router;