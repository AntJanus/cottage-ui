import type { ChangeEvent, ReactNode } from "react";

export enum CHECKBOX_VARIANTS {
	DEFAULT = 'default'
}

const CheckboxVariantStyling: Record<CHECKBOX_VARIANTS, string> = {
	[CHECKBOX_VARIANTS.DEFAULT]: 'accent-orange-600'
}

interface CheckboxProps {
	id?: string;
	name?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	label?: string;
	variant?: CHECKBOX_VARIANTS;
	'aria-describedby'?: string;
}

export const Checkbox = ({ id, name, checked, defaultChecked, onChange, disabled = false, label, variant = CHECKBOX_VARIANTS.DEFAULT, ...ariaProps }: CheckboxProps): ReactNode => {
	const wrapperClassName = `flex items-center gap-2${disabled ? ' opacity-50' : ''}`
	const inputClassName = CheckboxVariantStyling[variant]

	return (
		<label className={wrapperClassName}>
			<input
				id={id}
				name={name}
				type="checkbox"
				checked={checked}
				defaultChecked={defaultChecked}
				onChange={onChange}
				disabled={disabled}
				aria-describedby={ariaProps['aria-describedby']}
				className={inputClassName}
			/>
			{label && <span className="text-gray-700">{label}</span>}
		</label>
	);
};
