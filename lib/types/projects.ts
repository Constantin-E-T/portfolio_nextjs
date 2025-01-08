// lib/types/projects.ts
export interface CodeSnippet {
    language: 'bash' | 'dockerfile' | 'javascript' | 'python' | 'yaml';
    code: string;
  }
  
  
  export interface AnimatedTerminalProps {
    readonly codeSnippets: ReadonlyArray<CodeSnippet>;
  }