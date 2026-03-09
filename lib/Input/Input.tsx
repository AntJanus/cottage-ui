import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

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

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
	variant?: INPUT_VARIANTS;
	size?: INPUT_SIZES;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ type = 'text', variant = INPUT_VARIANTS.DEFAULT, size = INPUT_SIZES.DEFAULT, disabled = false, className: customClassName, ...rest }, ref): ReactNode => {
		const className = `rounded border focus:outline-none focus:ring-2 ${InputVariantStyling[variant]} ${InputSizeStyling[size]}${disabled ? ' opacity-50' : ''}${customClassName ? ` ${customClassName}` : ''}`

		return (
			<input
				ref={ref}
				type={type}
				disabled={disabled}
				aria-invalid={variant === INPUT_VARIANTS.ERROR || undefined}
				className={className}
				{...rest}
			/>
		);
	}
);

Input.displayName = 'Input';
