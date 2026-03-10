import { fireEvent, render, screen } from "@testing-library/react";
import { Tabs, TAB_VARIANTS } from "./Tabs";

const sampleTabs = [
	{ label: 'Tab 1', content: 'Content 1' },
	{ label: 'Tab 2', content: 'Content 2' },
	{ label: 'Tab 3', content: 'Content 3' }
]

describe("Component: Tabs", () => {
	it("should return null for empty tabs array", () => {
		const { container } = render(<Tabs tabs={[]} />);
		expect(container.firstChild).toBeNull()
	});

	it("should render default", () => {
		render(<Tabs tabs={sampleTabs} />);
		const tablist = screen.getByRole('tablist')
		expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
		expect(tablist).toHaveAttribute('aria-label', 'Tabs')
		expect(screen.getAllByRole('tab')).toHaveLength(3)
	});

	it("should set custom aria-label on tablist", () => {
		render(<Tabs tabs={sampleTabs} aria-label="Settings sections" />);
		const tablist = screen.getByRole('tablist')
		expect(tablist).toHaveAttribute('aria-label', 'Settings sections')
	});

	it("should render pills variant", () => {
		render(<Tabs tabs={sampleTabs} variant={TAB_VARIANTS.PILLS} />);
		const tabs = screen.getAllByRole('tab')
		expect(tabs[0].className).toContain('rounded')
	});

	it("should render tabpanel with active content", () => {
		render(<Tabs tabs={sampleTabs} activeTab={1} />);
		const panel = screen.getByRole('tabpanel')
		expect(panel).toHaveTextContent('Content 2')
	});

	it("should set aria-selected on active tab", () => {
		render(<Tabs tabs={sampleTabs} activeTab={0} />);
		const tabs = screen.getAllByRole('tab')
		expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
		expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
		expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
	});

	it("should set tabIndex correctly", () => {
		render(<Tabs tabs={sampleTabs} activeTab={1} />);
		const tabs = screen.getAllByRole('tab')
		expect(tabs[0]).toHaveAttribute('tabindex', '-1')
		expect(tabs[1]).toHaveAttribute('tabindex', '0')
		expect(tabs[2]).toHaveAttribute('tabindex', '-1')
	});

	it("should link tab to panel via aria-controls", () => {
		render(<Tabs tabs={sampleTabs} activeTab={0} />);
		const tabs = screen.getAllByRole('tab')
		const panel = screen.getByRole('tabpanel')
		expect(tabs[0]).toHaveAttribute('aria-controls', panel.id)
	});

	it("should link panel to tab via aria-labelledby", () => {
		render(<Tabs tabs={sampleTabs} activeTab={0} />);
		const tabs = screen.getAllByRole('tab')
		const panel = screen.getByRole('tabpanel')
		expect(panel).toHaveAttribute('aria-labelledby', tabs[0].id)
	});

	it("should have focusable tabpanel", () => {
		render(<Tabs tabs={sampleTabs} />);
		const panel = screen.getByRole('tabpanel')
		expect(panel).toHaveAttribute('tabindex', '0')
	});

	it("should call onTabChange when tab is clicked", () => {
		const mock = vi.fn()
		render(<Tabs tabs={sampleTabs} onTabChange={mock} />);
		const tabs = screen.getAllByRole('tab')
		tabs[1].click()
		expect(mock).toHaveBeenCalledOnce()
		expect(mock).toHaveBeenCalledWith(1)
	});

	it("should navigate with ArrowRight key", () => {
		const mock = vi.fn()
		render(<Tabs tabs={sampleTabs} activeTab={0} onTabChange={mock} />);
		const tabs = screen.getAllByRole('tab')
		fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })
		expect(mock).toHaveBeenCalledWith(1)
	});

	it("should navigate with ArrowLeft key", () => {
		const mock = vi.fn()
		render(<Tabs tabs={sampleTabs} activeTab={1} onTabChange={mock} />);
		const tabs = screen.getAllByRole('tab')
		fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' })
		expect(mock).toHaveBeenCalledWith(0)
	});

	it("should wrap around with ArrowRight on last tab", () => {
		const mock = vi.fn()
		render(<Tabs tabs={sampleTabs} activeTab={2} onTabChange={mock} />);
		const tabs = screen.getAllByRole('tab')
		fireEvent.keyDown(tabs[2], { key: 'ArrowRight' })
		expect(mock).toHaveBeenCalledWith(0)
	});

	it("should wrap around with ArrowLeft on first tab", () => {
		const mock = vi.fn()
		render(<Tabs tabs={sampleTabs} activeTab={0} onTabChange={mock} />);
		const tabs = screen.getAllByRole('tab')
		fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' })
		expect(mock).toHaveBeenCalledWith(2)
	});

	it("should navigate to first tab with Home key", () => {
		const mock = vi.fn()
		render(<Tabs tabs={sampleTabs} activeTab={2} onTabChange={mock} />);
		const tabs = screen.getAllByRole('tab')
		fireEvent.keyDown(tabs[2], { key: 'Home' })
		expect(mock).toHaveBeenCalledWith(0)
	});

	it("should navigate to last tab with End key", () => {
		const mock = vi.fn()
		render(<Tabs tabs={sampleTabs} activeTab={0} onTabChange={mock} />);
		const tabs = screen.getAllByRole('tab')
		fireEvent.keyDown(tabs[0], { key: 'End' })
		expect(mock).toHaveBeenCalledWith(2)
	});

	describe("accessibility", () => {
		it("should have tablist with horizontal orientation", () => {
			render(<Tabs tabs={sampleTabs} />);
			const tablist = screen.getByRole('tablist')
			expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
		});

		it("should have default aria-label on tablist", () => {
			render(<Tabs tabs={sampleTabs} />);
			const tablist = screen.getByRole('tablist')
			expect(tablist).toHaveAttribute('aria-label', 'Tabs')
		});

		it("should support custom aria-label on tablist", () => {
			render(<Tabs tabs={sampleTabs} aria-label="Navigation sections" />);
			const tablist = screen.getByRole('tablist')
			expect(tablist).toHaveAttribute('aria-label', 'Navigation sections')
		});

		it("should use roving tabindex (0 for active, -1 for inactive)", () => {
			render(<Tabs tabs={sampleTabs} activeTab={1} />);
			const tabs = screen.getAllByRole('tab')
			expect(tabs[0]).toHaveAttribute('tabindex', '-1')
			expect(tabs[1]).toHaveAttribute('tabindex', '0')
			expect(tabs[2]).toHaveAttribute('tabindex', '-1')
		});

		it("should link each tab to its panel via aria-controls", () => {
			render(<Tabs tabs={sampleTabs} activeTab={0} />);
			const tabs = screen.getAllByRole('tab')
			const panel = screen.getByRole('tabpanel')
			expect(tabs[0]).toHaveAttribute('aria-controls', panel.id)
		});

		it("should link panel back to tab via aria-labelledby", () => {
			render(<Tabs tabs={sampleTabs} activeTab={0} />);
			const tabs = screen.getAllByRole('tab')
			const panel = screen.getByRole('tabpanel')
			expect(panel).toHaveAttribute('aria-labelledby', tabs[0].id)
		});

		it("should make tabpanel focusable for keyboard navigation", () => {
			render(<Tabs tabs={sampleTabs} />);
			const panel = screen.getByRole('tabpanel')
			expect(panel).toHaveAttribute('tabindex', '0')
		});

		it("should set aria-selected true only on active tab", () => {
			render(<Tabs tabs={sampleTabs} activeTab={2} />);
			const tabs = screen.getAllByRole('tab')
			expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
			expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
			expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
		});

		it("should clamp out-of-range activeTab to valid range", () => {
			render(<Tabs tabs={sampleTabs} activeTab={99} />);
			const tabs = screen.getAllByRole('tab')
			// Should clamp to last tab (index 2)
			expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 3')
		});

		it("should clamp negative activeTab to zero", () => {
			render(<Tabs tabs={sampleTabs} activeTab={-5} />);
			const tabs = screen.getAllByRole('tab')
			expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
			expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1')
		});
	});
});
