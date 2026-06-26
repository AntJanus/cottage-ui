import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";

export enum ALERT_VARIANTS {
	DEFAULT = 'default',
	INFO = 'info',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error'
}

const AlertVariantStyling: Record<ALERT_VARIANTS, string> = {
	[ALERT_VARIANTS.DEFAULT]: 'bg-info-soft border-info text-info-strong',
	[ALERT_VARIANTS.INFO]: 'bg-info-soft border-info text-info-strong',
	[ALERT_VARIANTS.SUCCESS]: 'bg-success-soft border-success text-success-strong',
	[ALERT_VARIANTS.WARNING]: 'bg-warning-soft border-warning text-warning-strong',
	[ALERT_VARIANTS.ERROR]: 'bg-error-soft border-error text-error-strong'
}

export interface AlertProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
	children: ReactNode;
	title?: string;
	onDismiss?: (e: MouseEvent<HTMLButtonElement>) => void;
	variant?: ALERT_VARIANTS;
}

export const Alert = ({ children, title, onDismiss, variant = ALERT_VARIANTS.DEFAULT, className: customClassName, ...rest }: AlertProps): ReactNode => {
	const className = `rounded p-4 border-l-4 ${AlertVariantStyling[variant]}${customClassName ? ` ${customClassName}` : ''}`

	return (
		<div role="alert" className={className} {...rest}>
			<div className="flex justify-between">
				<div>
					{title && <strong className="block font-bold">{title}</strong>}
					{children}
				</div>
				{onDismiss && (
					<button type="button" onClick={onDismiss} className="ml-4 font-bold" aria-label="Dismiss">
						<span aria-hidden="true">X</span>
					</button>
				)}
			</div>
		</div>
	);
};
