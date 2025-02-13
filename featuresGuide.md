# Guide to Adding New Features in Next.js Full-Stack Application

## Order of Implementation

1. Database Schema (Prisma)
2. Types Definition
3. Backend Actions/API Routes
4. Frontend Components
5. Integration & Testing

## Example: "Hello" Message Feature

Let's implement a simple feature where users can:

- Create hello messages
- View their hello messages
- Delete their hello messages

### 1. Database Schema

```prisma
// prisma/schema.prisma

model HelloMessage {
  id        String   @id @default(cuid())
  message   String
  userId    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])

  @@index([userId])
}
```

After updating schema:

```bash
pnpm prisma generate
pnpm prisma db push
```

### 2. Types Definition

```typescript
// app/features/hello/types/hello.ts

export interface HelloMessage {
  id: string
  message: string
  userId: string
  createdAt: Date
}

export type HelloMessageResponse = {
  success: boolean
  error?: string
  message?: HelloMessage
}

export type HelloMessagesResponse = {
  success: boolean
  error?: string
  messages?: HelloMessage[]
}
```

### 3. Backend Actions

```typescript
// app/actions/hello/submit.ts
'use server'

import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { HelloMessageResponse } from "../types/hello"

export async function submitHelloMessage(
  formData: FormData
): Promise<HelloMessageResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated"
      }
    }

    const message = await prisma.helloMessage.create({
      data: {
        message: formData.get('message') as string,
        userId: session.user.id
      }
    })

    return {
      success: true,
      message
    }
  } catch (error) {
    console.error('Error submitting message:', error)
    return {
      success: false,
      error: "Failed to submit message"
    }
  }
}
```

### 4. Frontend Components

```typescript
// app/components/hello/HelloMessageForm.tsx
'use client'

import { useActionState } from "react"
import { submitHelloMessage } from "@/app/actions/hello/submit"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const initialState = {
  success: false,
  error: undefined,
  message: undefined
}

export function HelloMessageForm() {
  const [state, formAction] = useActionState(submitHelloMessage, initialState)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Say Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <Input
            name="message"
            placeholder="Type your hello message..."
            required
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### 5. Page Implementation

```typescript
// app/(main)/hello/page.tsx
import { auth } from "@/app/utils/auth"
import { HelloMessageForm } from "@/app/components/hello/HelloMessageForm"

export default async function HelloPage() {
  const session = await auth()
  
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Hello Messages</h1>
      <HelloMessageForm />
    </div>
  )
}
```

## Directory Structure

```
📁 app/
├── 📁 actions/
│   └── 📁 hello/
│       ├── 📄 submit.ts
│       ├── 📄 delete.ts
│       └── 📄 get.ts
├── 📁 components/
│   └── 📁 hello/
│       ├── 📄 HelloMessageForm.tsx
│       └── 📄 HelloMessageList.tsx
└── 📁 features/
    └── 📁 hello/
        ├── 📁 types/
        │   └── 📄 hello.ts
        └── 📁 utils/
            └── 📄 validation.ts
```

## Best Practices & Guidelines

1. **Schema First Development**
   - Always start with database schema
   - Run migrations in development
   - Test schema with sample data

2. **Type Safety**
   - Define types for all data structures
   - Use interfaces for complex objects
   - Export types for reuse

3. **Server Actions**
   - Use 'use server' directive
   - Handle authentication
   - Implement error handling
   - Return consistent response types

4. **Components**
   - Split into client/server components
   - Use 'use client' when needed
   - Pass server data via props
   - Implement proper error boundaries

5. **File Organization**
   - Group related files together
   - Use clear, descriptive names
   - Keep components focused
   - Share utilities when possible

## Common Patterns

1. **Form Submission**

```typescript
'use client'
const [state, formAction] = useActionState(submitAction, initialState)
return <form action={formAction}>...</form>
```

2. **Server Authentication**

```typescript
const session = await auth()
if (!session?.user) {
  return {
    success: false,
    error: "Not authenticated"
  }
}
```

3. **Error Handling**

```typescript
try {
  // Operation
} catch (error) {
  console.error('Error:', error)
  return {
    success: false,
    error: "Operation failed"
  }
}
```

## Development Workflow

1. Plan the feature
2. Create database schema
3. Generate types
4. Implement server actions
5. Create components
6. Test functionality
7. Add error handling
8. Optimize performance

Remember:

- Keep components small and focused
- Maintain type safety throughout
- Handle errors gracefully
- Test thoroughly
- Document as you go

This guide serves as a template for implementing new features in your Next.js application. Adjust the complexity based on your needs while maintaining the same structural principles.

```

[]: # (END) featuresGuide.md
[]: # (END) db.md
[]: # (END) features
