import type { ComponentPropsWithoutRef, ReactNode } from "react";

export enum BADGE_VARIANTS {
	DEFAULT = 'default',
	PRIMARY = 'primary',
	SUCCESS = 'success',
	WARNING = 'warning',
	DANGER = 'danger'
}

const BadgeVariantStyling: Record<BADGE_VARIANTS, string> = {
	[BADGE_VARIANTS.DEFAULT]: 'bg-neutral-soft text-neutral-strong',
	[BADGE_VARIANTS.PRIMARY]: 'bg-primary-soft text-primary-strong',
	[BADGE_VARIANTS.SUCCESS]: 'bg-success-soft text-success-strong',
	[BADGE_VARIANTS.WARNING]: 'bg-warning-soft text-warning-strong',
	[BADGE_VARIANTS.DANGER]: 'bg-error-soft text-error-strong'
}

export interface BadgeProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
	children: ReactNode;
	variant?: BADGE_VARIANTS;
}

export const Badge = ({ children, variant = BADGE_VARIANTS.DEFAULT, className: customClassName, ...rest }: BadgeProps): ReactNode => {
	const className = `inline-block rounded-full px-3 py-1 text-sm font-medium ${BadgeVariantStyling[variant]}${customClassName ? ` ${customClassName}` : ''}`

	return <span role="status" className={className} {...rest}>{children}</span>;
};
