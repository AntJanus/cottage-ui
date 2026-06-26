import type { ComponentPropsWithoutRef, ReactNode } from "react";

export enum AVATAR_SIZES {
	SMALL = 'small',
	LARGE = 'large',
	DEFAULT = 'default'
}

const AvatarSizeStyling: Record<AVATAR_SIZES, string> = {
	[AVATAR_SIZES.SMALL]: 'h-8 w-8 text-xs',
	[AVATAR_SIZES.DEFAULT]: 'h-10 w-10 text-sm',
	[AVATAR_SIZES.LARGE]: 'h-14 w-14 text-lg'
}

export interface AvatarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
	src?: string;
	alt?: string;
	name: string;
	size?: AVATAR_SIZES;
}

const getInitials = (name: string): string => {
	const trimmed = name.trim();
	if (!trimmed) return '?';
	const parts = trimmed.split(/\s+/);
	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
	}
	return parts[0][0].toUpperCase();
};

export const Avatar = ({ src, alt, name, size = AVATAR_SIZES.DEFAULT, className: customClassName, ...rest }: AvatarProps): ReactNode => {
	const baseClassName = `rounded-full overflow-hidden flex items-center justify-center bg-primary-soft text-primary-strong font-medium ${AvatarSizeStyling[size]}${customClassName ? ` ${customClassName}` : ''}`;

	if (src) {
		return (
			<div className={baseClassName} {...rest}>
				<img src={src} alt={alt || name} className="h-full w-full object-cover" />
			</div>
		);
	}

	return (
		<div role="img" aria-label={name} className={baseClassName} {...rest}>
			{getInitials(name)}
		</div>
	);
};
