import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

export enum CHECKBOX_VARIANTS {
	DEFAULT = 'default'
}

const CheckboxVariantStyling: Record<CHECKBOX_VARIANTS, string> = {
	[CHECKBOX_VARIANTS.DEFAULT]: 'accent-orange-600'
}

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
	label?: string;
	variant?: CHECKBOX_VARIANTS;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, variant = CHECKBOX_VARIANTS.DEFAULT, disabled = false, className: customClassName, ...rest }, ref): ReactNode => {
		const wrapperClassName = `flex items-center gap-2${disabled ? ' opacity-50' : ''}`
		const inputClassName = `${CheckboxVariantStyling[variant]}${customClassName ? ` ${customClassName}` : ''}`

		return (
			<label className={wrapperClassName}>
				<input
					ref={ref}
					type="checkbox"
					disabled={disabled}
					className={inputClassName}
					{...rest}
				/>
				{label && <span className="text-gray-700">{label}</span>}
			</label>
		);
	}
);

Checkbox.displayName = 'Checkbox';
