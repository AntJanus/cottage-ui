import type { ChangeEvent, ReactNode } from "react";

export enum TEXTAREA_VARIANTS {
	DEFAULT = 'default',
	ERROR = 'error'
}

const TextAreaVariantStyling: Record<TEXTAREA_VARIANTS, string> = {
	[TEXTAREA_VARIANTS.DEFAULT]: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
	[TEXTAREA_VARIANTS.ERROR]: 'border-red-500 focus:ring-red-500 focus:border-red-500'
}

interface TextAreaProps {
	id?: string;
	name?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	rows?: number;
	variant?: TEXTAREA_VARIANTS;
	'aria-describedby'?: string;
	'aria-label'?: string;
}

export const TextArea = ({ id, name, value, onChange, placeholder, disabled = false, rows = 3, variant = TEXTAREA_VARIANTS.DEFAULT, ...ariaProps }: TextAreaProps): ReactNode => {
	const className = `rounded border p-2 focus:outline-none focus:ring-2 ${TextAreaVariantStyling[variant]}${disabled ? ' opacity-50' : ''}`

	return (
		<textarea
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			rows={rows}
			aria-invalid={variant === TEXTAREA_VARIANTS.ERROR || undefined}
			aria-describedby={ariaProps['aria-describedby']}
			aria-label={ariaProps['aria-label']}
			className={className}
		/>
	);
};
