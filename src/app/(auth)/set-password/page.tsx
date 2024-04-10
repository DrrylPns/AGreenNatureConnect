
import { Suspense } from 'react'
import { SetPasswordForm } from './_components/set-password-form'
import { LoadingComponent } from '@/components/LoadingComponent'

const NewPasswordPage = () => {
    return (
        <Suspense fallback={<><LoadingComponent /></>}>
            <SetPasswordForm />
        </Suspense>
    )
}

export default NewPasswordPage