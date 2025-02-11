// app/components/general/SubmitButtons.tsx

"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface GeneralSubmitButtonProps {
    text: string;
    variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
    width?: string;
    icon?: ReactNode;
    disabled?: boolean; // Added disabled prop
}

export function GeneralSubmitButton({
    text,
    variant,
    width,
    icon,
    disabled = false, // Added with default value
}: GeneralSubmitButtonProps) {
    const { pending } = useFormStatus();
    
    return (
        <Button 
            variant={variant} 
            className={width} 
            disabled={disabled || pending} // Combine with pending state
        >
            {pending ? (
                <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting...</span>
                </>
            ) : (
                <>
                    {icon && <div>{icon}</div>}
                    <span>{text}</span>
                </>
            )}
        </Button>
    );
}