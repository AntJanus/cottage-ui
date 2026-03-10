# Accessibility Reference

Per-component documentation of keyboard interactions, ARIA attributes, and usage
guidance for building accessible UIs with cottage-ui.

---

## Button

**Keyboard interactions:**

| Key | Behavior |
|---|---|
| Enter | Activates the button |
| Space | Activates the button |

**ARIA attributes:**

- Defaults `type="button"` to prevent accidental form submissions. Pass
  `type="submit"` explicitly for form submit buttons.
- Accessible name is derived from the `children` text content.
- Supports `aria-label` pass-through for icon-only buttons (e.g.,
  `<Button aria-label="Close">X</Button>`).
- Supports `aria-disabled` pass-through. Prefer the native `disabled` attribute
  when possible.

**Usage example:**

```tsx
<Button onClick={handleSave}>Save changes</Button>
<Button aria-label="Close dialog" onClick={handleClose}>X</Button>
```

---

## Input

**Keyboard interactions:**

Standard native `<input>` keyboard behavior applies (Tab to focus, type to
input, etc.).

**ARIA attributes:**

- Sets `aria-invalid="true"` automatically when `variant={INPUT_VARIANTS.ERROR}`.
- Supports `aria-describedby` pass-through to link to error message elements.
- Supports `aria-required` and native `required` pass-through.
- Supports `aria-label` pass-through for inputs without a visible label.

**Labeling:** Associate with a `<Label>` component using matching `htmlFor` and
`id` attributes for proper form control association.

**Usage example:**

```tsx
<Label htmlFor="email" variant={LABEL_VARIANTS.REQUIRED}>Email</Label>
<Input
  id="email"
  variant={INPUT_VARIANTS.ERROR}
  aria-describedby="email-error"
  required
/>
<span id="email-error">Email is required</span>
```

---

## TextArea

**Keyboard interactions:**

Standard native `<textarea>` keyboard behavior applies (Tab to focus, type to
input, Enter for newlines).

**ARIA attributes:**

- Sets `aria-invalid="true"` automatically when
  `variant={TEXTAREA_VARIANTS.ERROR}`.
- Supports `aria-describedby` pass-through to link to error message elements.
- Supports `aria-required` and native `required` pass-through.
- Supports `aria-label` pass-through for textareas without a visible label.

**Labeling:** Same pattern as Input -- use `<Label htmlFor="id">` for
association.

**Usage example:**

```tsx
<Label htmlFor="bio">Bio</Label>
<TextArea
  id="bio"
  aria-describedby="bio-help"
/>
<span id="bio-help">Write a short description about yourself</span>
```

---

## Select

**Keyboard interactions:**

Standard native `<select>` keyboard behavior applies (Tab to focus, Arrow keys
to navigate options, Enter/Space to open/select).

**ARIA attributes:**

- Sets `aria-invalid="true"` automatically when
  `variant={SELECT_VARIANTS.ERROR}`.
- Supports `aria-describedby` pass-through to link to error message elements.
- Supports `aria-required` and native `required` pass-through.
- Supports `aria-label` pass-through for selects without a visible label.
- Placeholder option is rendered as `<option disabled>` so it cannot be
  re-selected after a choice is made.

**Labeling:** Same pattern as Input -- use `<Label htmlFor="id">` for
association.

**Usage example:**

```tsx
<Label htmlFor="color">Color</Label>
<Select
  id="color"
  options={colorOptions}
  placeholder="Choose a color"
  required
/>
```

---

## Checkbox

**Keyboard interactions:**

| Key | Behavior |
|---|---|
| Space | Toggles the checkbox |
| Tab | Moves focus to/from the checkbox |

**ARIA attributes:**

- The `<input type="checkbox">` is wrapped in a `<label>` element. When the
  `label` prop is provided, the checkbox gets its accessible name from the label
  text automatically.
- When no `label` prop is provided, you **must** pass `aria-label` for an
  accessible name.
- Supports `aria-describedby` pass-through for supplementary descriptions.
- Supports `required` pass-through.

**Usage example:**

```tsx
{/* With visible label */}
<Checkbox label="Accept terms and conditions" required />

{/* Without visible label -- aria-label required */}
<Checkbox aria-label="Select row" />
```

---

## Modal

**Keyboard interactions:**

| Key | Behavior |
|---|---|
| Escape | Closes the modal |
| Tab | Cycles forward through focusable elements inside the modal (trapped) |
| Shift+Tab | Cycles backward through focusable elements inside the modal (trapped) |

**Focus management:**

- On open: focuses the first focusable element inside the modal (typically the
  close button). If no focusable elements exist, focuses the dialog container
  itself.
- On close: restores focus to the element that was focused before the modal
  opened.
- Focus is trapped inside the modal -- Tab/Shift+Tab wraps around at the
  boundaries.

**ARIA attributes:**

- `role="dialog"` on the modal container.
- `aria-modal="true"` to indicate the rest of the page is inert.
- When `title` prop is provided: `aria-labelledby` points to the title heading
  element. The `aria-label` prop is ignored in this case.
- When `title` is not provided: falls back to `aria-label` (defaults to
  "Modal dialog" if neither is given).
- Close button has `aria-label="Close"` and its visual icon is hidden from
  assistive technology via `aria-hidden="true"`.

**Usage example:**

```tsx
{/* With title -- uses aria-labelledby */}
<Modal isOpen={isOpen} onClose={handleClose} title="Settings">
  <p>Modal content here</p>
</Modal>

{/* Without title -- uses aria-label */}
<Modal isOpen={isOpen} onClose={handleClose} aria-label="Filter options">
  <p>Filter content here</p>
</Modal>
```

---

## Tabs

**Keyboard interactions:**

| Key | Behavior |
|---|---|
| ArrowRight | Moves focus to and activates the next tab (wraps to first) |
| ArrowLeft | Moves focus to and activates the previous tab (wraps to last) |
| Home | Moves focus to and activates the first tab |
| End | Moves focus to and activates the last tab |
| Tab | Moves focus from the active tab into the tab panel |

**Focus management:**

- Uses roving tabindex: only the active tab has `tabindex="0"`, all others have
  `tabindex="-1"`. This means Tab/Shift+Tab moves focus in/out of the tab strip
  as a single stop, and arrow keys navigate between tabs.
- Tab panels have `tabindex="0"` so they are focusable for keyboard users to
  reach their content.

**ARIA attributes:**

- `role="tablist"` on the tab strip container, with
  `aria-orientation="horizontal"`.
- `aria-label` on the tablist (defaults to "Tabs"; pass a custom label for
  context, e.g., `aria-label="Settings sections"`).
- Each tab button: `role="tab"`, `aria-selected="true|false"`,
  `aria-controls="<panel-id>"`.
- Tab panel: `role="tabpanel"`, `aria-labelledby="<tab-id>"`, `tabindex="0"`.
- Tab and panel IDs are auto-generated via `useId()` and linked via
  `aria-controls` / `aria-labelledby`.
- Out-of-range `activeTab` values are clamped to valid bounds.

**Usage example:**

```tsx
<Tabs
  aria-label="Account settings"
  tabs={[
    { label: 'Profile', content: <ProfileForm /> },
    { label: 'Security', content: <SecurityForm /> },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

---

## Label

**ARIA attributes:**

- Renders as a native `<label>` element. Use `htmlFor` to associate with a form
  control's `id`.
- When `variant={LABEL_VARIANTS.REQUIRED}`:
  - Displays a visual asterisk `*` that is hidden from assistive technology
    (`aria-hidden="true"`).
  - Includes a screen-reader-only `(required)` text via the `sr-only` CSS class.

**Usage example:**

```tsx
<Label htmlFor="username" variant={LABEL_VARIANTS.REQUIRED}>Username</Label>
<Input id="username" required />
```

---

## Alert

**ARIA attributes:**

- `role="alert"` on the container, which creates a live region. Screen readers
  announce the alert content automatically when it appears in the DOM.
- Dismiss button has `aria-label="Dismiss"` and its visual icon is hidden via
  `aria-hidden="true"`.
- Supports `aria-label` pass-through for additional context.

**Usage example:**

```tsx
<Alert variant={ALERT_VARIANTS.ERROR} title="Error">
  Your session has expired.
</Alert>

<Alert variant={ALERT_VARIANTS.SUCCESS} onDismiss={handleDismiss}>
  Changes saved successfully.
</Alert>
```

---

## Spinner

**ARIA attributes:**

- `role="status"` on the container for live region semantics (polite
  announcement).
- `aria-label` defaults to "Loading". Pass a custom label for context (e.g.,
  `label="Saving changes"`).

**Usage example:**

```tsx
<Spinner label="Loading results" />
```

---

## Divider

**ARIA attributes:**

- Horizontal orientation: renders as a native `<hr>` element (implicit
  `role="separator"`).
- Vertical orientation: renders as a `<div>` with `role="separator"` and
  `aria-orientation="vertical"`.

**Usage example:**

```tsx
<Divider />
<Divider orientation={DIVIDER_ORIENTATIONS.VERTICAL} />
```

---

## General Patterns

### Form field labeling

All form components (Input, TextArea, Select, Checkbox) accept standard ARIA
attributes via their rest props spread. The recommended labeling patterns are:

1. **Visible label (preferred):** Use `<Label htmlFor="field-id">` paired with a
   matching `id` on the form control.
2. **Hidden label:** Use `aria-label` directly on the form control when a visible
   label is not feasible.
3. **Error messages:** Use `aria-describedby` to link to an error message
   element. Combine with the error variant for `aria-invalid="true"`.

### Error state pattern

```tsx
<Label htmlFor="email" variant={LABEL_VARIANTS.REQUIRED}>Email</Label>
<Input
  id="email"
  variant={INPUT_VARIANTS.ERROR}
  aria-describedby="email-error"
  required
/>
<span id="email-error" role="alert">Please enter a valid email address</span>
```

### Props pass-through

All components spread remaining props (`...rest`) onto their root interactive
element. This means any standard HTML or ARIA attribute not explicitly handled
will be forwarded. Common pass-through attributes include:

- `aria-label`
- `aria-labelledby`
- `aria-describedby`
- `aria-required`
- `aria-disabled`
- `aria-expanded`
- `required`
- `disabled`
- `id`
- `name`
