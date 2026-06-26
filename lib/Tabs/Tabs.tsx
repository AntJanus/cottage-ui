import { useId, useRef, type ComponentPropsWithoutRef, type KeyboardEvent, type ReactNode } from "react";

export enum TAB_VARIANTS {
	DEFAULT = 'default',
	PILLS = 'pills'
}

export interface TabItem {
	label: string;
	content: ReactNode;
}

const TabVariantStyling: Record<TAB_VARIANTS, { tabList: string; activeTab: string; inactiveTab: string }> = {
	[TAB_VARIANTS.DEFAULT]: {
		tabList: 'flex border-b-2 border-border',
		activeTab: 'px-4 py-2 border-b-2 border-primary text-primary -mb-[2px]',
		inactiveTab: 'px-4 py-2 border-b-2 border-transparent text-muted-foreground -mb-[2px]'
	},
	[TAB_VARIANTS.PILLS]: {
		tabList: 'flex gap-2',
		activeTab: 'px-4 py-2 bg-primary-soft text-primary-strong rounded',
		inactiveTab: 'px-4 py-2 text-muted-foreground rounded'
	}
}

export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
	tabs: TabItem[];
	activeTab?: number;
	onTabChange?: (index: number) => void;
	variant?: TAB_VARIANTS;
	'aria-label'?: string;
}

export const Tabs = ({ tabs, activeTab: activeTabProp = 0, onTabChange, variant = TAB_VARIANTS.DEFAULT, 'aria-label': ariaLabel, className: customClassName, ...rest }: TabsProps): ReactNode => {
	const styles = TabVariantStyling[variant]
	const baseId = useId()
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

	if (tabs.length === 0) return null;

	// Clamp activeTab to valid range to prevent crashes from out-of-range values
	const activeTab = Math.max(0, Math.min(activeTabProp, tabs.length - 1));

	const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		let nextIndex: number | null = null

		if (e.key === 'ArrowRight') {
			nextIndex = (activeTab + 1) % tabs.length
		} else if (e.key === 'ArrowLeft') {
			nextIndex = (activeTab - 1 + tabs.length) % tabs.length
		} else if (e.key === 'Home') {
			nextIndex = 0
		} else if (e.key === 'End') {
			nextIndex = tabs.length - 1
		}

		if (nextIndex !== null) {
			e.preventDefault()
			onTabChange?.(nextIndex)
			tabRefs.current[nextIndex]?.focus()
		}
	}

	return (
		<div className={customClassName} {...rest}>
			<div role="tablist" aria-orientation="horizontal" aria-label={ariaLabel || 'Tabs'} className={styles.tabList}>
				{tabs.map((tab, index) => (
					<button
						type="button"
						key={index}
						ref={(el) => { tabRefs.current[index] = el }}
						id={`${baseId}-tab-${index}`}
						role="tab"
						aria-selected={index === activeTab}
						aria-controls={`${baseId}-panel-${index}`}
						tabIndex={index === activeTab ? 0 : -1}
						className={index === activeTab ? styles.activeTab : styles.inactiveTab}
						onClick={() => onTabChange?.(index)}
						onKeyDown={handleKeyDown}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div
				id={`${baseId}-panel-${activeTab}`}
				role="tabpanel"
				aria-labelledby={`${baseId}-tab-${activeTab}`}
				tabIndex={0}
				className="p-4"
			>
				{tabs[activeTab]?.content}
			</div>
		</div>
	);
};
