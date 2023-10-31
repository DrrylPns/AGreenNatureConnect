'use server'
import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
    title: string,
    btnType: "button" | "submit",
    containerStyles?: string,
    handleClick?: () => void,
}