import type { ComponentPropsWithoutRef, ReactNode } from "react";

export enum SPINNER_SIZES {
	SMALL = 'small',
	LARGE = 'large',
	DEFAULT = 'default'
}

const SpinnerSizeStyling: Record<SPINNER_SIZES, string> = {
	[SPINNER_SIZES.SMALL]: 'h-4 w-4',
	[SPINNER_SIZES.DEFAULT]: 'h-8 w-8',
	[SPINNER_SIZES.LARGE]: 'h-12 w-12'
}

export interface SpinnerProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
	size?: SPINNER_SIZES;
	label?: string;
}

export const Spinner = ({ size = SPINNER_SIZES.DEFAULT, label = 'Loading', className: customClassName, ...rest }: SpinnerProps): ReactNode => {
	const spinnerClassName = `rounded-full border-2 border-border border-t-primary animate-spin ${SpinnerSizeStyling[size]}`;

	return (
		<div role="status" aria-label={label} className={customClassName} {...rest}>
			<div className={spinnerClassName} />
		</div>
	);
};
