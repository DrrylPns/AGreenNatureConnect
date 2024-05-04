'use client';
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card"

export default function Notifpage(){
    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button size="sm" variant="outline">
              Mark all as read
            </Button>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>New message from Jane</CardTitle>
                <CardDescription>Jane sent you a new message about the project deadline.</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your subscription is expiring soon</CardTitle>
                <CardDescription>Your subscription will expire in 7 days. Renew now to avoid interruption.</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New comment on your post</CardTitle>
                <CardDescription>John commented on your recent blog post. Check it out!</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-gray-400">3 days ago</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your order has been shipped</CardTitle>
                <CardDescription>Your order #12345 has been shipped and is on its way to you.</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 week ago</p>
              </CardFooter>
            </Card>
          </div>
        </main>
      )

}