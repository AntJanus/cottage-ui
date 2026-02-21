import type { ChangeEvent, ReactNode } from "react";

export enum SELECT_VARIANTS {
	DEFAULT = 'default',
	ERROR = 'error'
}

const SelectVariantStyling: Record<SELECT_VARIANTS, string> = {
	[SELECT_VARIANTS.DEFAULT]: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
	[SELECT_VARIANTS.ERROR]: 'border-red-500 focus:ring-red-500 focus:border-red-500'
}

interface SelectOption {
	label: string;
	value: string;
}

interface SelectProps {
	id?: string;
	name?: string;
	options: SelectOption[];
	value?: string;
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
	disabled?: boolean;
	placeholder?: string;
	variant?: SELECT_VARIANTS;
	'aria-describedby'?: string;
	'aria-label'?: string;
}

export const Select = ({ id, name, options, value, onChange, disabled = false, placeholder, variant = SELECT_VARIANTS.DEFAULT, ...ariaProps }: SelectProps): ReactNode => {
	const className = `rounded border p-2 focus:outline-none focus:ring-2 ${SelectVariantStyling[variant]}${disabled ? ' opacity-50' : ''}`

	return (
		<select
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
			aria-invalid={variant === SELECT_VARIANTS.ERROR || undefined}
			aria-describedby={ariaProps['aria-describedby']}
			aria-label={ariaProps['aria-label']}
			className={className}
		>
			{placeholder && <option value="" disabled>{placeholder}</option>}
			{options.map((option) => (
				<option key={option.value} value={option.value}>{option.label}</option>
			))}
		</select>
	);
};
