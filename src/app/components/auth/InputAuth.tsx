"use client"
import { RegisterType } from "@/lib/validations/registerUserSchema";
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    isCheckbox?: boolean;
    register: UseFormRegister<RegisterType>;
    errors: FieldErrors;
    icon?: string | JSX.Element;
}

const InputAuth: React.FC<InputProps> = ({
    id,
    label,
    type = "text", //input type on default is text (change if password, email, etc...)
    disabled,
    register,
    required,
    errors,
    isCheckbox,
    icon,
}) => {

    return (
        <div className="w-full relative">
            {/* input error TODO Auth*/}
            <input
                id={id}
                disabled={disabled}
                {...register(id as "email" | "password" | "confirmPassword" | "terms", { required })}
                placeholder=" "
                type={type}
                className={`
                    ${isCheckbox ? `
                    
                    ` : `
                    peer
                    w-full
                    p-4
                    pt-6
                    dark:bg-[#09090B]
                    font-light 
                    bg-white 
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    pl-4
                    ` }
                `}
            />
            <label
                className={`
                    ${isCheckbox ? `
                        m-3
                    ` : `
                        absolute 
                        text-md
                        duration-150 
                        transform 
                        -translate-y-3 
                        top-5 
                        z-10 
                        origin-[0]
                        dark:text-[#92929a] 
                        left-4
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75
                        peer-focus:-translate-y-4
                    `}
                `}
            >
                {label}

                {isCheckbox && (
                    <>
                        {/* TODO ADD LINKS OF TERMS AND CONDITIONS AND PRIVACY POLICY */}
                        <span className="">By Continuing you agree to our
                            <Link href={""} className="text-[#0227EB] m-1">Terms and Conditions</Link>
                            and acknowledge that you understand
                            <Link href={""} className="text-[#0227EB] m-1">Privacy Policy</Link></span>
                    </>
                )}
                <span className={"text-[#FF2222]"}>*</span>
            </label>
            <span>{icon}</span>
        </div>
    )
}

export default InputAuth