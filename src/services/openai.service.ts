import axios from 'axios';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import { Message } from '../models/openai';

class Gpt4Service {
  private static instance: Gpt4Service;
  private apiKey: string;
  private orgId: string;
  private openai: any;
  private model: string;
  private baseURL: string;

  private constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.orgId = process.env.OPENAI_ORG_ID || '';
    this.baseURL = process.env.OPENAI_BASE_URL || '';
    this.model = 'gpt-4';
  }

  public static getInstance(): Gpt4Service {
    if (!Gpt4Service.instance) {
      Gpt4Service.instance = new Gpt4Service();
    }
    return Gpt4Service.instance;
  }

  
  async createChatCompletion(messages: ChatCompletionRequestMessage[], options = {}) {
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    try {
      console.log('messages:', messages);
      const completion = await openai.createChatCompletion({
        model: this.model,
        messages,
        ...options,
      });
      console.log('completion:', completion.data.choices[0].message);
      return completion?.data?.choices[0]?.message?.content ?? 'undefined';    
    }
    catch (error: any) {
      throw new Error(`Error creating chat completion: ${error.message}`);
    }
    
  }
  
}

export default Gpt4Service;
