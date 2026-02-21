import type { ReactNode } from "react";

export enum DIVIDER_ORIENTATIONS {
	DEFAULT = 'default',
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical'
}

const DividerOrientationStyling: Record<DIVIDER_ORIENTATIONS, string> = {
	[DIVIDER_ORIENTATIONS.DEFAULT]: 'border-t border-gray-200 my-4',
	[DIVIDER_ORIENTATIONS.HORIZONTAL]: 'border-t border-gray-200 my-4',
	[DIVIDER_ORIENTATIONS.VERTICAL]: 'border-l border-gray-200 mx-4 self-stretch'
}

interface DividerProps {
	orientation?: DIVIDER_ORIENTATIONS;
}

export const Divider = ({ orientation = DIVIDER_ORIENTATIONS.DEFAULT }: DividerProps): ReactNode => {
	const className = DividerOrientationStyling[orientation];

	if (orientation === DIVIDER_ORIENTATIONS.VERTICAL) {
		return <div role="separator" aria-orientation="vertical" className={className} />;
	}

	return <hr className={className} />;
};
