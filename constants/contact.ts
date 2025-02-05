// lib/constants/contact.ts
export const CODE_SNIPPETS = [
    {
      language: 'json',
      code: `{
    "name": "Constantin Emilian",
    "role": "Senior Full Stack Developer",
    "contact": {
      "email": "constantin@woooba.io",
      "location": "Portsmouth, UK",
      "availability": "Remote Worldwide"
    }
  }`
    },
    {
      language: 'python',
      code: `# Professional Background
  - ${new Date().getFullYear() - 2018}+ years of experience
  - Python & Django specialist
  - React.js expert
  - Full stack development
  - Machine learning projects
  - Server management`
    },
    {
      language: 'javascript',
      code: `// Collaboration Preferences
  {
    preferred: [
      "Web Applications",
      "Data Analysis",
      "AI Integration",
      "System Architecture"
    ],
    workflow: {
      communication: "Direct & Clear",
      approach: "Agile",
      availability: "Flexible Hours"
    }
  }`
    }
] as const;