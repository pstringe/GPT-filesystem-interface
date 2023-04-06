import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
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

    this.openai = axios.create({
        baseURL: "https://api.openai.com/v1",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
    });
      
    console.log(this.openai);
  }

  public static getInstance(): Gpt4Service {
    if (!Gpt4Service.instance) {
      Gpt4Service.instance = new Gpt4Service();
    }
    return Gpt4Service.instance;
  }

  
  async createChatCompletion(messages: Message[], options = {}) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{role: "user", content: "Hello world"}],
    });
    console.log(completion.data.choices[0].message);
    return 'test'//completion?.data?.choices[0]?.message ?? 'undefined';
    /*
    console.log({messages});
    try {
      const response = await this.openai.post("/chat/completions", {
        model: this.model,
        messages,
        ...options,
      });
      //console.log({response});
      return response;
    } catch (error) {
      console.error("Error creating chat completion:", error);
    }
    */
  }
  
}

export default Gpt4Service;
