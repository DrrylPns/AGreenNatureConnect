"use client"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const usePasswordToggle = () => {
    const [visible, isVisible] = useState(false);

    const Icon = (
        <div onClick={() => isVisible(visibility => !visibility)}>
            {visible && (
                <Eye />
            )}
            {!visible && (
                <EyeOff />
            )}
        </div>
    );

    const InputType = visible ? "text" : "password"

    return [InputType, Icon]
}

export default usePasswordToggle