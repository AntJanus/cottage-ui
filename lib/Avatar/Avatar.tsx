import type { ReactNode } from "react";

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

interface AvatarProps {
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

export const Avatar = ({ src, alt, name, size = AVATAR_SIZES.DEFAULT }: AvatarProps): ReactNode => {
	const baseClassName = `rounded-full overflow-hidden flex items-center justify-center bg-orange-100 text-orange-800 font-medium ${AvatarSizeStyling[size]}`;

	if (src) {
		return (
			<div className={baseClassName}>
				<img src={src} alt={alt || name} className="h-full w-full object-cover" />
			</div>
		);
	}

	return (
		<div role="img" aria-label={name} className={baseClassName}>
			{getInitials(name)}
		</div>
	);
};
