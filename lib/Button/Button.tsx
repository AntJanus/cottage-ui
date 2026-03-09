import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

export enum BUTTON_VARIANTS {
	PRIMARY = 'primary',
	DEFAULT = 'default'
}

export enum BUTTON_SIZES {
	LARGE = 'large',
	DEFAULT = 'default'
}

const ButtonVariantStyling: Record<BUTTON_VARIANTS, string> = {
	[BUTTON_VARIANTS.PRIMARY]: 'bg-orange-700 hover:bg-orange-500 text-white',
	[BUTTON_VARIANTS.DEFAULT]: 'bg-gray-700 hover:bg-gray-800 text-white'
}

const ButtonSizeStyling: Record<BUTTON_SIZES, string> = {
	[BUTTON_SIZES.DEFAULT]: '',
	[BUTTON_SIZES.LARGE]: 'text-lg'
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	children: ReactNode;
	variant?: BUTTON_VARIANTS;
	size?: BUTTON_SIZES;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = BUTTON_VARIANTS.DEFAULT, size = BUTTON_SIZES.DEFAULT, type = 'button', className: customClassName, ...rest }, ref): ReactNode => {
		const className = `rounded p-2 ${ButtonVariantStyling[variant]} ${ButtonSizeStyling[size]}${customClassName ? ` ${customClassName}` : ''}`

		return <button ref={ref} type={type} className={className} {...rest}>{children}</button>;
	}
);

Button.displayName = 'Button';
