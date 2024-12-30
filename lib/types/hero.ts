// lib/types/hero.ts

export interface Technology {
    readonly name: string;
    readonly delay: number;
  }
  
  export interface CodeSnippet {
    readonly language: 'python' | 'javascript';
    readonly code: string;
  }
  
  export interface AnimatedTerminalProps {
    readonly codeSnippets: ReadonlyArray<CodeSnippet>;
  }
  
  export interface HeroContentProps {
    readonly title: string;
    readonly description: string;
    readonly technologies: ReadonlyArray<Technology>;
  }
  