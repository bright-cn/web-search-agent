import { MCPClient } from '@mastra/mcp';

const token = process.env.BRIGHT_DATA_TOKEN;
if (!token) {
  throw new Error('BRIGHT_DATA_TOKEN environment variable is required');
}

export const brightDataMcp = new MCPClient({
  timeout:120000,
  servers: {
    brightData: {
      url: new URL(`https://mcp.brightdata.com/mcp?token=${token}&pro=1`),
    },
  },
});