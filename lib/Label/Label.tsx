import type { ReactNode } from "react";

export enum LABEL_VARIANTS {
	REQUIRED = 'required',
	DEFAULT = 'default'
}

const LabelVariantStyling: Record<LABEL_VARIANTS, string> = {
	[LABEL_VARIANTS.DEFAULT]: 'text-gray-700 font-medium text-sm',
	[LABEL_VARIANTS.REQUIRED]: 'text-gray-800 font-semibold text-sm'
}

interface LabelProps {
	children: ReactNode;
	htmlFor?: string;
	variant?: LABEL_VARIANTS;
}

export const Label = ({ children, htmlFor, variant = LABEL_VARIANTS.DEFAULT }: LabelProps): ReactNode => {
	const className = LabelVariantStyling[variant]

	return (
		<label htmlFor={htmlFor} className={className}>
			{children}
			{variant === LABEL_VARIANTS.REQUIRED && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
			{variant === LABEL_VARIANTS.REQUIRED && <span className="sr-only">(required)</span>}
		</label>
	);
};
