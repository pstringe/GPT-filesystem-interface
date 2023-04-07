import axios from 'axios';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import { Persona } from '../types';
import { Message } from '../models/openai';



class Gpt4Service {
  private static instances: Gpt4Service[] = new Array(2);
  private apiKey: string;
  private orgId: string;
  private openai: OpenAIApi;
  private config: Configuration;
  private model: string;
  private baseURL: string;

  private constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.orgId = process.env.OPENAI_ORG_ID || '';
    this.baseURL = process.env.OPENAI_BASE_URL || '';
    
    this.model = 'gpt-4';
    this.config = new Configuration({
      apiKey: this.apiKey,
    })
    this.openai = new OpenAIApi(this.config);
  }

  public static getInstance(persona: Persona): Gpt4Service {
    let instance = Gpt4Service.instances[persona];
    if (!instance) {
      Gpt4Service.instances[persona] = new Gpt4Service();
      instance = Gpt4Service.instances[persona];
    }
    return instance;
  }
  
  async createChatCompletion(messages: ChatCompletionRequestMessage[], options = {}) {
    try {
      console.log('messages:', messages);
      const completion = await this.openai.createChatCompletion({
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
