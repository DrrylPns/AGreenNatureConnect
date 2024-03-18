
import { NewVerificationForm } from '@/components/new-verification-form'
import React, { Suspense } from 'react'

const NewVerificationPage = () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <NewVerificationForm />
        </Suspense>
    )
}

export default NewVerificationPage