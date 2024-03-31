"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog"
import useWarningModal from "@/lib/hooks/useWarningModal"
import Link from "next/link"


export const WarnUser = () => {
    const { isOpen, onClose } = useWarningModal()


    console.log(`isOpen: ${isOpen}`);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="z-50">
                <DialogHeader>
                    <DialogDescription>
                        <div className="w-full p-4 gap-4 items-center justify-center lg:gap-8 space-y-3">
                            <h1 className="text-center text-4xl font-bold dark:text-white text-black">Warning</h1>
                            <p className="text-center text-muted-foreground">
                                Your account has been reported for violating our terms of service.
                            </p>

                            <Link
                                className="w-full inline-flex items-center justify-center h-9 rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                href="/termsPolicy"
                            >
                                Terms and Conditions
                            </Link>

                            <p className="text-sm">
                                Please take a moment to review our terms of service. Further violations may result in account suspension.
                            </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent >
        </Dialog >
    )
}
