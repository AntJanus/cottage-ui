import type { ChangeEvent, ReactNode } from "react";

export enum INPUT_VARIANTS {
	DEFAULT = 'default',
	ERROR = 'error'
}

export enum INPUT_SIZES {
	DEFAULT = 'default',
	LARGE = 'large'
}

const InputVariantStyling: Record<INPUT_VARIANTS, string> = {
	[INPUT_VARIANTS.DEFAULT]: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
	[INPUT_VARIANTS.ERROR]: 'border-red-500 focus:ring-red-500 focus:border-red-500'
}

const InputSizeStyling: Record<INPUT_SIZES, string> = {
	[INPUT_SIZES.DEFAULT]: 'p-2',
	[INPUT_SIZES.LARGE]: 'text-lg p-3'
}

interface InputProps {
	id?: string;
	name?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
	variant?: INPUT_VARIANTS;
	size?: INPUT_SIZES;
	'aria-describedby'?: string;
	'aria-label'?: string;
}

export const Input = ({ id, name, value, onChange, placeholder, disabled = false, type = 'text', variant = INPUT_VARIANTS.DEFAULT, size = INPUT_SIZES.DEFAULT, ...ariaProps }: InputProps): ReactNode => {
	const className = `rounded border focus:outline-none focus:ring-2 ${InputVariantStyling[variant]} ${InputSizeStyling[size]}${disabled ? ' opacity-50' : ''}`

	return (
		<input
			id={id}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			aria-invalid={variant === INPUT_VARIANTS.ERROR || undefined}
			aria-describedby={ariaProps['aria-describedby']}
			aria-label={ariaProps['aria-label']}
			className={className}
		/>
	);
};
