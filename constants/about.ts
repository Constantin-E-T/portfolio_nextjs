// lib/constants/about.ts
export const CODE_SNIPPETS = [
    {
      language: 'python',
      code: `# Personal Info
  class Developer:
      def __init__(self):
          self.name = "Constantin Emilian"
          self.location = "Portsmouth, UK"
          self.years = ${new Date().getFullYear() - 2018}
          self.role = "Senior Full Stack Dev"`,
    },
    {
      language: 'python',
      code: `# Technical Skills
  def get_frontend_skills():
      return [
          "React",
          "Next.js",
          "TailwindCSS"
      ]
  
  def get_backend_skills():
      return [
          "Python",
          "Django",
          "MongoDB"
      ]`,
    },
    {
      language: 'typescript',
      code: `// Development Focus
  interface ProjectFocus {
    primary: string;
    tools: string[];
  }
  
  const currentFocus: ProjectFocus = {
    primary: "Web Applications",
    tools: ["React", "Django"]
  };`,
    },
    {
      language: 'typescript',
      code: `// DevOps Skills
  interface DevOpsStack {
    server: string;
    cloud: string[];
    tools: string[];
  }
  
  const devOps: DevOpsStack = {
    server: "Ubuntu",
    cloud: ["AWS"],
    tools: ["Docker", "CI/CD"]
  };`,
    },
    {
      language: 'python',
      code: `# Current Project
  class WOOOBASport:
      def __init__(self):
          self.position = "Lead Developer"
          self.focus = "Analytics"
          
      def tech_stack(self):
          return ["Python", "React"]`,
    }
  ] as const;