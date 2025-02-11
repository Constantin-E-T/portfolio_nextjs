// app/components/messages/ThankYouContent.tsx
'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2, Search } from "lucide-react"
import { MessageLookupForm } from "./LookupForm"
import { ReferenceDisplay } from "./ReferenceDisplay"

interface ThankYouContentProps {
    messageRef?: string
}

export function ThankYouContent({ messageRef }: ThankYouContentProps) {
    return (
        <div className="space-y-8">
            {/* Success Message Card */}
            <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl">Message Sent Successfully!</CardTitle>
                    <CardDescription>
                        Thank you for getting in touch. I&apos;ll get back to you as soon as possible.
                    </CardDescription>
                </CardHeader>

                {messageRef && (
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">Your message reference number:</p>
                            <ReferenceDisplay reference={messageRef} />
                            <div className="mt-2 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Please save this number for future reference.
                                </p>
                                <Link
                                    href="/messages/lookup"
                                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
                                >
                                    <Search className="h-4 w-4" />
                                    Look up message status anytime
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4">
                            <p className="text-sm text-muted-foreground pb-4">
                                Want to track your messages and get faster responses?
                            </p>
                            <Link href="/login">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Create an Account
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                )}

                <CardFooter className="justify-between">
                    <Button variant="ghost" asChild>
                        <Link href="/">
                            Back to Home
                        </Link>
                    </Button>

                    <Button variant="default" asChild>
                        <Link href="/contact">
                            Send Another Message
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            {/* Message Status Card */}
            {messageRef && (
                <div className="pt-4">
                    <h2 className="text-lg font-semibold mb-4">Message Status</h2>
                    <MessageLookupForm defaultReference={messageRef} />
                </div>
            )}
        </div>
    )
}