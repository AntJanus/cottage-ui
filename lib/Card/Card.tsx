import type { ReactNode } from "react";

export enum CARD_VARIANTS {
	DEFAULT = 'default',
	OUTLINED = 'outlined',
	ELEVATED = 'elevated'
}

const CardVariantStyling: Record<CARD_VARIANTS, string> = {
	[CARD_VARIANTS.DEFAULT]: 'bg-white rounded shadow-sm',
	[CARD_VARIANTS.OUTLINED]: 'border border-gray-200 rounded',
	[CARD_VARIANTS.ELEVATED]: 'bg-white rounded shadow-lg'
}

interface CardProps {
	children: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	variant?: CARD_VARIANTS;
}

export const Card = ({ children, header, footer, variant = CARD_VARIANTS.DEFAULT }: CardProps): ReactNode => {
	const className = CardVariantStyling[variant]

	return (
		<article className={className}>
			{header && <header className="p-4 border-b border-gray-200">{header}</header>}
			<div className="p-4">{children}</div>
			{footer && <footer className="p-4 border-t border-gray-200">{footer}</footer>}
		</article>
	);
};
