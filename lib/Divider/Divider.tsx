import type { ComponentPropsWithoutRef, ReactNode } from "react";

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

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
	orientation?: DIVIDER_ORIENTATIONS;
}

export const Divider = ({ orientation = DIVIDER_ORIENTATIONS.DEFAULT, className: customClassName, ...rest }: DividerProps): ReactNode => {
	const className = `${DividerOrientationStyling[orientation]}${customClassName ? ` ${customClassName}` : ''}`;

	if (orientation === DIVIDER_ORIENTATIONS.VERTICAL) {
		return <div role="separator" aria-orientation="vertical" className={className} {...rest} />;
	}

	return <hr className={className} {...rest} />;
};
