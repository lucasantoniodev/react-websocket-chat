import { UseFormReturn } from "react-hook-form";

interface InputProps {
    formControlName: string;
    placeholder?: string;
    required?: boolean;
    messageError?: string;
    autoComplete?: boolean;
    customValidate?: () => boolean
    form: UseFormReturn;
}

export const AppInput = (props: InputProps) => {
    return (
        <div className="form-input">
            <input
                placeholder={props.placeholder}
                autoComplete={props.autoComplete ? "on" : "off"}
                {...props.form.register(props.formControlName, { required: props?.required, validate: props?.customValidate },)}
            />
            {props.form.formState.errors.formControlName && <span>{props?.messageError}</span>}
        </div>

    );
}