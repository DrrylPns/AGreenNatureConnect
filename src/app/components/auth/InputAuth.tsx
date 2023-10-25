"use client"

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    // register: UseFormRegister<RegisterSchema> TODO Auth
    // errors: FieldErrors TODO Auth
}

const InputAuth: React.FC<InputProps> = ({
    id,
    label,
    type = "text", //input type on default is text (change if password, email, etc...)
    disabled,
    // register, TODO Auth
    required,
    // errors TODO Auth
}) => {
    return (
        <div className="w-full relative">
            {/* input error TODO Auth*/}
            <input
                id={id}
                disabled={disabled}
                // {...register(id, { required })} TODO Auth
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
            />
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
        </div>
    )
}

export default InputAuth