import Gpt4Service from './openai.service';
import {Message} from '../models/openai';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

class PlannerService {
  private static instance: PlannerService;
  private gpt4Service: Gpt4Service;

  private constructor() {
    this.gpt4Service = Gpt4Service.getInstance();
  }

  public static getInstance(): PlannerService {
    if (!PlannerService.instance) {
      PlannerService.instance = new PlannerService();
    }
    return PlannerService.instance;
  }

  async submitPrompt(prompt: string[]): Promise<string> {
    const messages = prompt.map((text: string) => ({role: 'user' as ChatCompletionRequestMessageRoleEnum, content: text}));
    try {
      const gpt4Response = await this.gpt4Service.createChatCompletion(messages);
      console.log({gpt4Response});
      return gpt4Response;
    } catch (error: any) {
      throw new Error(`Error submitting prompt to GPT-4: ${error.message}`);
    }
  }
}

export default PlannerService;
