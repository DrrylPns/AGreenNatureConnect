"use client"
import { Button } from "../Ui/Button"
import useLoginModal from '@/lib/hooks/useLoginModal'

const SignInBtn = () => {
    const loginModal = useLoginModal()

    return (
        <>
            <Button
                onClick={loginModal.onOpen}
                variant={'green'}
            >
                Sign In
            </Button>
        </>
    )
}

export default SignInBtn