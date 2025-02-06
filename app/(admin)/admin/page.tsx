// app/(admin)/admin/page.tsx
import { auth } from '@/app/utils/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your portfolio content from here.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Projects</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Blog Posts</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Messages</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <p className="mt-2 text-muted-foreground">
          No recent activity to display.
        </p>
      </div>
    </div>
  )
}