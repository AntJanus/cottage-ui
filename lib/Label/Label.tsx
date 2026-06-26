import type { ComponentPropsWithoutRef, ReactNode } from "react";

export enum LABEL_VARIANTS {
	REQUIRED = 'required',
	DEFAULT = 'default'
}

const LabelVariantStyling: Record<LABEL_VARIANTS, string> = {
	[LABEL_VARIANTS.DEFAULT]: 'text-foreground font-medium text-sm',
	[LABEL_VARIANTS.REQUIRED]: 'text-foreground font-semibold text-sm'
}

export interface LabelProps extends Omit<ComponentPropsWithoutRef<'label'>, 'children'> {
	children: ReactNode;
	variant?: LABEL_VARIANTS;
}

export const Label = ({ children, variant = LABEL_VARIANTS.DEFAULT, className: customClassName, ...rest }: LabelProps): ReactNode => {
	const className = `${LabelVariantStyling[variant]}${customClassName ? ` ${customClassName}` : ''}`

	return (
		<label className={className} {...rest}>
			{children}
			{variant === LABEL_VARIANTS.REQUIRED && <span className="text-error ml-1" aria-hidden="true">*</span>}
			{variant === LABEL_VARIANTS.REQUIRED && <span className="sr-only">(required)</span>}
		</label>
	);
};
