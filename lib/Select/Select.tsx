import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

export enum SELECT_VARIANTS {
	DEFAULT = 'default',
	ERROR = 'error'
}

const SelectVariantStyling: Record<SELECT_VARIANTS, string> = {
	[SELECT_VARIANTS.DEFAULT]: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
	[SELECT_VARIANTS.ERROR]: 'border-red-500 focus:ring-red-500 focus:border-red-500'
}

export interface SelectOption {
	label: string;
	value: string;
}

export interface SelectProps extends ComponentPropsWithoutRef<'select'> {
	options: SelectOption[];
	placeholder?: string;
	variant?: SELECT_VARIANTS;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ options, placeholder, variant = SELECT_VARIANTS.DEFAULT, disabled = false, className: customClassName, ...rest }, ref): ReactNode => {
		const className = `rounded border p-2 focus:outline-none focus:ring-2 ${SelectVariantStyling[variant]}${disabled ? ' opacity-50' : ''}${customClassName ? ` ${customClassName}` : ''}`

		return (
			<select
				ref={ref}
				disabled={disabled}
				aria-invalid={variant === SELECT_VARIANTS.ERROR || undefined}
				className={className}
				{...rest}
			>
				{placeholder && <option value="" disabled>{placeholder}</option>}
				{options.map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>
				))}
			</select>
		);
	}
);

Select.displayName = 'Select';
