import Gpt4Service from './openai.service';
import {Persona} from '../types';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

class ImplementerService {
  private static instance: ImplementerService;
  private gpt4Service: Gpt4Service;

  private constructor() {
    this.gpt4Service = Gpt4Service.getInstance(Persona.Implementer);
  }

  public static getInstance(): ImplementerService {
    if (!ImplementerService.instance) {
      ImplementerService.instance = new ImplementerService();
    }
    return ImplementerService.instance;
  }

  public async retrieveCommands(prompt: string[]): Promise<string> {
    const systemPrompt = `I am a bot that recieves coding procedures in the form of tutorials. 
    For every totorial you send me, I will send back an array of bash commands for implementing 
    every step in the tutorial. This includes commands for generating and editing files, 
    as well as installing packages. I will only return an array of commands, 
    and will not include any comments or annotations.`

    const systemMessage = {role: 'system' as ChatCompletionRequestMessageRoleEnum, content: systemPrompt};
    const messages = prompt.map((text: string) => ({role: 'user' as ChatCompletionRequestMessageRoleEnum, content: text}));
    try {
      const gpt4Response = await this.gpt4Service.createChatCompletion([
        systemMessage, 
        ...messages
      ]);
      console.log({gpt4Response});
      return gpt4Response;
    } catch (error: any) {
      throw new Error(`Error submitting prompt to GPT-4: ${error.message}`);
    }
  }

  public parseBashCommands(escapedString: string): string[] {
    try {
      const parsedArray: string[] = JSON.parse(escapedString);
      return parsedArray;
    } catch (error) {
      console.error('Error parsing bash commands:', error);
      return [];
    }
  }
}

export default ImplementerService;
