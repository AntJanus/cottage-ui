import type { MouseEvent, ReactNode } from "react";

export enum ALERT_VARIANTS {
	DEFAULT = 'default',
	INFO = 'info',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error'
}

const AlertVariantStyling: Record<ALERT_VARIANTS, string> = {
	[ALERT_VARIANTS.DEFAULT]: 'bg-blue-50 border-blue-500 text-blue-800',
	[ALERT_VARIANTS.INFO]: 'bg-blue-50 border-blue-500 text-blue-800',
	[ALERT_VARIANTS.SUCCESS]: 'bg-green-50 border-green-500 text-green-800',
	[ALERT_VARIANTS.WARNING]: 'bg-yellow-50 border-yellow-500 text-yellow-800',
	[ALERT_VARIANTS.ERROR]: 'bg-red-50 border-red-500 text-red-800'
}

interface AlertProps {
	children: ReactNode;
	title?: string;
	onDismiss?: (e: MouseEvent<HTMLButtonElement>) => void;
	variant?: ALERT_VARIANTS;
}

export const Alert = ({ children, title, onDismiss, variant = ALERT_VARIANTS.DEFAULT }: AlertProps): ReactNode => {
	const className = `rounded p-4 border-l-4 ${AlertVariantStyling[variant]}`

	return (
		<div role="alert" className={className}>
			<div className="flex justify-between">
				<div>
					{title && <strong className="block font-bold">{title}</strong>}
					{children}
				</div>
				{onDismiss && (
					<button onClick={onDismiss} className="ml-4 font-bold" aria-label="Dismiss">
						<span aria-hidden="true">X</span>
					</button>
				)}
			</div>
		</div>
	);
};
