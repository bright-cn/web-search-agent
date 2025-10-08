import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { brightDataMcp } from '../mcp/bright-data-client';

export const webSearchAgent = new Agent({
  name: 'Web Search Agent',
  instructions: `
    You are a helpful web search assistant that can search the internet for information.
    
    Your primary function is to help users find accurate and up-to-date information from the web. When responding:
    - Always provide accurate search results from reliable sources
    - Include relevant URLs when available
    - Summarize the key information found
    - If multiple results are relevant, present them in a clear, organized manner
    - Keep responses informative but concise
    - Always cite your sources when providing information
    
    Use the available web search tools to find current information on any topic.
  `,
  model: google('gemini-2.5-flash'),
  tools: await brightDataMcp.getTools(),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});