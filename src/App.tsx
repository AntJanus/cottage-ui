import { useState } from "react";
import {
	Button, BUTTON_VARIANTS, BUTTON_SIZES,
	Input, INPUT_VARIANTS, INPUT_SIZES,
	TextArea, TEXTAREA_VARIANTS,
	Label, LABEL_VARIANTS,
	Select, SELECT_VARIANTS,
	Checkbox,
	Card, CARD_VARIANTS,
	Stack, STACK_DIRECTIONS, STACK_GAPS,
	Divider, DIVIDER_ORIENTATIONS,
	Badge, BADGE_VARIANTS,
	Alert, ALERT_VARIANTS,
	Spinner, SPINNER_SIZES,
	Modal, MODAL_SIZES,
	Tabs, TAB_VARIANTS,
	Avatar, AVATAR_SIZES,
} from "cottage-ui";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [errorInputValue, setErrorInputValue] = useState("");
	const [textAreaValue, setTextAreaValue] = useState("");
	const [selectValue, setSelectValue] = useState("");
	const [errorSelectValue, setErrorSelectValue] = useState("");
	const [checked, setChecked] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [smallModalOpen, setSmallModalOpen] = useState(false);
	const [largeModalOpen, setLargeModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState(0);
	const [pillsTab, setPillsTab] = useState(0);
	const [showAlert, setShowAlert] = useState(true);

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Cottage UI</h1>

				{/* Button */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Button</h2>
					<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.DEFAULT}>
						<Button>Default</Button>
						<Button variant={BUTTON_VARIANTS.PRIMARY}>Primary</Button>
						<Button size={BUTTON_SIZES.LARGE}>Large</Button>
						<Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.LARGE}>Large Primary</Button>
					</Stack>
				</section>

				<Divider />

				{/* Input */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Input</h2>
					<Stack gap={STACK_GAPS.DEFAULT}>
						<div>
							<Label htmlFor="default-input">Name</Label>
							<Input
								id="default-input"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder="Enter your name"
							/>
						</div>
						<div>
							<Label htmlFor="large-input">Large Input</Label>
							<Input id="large-input" placeholder="Large input" size={INPUT_SIZES.LARGE} />
						</div>
						<div>
							<Label htmlFor="error-input">Error State</Label>
							<Input
								id="error-input"
								value={errorInputValue}
								onChange={(e) => setErrorInputValue(e.target.value)}
								placeholder="Something went wrong"
								variant={INPUT_VARIANTS.ERROR}
							/>
						</div>
						<div>
							<Label htmlFor="disabled-input">Disabled</Label>
							<Input id="disabled-input" placeholder="Cannot edit" disabled />
						</div>
					</Stack>
				</section>

				<Divider />

				{/* TextArea */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">TextArea</h2>
					<Stack gap={STACK_GAPS.DEFAULT}>
						<div>
							<Label htmlFor="default-textarea">Message</Label>
							<TextArea
								id="default-textarea"
								value={textAreaValue}
								onChange={(e) => setTextAreaValue(e.target.value)}
								placeholder="Write a message..."
								rows={4}
							/>
						</div>
						<div>
							<Label htmlFor="error-textarea">Error State</Label>
							<TextArea id="error-textarea" placeholder="Invalid input" variant={TEXTAREA_VARIANTS.ERROR} />
						</div>
						<div>
							<Label htmlFor="disabled-textarea">Disabled</Label>
							<TextArea id="disabled-textarea" placeholder="Cannot edit" disabled />
						</div>
					</Stack>
				</section>

				<Divider />

				{/* Select */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Select</h2>
					<Stack gap={STACK_GAPS.DEFAULT}>
						<div>
							<Label htmlFor="default-select">Favorite Color</Label>
							<Select
								id="default-select"
								options={[
									{ label: "Red", value: "red" },
									{ label: "Blue", value: "blue" },
									{ label: "Green", value: "green" },
								]}
								value={selectValue}
								onChange={(e) => setSelectValue(e.target.value)}
								placeholder="Choose a color..."
							/>
						</div>
						<div>
							<Label htmlFor="error-select">Error State</Label>
							<Select
								id="error-select"
								options={[
									{ label: "Option 1", value: "1" },
									{ label: "Option 2", value: "2" },
								]}
								value={errorSelectValue}
								onChange={(e) => setErrorSelectValue(e.target.value)}
								variant={SELECT_VARIANTS.ERROR}
								placeholder="Select an option..."
							/>
						</div>
						<div>
							<Label htmlFor="disabled-select">Disabled</Label>
							<Select
								id="disabled-select"
								options={[{ label: "Locked", value: "locked" }]}
								disabled
								placeholder="Cannot change"
							/>
						</div>
					</Stack>
				</section>

				<Divider />

				{/* Checkbox */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Checkbox</h2>
					<Stack gap={STACK_GAPS.DEFAULT}>
						<Checkbox
							checked={checked}
							onChange={(e) => setChecked(e.target.checked)}
							label="I agree to the terms and conditions"
						/>
						<Checkbox defaultChecked label="Already checked" />
						<Checkbox disabled label="Disabled checkbox" />
					</Stack>
				</section>

				<Divider />

				{/* Label */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Label</h2>
					<Stack gap={STACK_GAPS.DEFAULT}>
						<Label>Default Label</Label>
						<Label variant={LABEL_VARIANTS.REQUIRED}>Required Label</Label>
					</Stack>
				</section>

				<Divider />

				{/* Card */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Card</h2>
					<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.LARGE}>
						<Card header={<strong>Default Card</strong>}>
							This is the default card style with a subtle shadow.
						</Card>
						<Card variant={CARD_VARIANTS.OUTLINED} header={<strong>Outlined Card</strong>}>
							This card has a border outline instead of a shadow.
						</Card>
						<Card variant={CARD_VARIANTS.ELEVATED} header={<strong>Elevated Card</strong>} footer={<em>Card footer</em>}>
							This card has a more prominent shadow.
						</Card>
					</Stack>
				</section>

				<Divider />

				{/* Badge */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Badge</h2>
					<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.DEFAULT}>
						<Badge>Default</Badge>
						<Badge variant={BADGE_VARIANTS.PRIMARY}>Primary</Badge>
						<Badge variant={BADGE_VARIANTS.SUCCESS}>Success</Badge>
						<Badge variant={BADGE_VARIANTS.WARNING}>Warning</Badge>
						<Badge variant={BADGE_VARIANTS.DANGER}>Danger</Badge>
					</Stack>
				</section>

				<Divider />

				{/* Alert */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Alert</h2>
					<Stack gap={STACK_GAPS.DEFAULT}>
						<Alert title="Info" variant={ALERT_VARIANTS.INFO}>
							This is an informational message.
						</Alert>
						<Alert title="Success" variant={ALERT_VARIANTS.SUCCESS}>
							Operation completed successfully.
						</Alert>
						<Alert title="Warning" variant={ALERT_VARIANTS.WARNING}>
							Please review before proceeding.
						</Alert>
						{showAlert && (
							<Alert title="Error" variant={ALERT_VARIANTS.ERROR} onDismiss={() => setShowAlert(false)}>
								Something went wrong. Click X to dismiss.
							</Alert>
						)}
					</Stack>
				</section>

				<Divider />

				{/* Spinner */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Spinner</h2>
					<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.LARGE}>
						<div className="text-center">
							<Spinner size={SPINNER_SIZES.SMALL} />
							<p className="text-sm text-gray-500 mt-2">Small</p>
						</div>
						<div className="text-center">
							<Spinner />
							<p className="text-sm text-gray-500 mt-2">Default</p>
						</div>
						<div className="text-center">
							<Spinner size={SPINNER_SIZES.LARGE} />
							<p className="text-sm text-gray-500 mt-2">Large</p>
						</div>
					</Stack>
				</section>

				<Divider />

				{/* Avatar */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Avatar</h2>
					<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.DEFAULT}>
						<Avatar name="John Doe" size={AVATAR_SIZES.SMALL} />
						<Avatar name="Jane Smith" />
						<Avatar name="Alice" size={AVATAR_SIZES.LARGE} />
						<Avatar name="Bob Ross" src="https://i.pravatar.cc/56" size={AVATAR_SIZES.LARGE} />
					</Stack>
				</section>

				<Divider />

				{/* Tabs */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Tabs</h2>
					<Stack gap={STACK_GAPS.LARGE}>
						<div>
							<Label>Default Style</Label>
							<Tabs
								tabs={[
									{ label: "Overview", content: <p>This is the overview tab content.</p> },
									{ label: "Details", content: <p>Here are the details of this item.</p> },
									{ label: "Settings", content: <p>Configure your preferences here.</p> },
								]}
								activeTab={activeTab}
								onTabChange={setActiveTab}
							/>
						</div>
						<div>
							<Label>Pills Style</Label>
							<Tabs
								variant={TAB_VARIANTS.PILLS}
								tabs={[
									{ label: "Tab 1", content: <p>Pills tab 1 content.</p> },
									{ label: "Tab 2", content: <p>Pills tab 2 content.</p> },
								]}
								activeTab={pillsTab}
								onTabChange={setPillsTab}
							/>
						</div>
					</Stack>
				</section>

				<Divider />

				{/* Modal */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Modal</h2>
					<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.DEFAULT}>
						<Button variant={BUTTON_VARIANTS.PRIMARY} onClick={() => setModalOpen(true)}>
							Open Modal (Default)
						</Button>
						<Button onClick={() => setSmallModalOpen(true)}>
							Open Small Modal
						</Button>
						<Button onClick={() => setLargeModalOpen(true)}>
							Open Large Modal
						</Button>
					</Stack>
					<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
						<p className="text-gray-600 mb-4">This is the modal content. Click the X or the backdrop to close.</p>
						<Button variant={BUTTON_VARIANTS.PRIMARY} onClick={() => setModalOpen(false)}>
							Close
						</Button>
					</Modal>
					<Modal isOpen={smallModalOpen} onClose={() => setSmallModalOpen(false)} title="Small Modal" size={MODAL_SIZES.SMALL}>
						<p className="text-gray-600 mb-4">This is a small modal.</p>
					</Modal>
					<Modal isOpen={largeModalOpen} onClose={() => setLargeModalOpen(false)} title="Large Modal" size={MODAL_SIZES.LARGE}>
						<p className="text-gray-600 mb-4">This is a large modal with more room for content.</p>
					</Modal>
				</section>

				<Divider />

				{/* Stack demo */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Stack</h2>
					<Stack gap={STACK_GAPS.DEFAULT}>
						<Label>Vertical (default)</Label>
						<Stack gap={STACK_GAPS.SMALL}>
							<Badge variant={BADGE_VARIANTS.PRIMARY}>Item 1</Badge>
							<Badge variant={BADGE_VARIANTS.SUCCESS}>Item 2</Badge>
							<Badge variant={BADGE_VARIANTS.WARNING}>Item 3</Badge>
						</Stack>
						<Label>Horizontal with large gap</Label>
						<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.LARGE}>
							<Badge variant={BADGE_VARIANTS.PRIMARY}>Item 1</Badge>
							<Badge variant={BADGE_VARIANTS.SUCCESS}>Item 2</Badge>
							<Badge variant={BADGE_VARIANTS.WARNING}>Item 3</Badge>
						</Stack>
					</Stack>
				</section>

				<Divider />

				{/* Divider demo */}
				<section className="mb-10">
					<h2 className="text-xl font-semibold mb-4">Divider</h2>
					<p className="text-gray-600">Content above the divider</p>
					<Divider />
					<p className="text-gray-600">Content below the divider</p>
					<Label>Vertical Divider</Label>
					<Stack direction={STACK_DIRECTIONS.HORIZONTAL} gap={STACK_GAPS.DEFAULT}>
						<p className="text-gray-600">Left</p>
						<Divider orientation={DIVIDER_ORIENTATIONS.VERTICAL} />
						<p className="text-gray-600">Right</p>
					</Stack>
				</section>
			</div>
		</div>
	);
}

export default App;
