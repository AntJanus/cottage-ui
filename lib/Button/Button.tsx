import type { MouseEvent, ReactNode } from "react";

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

interface ButtonProps {
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	variant?: BUTTON_VARIANTS;
	size?: BUTTON_SIZES;
}

export const Button = ({ children, onClick, variant = BUTTON_VARIANTS.DEFAULT, size = BUTTON_SIZES.DEFAULT }: ButtonProps): ReactNode => {
	const className = `rounded p-2 ${ButtonVariantStyling[variant]} ${ButtonSizeStyling[size]}`

	return <button onClick={onClick} className={className}>{children}</button>;
};