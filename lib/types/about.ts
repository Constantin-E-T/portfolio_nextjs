// lib/types/about.ts
export interface CodeSnippet {
    readonly language: 'python' | 'typescript';
    readonly code: string;
  }
  
  export interface AnimatedTerminalProps {
    readonly codeSnippets: ReadonlyArray<CodeSnippet>;
  }