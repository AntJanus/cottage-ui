import { fireEvent, render, screen } from "@testing-library/react";
import { Tabs, TAB_VARIANTS } from "./Tabs";

const sampleTabs = [
	{ label: 'Tab 1', content: 'Content 1' },
	{ label: 'Tab 2', content: 'Content 2' },
	{ label: 'Tab 3', content: 'Content 3' }
]

describe("Component: Tabs", () => {
	it("should render default", () => {
		render(<Tabs tabs={sampleTabs} />);
		const tablist = screen.getByRole('tablist')
		expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
		expect(screen.getAllByRole('tab')).toHaveLength(3)
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
});
