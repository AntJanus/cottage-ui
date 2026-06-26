import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

export enum SELECT_VARIANTS {
	DEFAULT = 'default',
	ERROR = 'error'
}

const SelectVariantStyling: Record<SELECT_VARIANTS, string> = {
	[SELECT_VARIANTS.DEFAULT]: 'border-border-strong focus:ring-primary focus:border-primary',
	[SELECT_VARIANTS.ERROR]: 'border-error focus:ring-error focus:border-error'
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
