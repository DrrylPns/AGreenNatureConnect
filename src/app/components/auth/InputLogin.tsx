import { LoginType } from "@/lib/validations/loginUserSchema";
import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<LoginType>
    icon?: string | JSX.Element;
}

const InputLogin: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    register,
    required,
    icon,
}) => {
    return (
        <div className="w-full relative flex justify-between">
            <input
                id={id}
                disabled={disabled}
                // @ts-ignore
                {...register(id, { required })}
                placeholder=" "
                type={type}
                className={`
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
                `}
            ></input>
            <label
                className={`
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
            >
                {label}
                <span className="text-[#FF2222]">*</span>
            </label>
            <span>{icon}</span>
        </div>
    )
}

export default InputLogin