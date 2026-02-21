import type { ReactNode } from "react";

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

interface SpinnerProps {
	size?: SPINNER_SIZES;
	label?: string;
}

export const Spinner = ({ size = SPINNER_SIZES.DEFAULT, label = 'Loading' }: SpinnerProps): ReactNode => {
	const className = `rounded-full border-2 border-gray-200 border-t-orange-600 animate-spin ${SpinnerSizeStyling[size]}`;

	return (
		<div role="status" aria-label={label}>
			<div className={className} />
		</div>
	);
};
