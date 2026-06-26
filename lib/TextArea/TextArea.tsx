import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

export enum TEXTAREA_VARIANTS {
	DEFAULT = 'default',
	ERROR = 'error'
}

const TextAreaVariantStyling: Record<TEXTAREA_VARIANTS, string> = {
	[TEXTAREA_VARIANTS.DEFAULT]: 'border-border-strong focus:ring-primary focus:border-primary',
	[TEXTAREA_VARIANTS.ERROR]: 'border-error focus:ring-error focus:border-error'
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
