import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

export enum TEXTAREA_VARIANTS {
	DEFAULT = 'default',
	ERROR = 'error'
}

const TextAreaVariantStyling: Record<TEXTAREA_VARIANTS, string> = {
	[TEXTAREA_VARIANTS.DEFAULT]: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
	[TEXTAREA_VARIANTS.ERROR]: 'border-red-500 focus:ring-red-500 focus:border-red-500'
}

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
	variant?: TEXTAREA_VARIANTS;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ rows = 3, variant = TEXTAREA_VARIANTS.DEFAULT, disabled = false, className: customClassName, ...rest }, ref): ReactNode => {
		const className = `rounded border p-2 focus:outline-none focus:ring-2 ${TextAreaVariantStyling[variant]}${disabled ? ' opacity-50' : ''}${customClassName ? ` ${customClassName}` : ''}`

		return (
			<textarea
				ref={ref}
				rows={rows}
				disabled={disabled}
				aria-invalid={variant === TEXTAREA_VARIANTS.ERROR || undefined}
				className={className}
				{...rest}
			/>
		);
	}
);

TextArea.displayName = 'TextArea';
