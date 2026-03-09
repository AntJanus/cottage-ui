import type { ComponentPropsWithoutRef, ReactNode } from "react";

export enum STACK_DIRECTIONS {
	DEFAULT = 'default',
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical'
}

export enum STACK_GAPS {
	SMALL = 'small',
	DEFAULT = 'default',
	LARGE = 'large'
}

const StackDirectionStyling: Record<STACK_DIRECTIONS, string> = {
	[STACK_DIRECTIONS.DEFAULT]: 'flex flex-col',
	[STACK_DIRECTIONS.HORIZONTAL]: 'flex flex-row',
	[STACK_DIRECTIONS.VERTICAL]: 'flex flex-col'
}

const StackGapStyling: Record<STACK_GAPS, string> = {
	[STACK_GAPS.SMALL]: 'gap-1',
	[STACK_GAPS.DEFAULT]: 'gap-3',
	[STACK_GAPS.LARGE]: 'gap-6'
}

export interface StackProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
	children: ReactNode;
	direction?: STACK_DIRECTIONS;
	gap?: STACK_GAPS;
}

export const Stack = ({ children, direction = STACK_DIRECTIONS.DEFAULT, gap = STACK_GAPS.DEFAULT, className: customClassName, ...rest }: StackProps): ReactNode => {
	const className = `${StackDirectionStyling[direction]} ${StackGapStyling[gap]}${customClassName ? ` ${customClassName}` : ''}`

	return <div className={className} {...rest}>{children}</div>;
};
