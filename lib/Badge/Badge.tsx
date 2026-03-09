import type { ComponentPropsWithoutRef, ReactNode } from "react";

export enum BADGE_VARIANTS {
	DEFAULT = 'default',
	PRIMARY = 'primary',
	SUCCESS = 'success',
	WARNING = 'warning',
	DANGER = 'danger'
}

const BadgeVariantStyling: Record<BADGE_VARIANTS, string> = {
	[BADGE_VARIANTS.DEFAULT]: 'bg-gray-100 text-gray-800',
	[BADGE_VARIANTS.PRIMARY]: 'bg-orange-100 text-orange-800',
	[BADGE_VARIANTS.SUCCESS]: 'bg-green-100 text-green-800',
	[BADGE_VARIANTS.WARNING]: 'bg-yellow-100 text-yellow-800',
	[BADGE_VARIANTS.DANGER]: 'bg-red-100 text-red-800'
}

export interface BadgeProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
	children: ReactNode;
	variant?: BADGE_VARIANTS;
}

export const Badge = ({ children, variant = BADGE_VARIANTS.DEFAULT, className: customClassName, ...rest }: BadgeProps): ReactNode => {
	const className = `inline-block rounded-full px-3 py-1 text-sm font-medium ${BadgeVariantStyling[variant]}${customClassName ? ` ${customClassName}` : ''}`

	return <span role="status" className={className} {...rest}>{children}</span>;
};
