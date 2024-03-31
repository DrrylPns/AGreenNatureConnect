
import { NewPasswordForm } from '@/components/new-password-form'
import React, { Suspense } from 'react'

const NewPasswordPage = () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <NewPasswordForm />
        </Suspense>
    )
}

export default NewPasswordPage