'use client'

import { IconType } from "react-icons";

interface ButtonAuthProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const ButtonAuth: React.FC<ButtonAuthProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-md
                hover:opacity-80
                transition
                w-full
                ${outline ? 'bg-white' : 'bg-[#4DE69E]'}
                ${outline ? 'border-zinc-200' : 'bg-[#4DE69E]'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
      `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
                        absolute
                        left-4
                        top-3
                    "
                />
            )}
            {label}
        </button>
    )
}

export default ButtonAuth