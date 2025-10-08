<div align="center">
  
## 基于 [Mastra](https://mastra.ai) 构建的强大 AI 驱动网页搜索助手，可搜索、提取与爬取开放网络，并提供准确且带来源的信息。
  
<img width="1200" height="404" alt="brightdata-mastra-fixed" src="https://github.com/user-attachments/assets/de4ca0fe-7e09-4f9b-bc02-13d2f222deee" />
</div>


## 概览

该智能体将 Google 的 Gemini 2.5 Flash 模型与 Bright Data 的网页搜索能力相结合，打造一个智能搜索助手，能够：

- 在任意主题上搜索最新信息
- 提供准确、可靠且带引用来源的回答
- 通过持久化记忆维护对话上下文
- 从多个来源返回结构化、条理清晰的结果

## 功能特性

- 智能生成：使用 Google Gemini 2.5 Flash 进行智能文本生成
- 网页搜索集成：利用 Bright Data 的 MCP（Model Context Protocol）进行网页抓取与搜索
- 持久化记忆：使用 LibSQL 数据库存储会话历史
- 来源引用：始终提供 URL 与来源归属
- 结构化日志：内置 Pino 日志，便于监控与调试

## 架构

### 核心组件

- Web Search Agent（`src/mastra/agents/web-search-agent.ts`）：具备搜索能力的主 AI 智能体
- Bright Data MCP 客户端（`src/mastra/mcp/bright-data-client.ts`）：对接 Bright Data 搜索 API
- Mastra 核心（`src/mastra/index.ts`）：集中化配置与编排

### 关键依赖

- `@mastra/core` - 智能体与工作流的核心框架
- `@ai-sdk/google` - Google AI 的 Gemini 模型集成
- `@mastra/mcp` - Model Context Protocol 客户端
- `@mastra/memory` - 持久化记忆管理
- `@mastra/libsql` - LibSQL 数据库适配器
- `@mastra/loggers` - 日志工具

## 要求

### 系统要求

- Node.js：>= 20.9.0
- npm：最新版本

### 所需 API 密钥

1. Bright Data Token：用于网页搜索能力
2. Google AI API Key：用于访问 Gemini 模型

## 快速开始

``` npx create-mastra@latest --template https://github.com/brightdata/web-search-agent ```

## 设置

### 1. 克隆与安装

```bash
cd web-search-agent
npm install
```

### 2. 环境配置

复制示例环境文件并添加你的 API 密钥：

```bash
cp .env.example .env
```

编辑 `.env` 并添加你的密钥：

```env
BRIGHT_DATA_TOKEN=your_bright_data_token_here
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
```

#### 获取 API 密钥

Bright Data Token：
1. 在 [Bright Data](https://www.bright.cn) 注册
2. 前往你的控制台
3. 生成用于网页搜索的 MCP 令牌

Google AI API Key：
1. 访问 [Google AI Studio](https://aistudio.google.com)
2. 创建或选择一个项目
3. 为 Gemini 模型生成 API Key

### 3. 数据库设置

该智能体使用 LibSQL 进行持久化记忆：
- 开发环境：使用内存数据库（`:memory:`）
- 生产环境：使用基于文件的存储（`file:../mastra.db`）

无需额外配置——数据库将自动创建。

## 使用方法

### 开发模式

启动带热重载的开发服务器：

```bash
npm run dev
```

### 生产构建

构建应用：

```bash
npm run build
```

### 启动生产服务

```bash
npm run start
```

## 智能体能力

Web Search Agent 旨在实现：

### 搜索操作
- 执行实时网页搜索
- 访问超出训练数据范围的最新信息
- 处理复杂的多部分查询
- 跨多个域与来源进行搜索

### 响应质量
- 提供准确、经核验的信息
- 包含带 URL 的正确来源引用
- 以清晰、易读的格式组织信息
- 汇总来自多个来源的关键信息

### 记忆与上下文
- 记住先前对话
- 在既有搜索结果基础上继续
- 在会话间保持上下文
- 存储搜索历史以供参考

## 项目结构

```
web-search-agent/
├── src/
│   └── mastra/
│       ├── agents/
│       │   └── web-search-agent.ts    # Main AI agent
│       ├── mcp/
│       │   └── bright-data-client.ts  # Bright Data integration
│       └── index.ts                   # Mastra configuration
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore rules
├── package.json                       # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

## 配置

### 智能体设置

在 `src/mastra/agents/web-search-agent.ts` 中进行配置：

- 模型：Google Gemini 2.5 Flash
- 记忆：LibSQL 持久化存储
- 工具：Bright Data 网页搜索能力
- 超时：搜索操作 120 秒

### 数据库配置

在 `src/mastra/index.ts` 中的存储设置：

- 开发环境：内存数据库，便于快速迭代
- 生产环境：基于文件的持久化存储

## 故障排除

### 常见问题

“BRIGHT_DATA_TOKEN environment variable is required”
- 确保 `.env` 存在并包含有效的 `BRIGHT_DATA_TOKEN`
- 检查令牌是否过期

“Google AI API key not found”
- 核对 `.env` 中的 `GOOGLE_GENERATIVE_AI_API_KEY`
- 确保该密钥具备 Gemini 模型访问权限

搜索超时
- 检查网络连接
- 确认 Bright Data 服务状态
- 考虑在 `bright-data-client.ts` 中增加超时

### 日志

应用使用 Pino 进行结构化日志，包含：
- 智能体响应与推理
- 搜索 API 调用与响应
- 错误详情与堆栈
- 性能指标

## 开发

### 新增功能

1. 新工具：添加到 `src/mastra/tools/`
2. 智能体改动：更新 `src/mastra/agents/web-search-agent.ts`
3. 配置更改：修改 `src/mastra/index.ts`

### 测试

当前未配置测试。若需添加测试：

```bash
npm install --save-dev jest @types/jest
```
