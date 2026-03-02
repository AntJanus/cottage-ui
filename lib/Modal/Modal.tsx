import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export enum MODAL_SIZES {
	SMALL = 'small',
	LARGE = 'large',
	DEFAULT = 'default'
}

const ModalSizeStyling: Record<MODAL_SIZES, string> = {
	[MODAL_SIZES.SMALL]: 'max-w-sm',
	[MODAL_SIZES.DEFAULT]: 'max-w-md',
	[MODAL_SIZES.LARGE]: 'max-w-2xl'
}

interface ModalProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	size?: MODAL_SIZES;
	'aria-label'?: string;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Modal = ({ children, isOpen, onClose, title, size = MODAL_SIZES.DEFAULT, ...ariaProps }: ModalProps): ReactNode => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const previouslyFocusedRef = useRef<HTMLElement | null>(null);
	const titleId = useId();

	useEffect(() => {
		if (!isOpen) return;

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					onClose();
					return;
				}

			if (e.key === 'Tab' && dialogRef.current) {
				const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
				if (focusable.length === 0) return;

				const first = focusable[0];
				const last = focusable[focusable.length - 1];

				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		previouslyFocusedRef.current = document.activeElement as HTMLElement;
		document.addEventListener('keydown', handleKeyDown);

		requestAnimationFrame(() => {
			if (!dialogRef.current) return;
			const firstFocusable = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
			if (firstFocusable) {
				firstFocusable.focus();
			} else {
				dialogRef.current.focus();
			}
		});

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			previouslyFocusedRef.current?.focus();
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const contentClassName = `bg-white rounded-lg shadow-xl w-full ${ModalSizeStyling[size]} p-6 relative`;

	return createPortal(
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={title ? titleId : undefined}
				aria-label={title ? undefined : ariaProps['aria-label'] || 'Modal dialog'}
				tabIndex={-1}
				className={contentClassName}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between mb-4">
					{title && <h2 id={titleId} className="text-lg font-semibold">{title}</h2>}
					<button type="button" onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600" aria-label="Close">
						<span aria-hidden="true">&#x2715;</span>
					</button>
				</div>
				{children}
			</div>
		</div>,
		document.body
	);
};
