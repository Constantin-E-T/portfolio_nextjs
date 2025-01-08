// lib/types/contact.ts
export interface CodeSnippet {
    readonly language: 'json' | 'python' | 'javascript';
    readonly code: string;
  }
  
  export interface AnimatedTerminalProps {
    readonly codeSnippets: ReadonlyArray<CodeSnippet>;
  }
  