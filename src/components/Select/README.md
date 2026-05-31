# Select

Accessible single-select dropdown with optional combobox-style filter.

```tsx
<Select
  label="Country"
  options={[
    { value: 'in', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'jp', label: 'Japan' },
  ]}
  onChange={(v) => console.log(v)}
/>

{/* Combobox mode */}
<Select label="Topic" searchable options={topics} />
```

## Props

| Prop          | Type                                                 | Default       |
| ------------- | ---------------------------------------------------- | ------------- |
| `options`     | `SelectOption[]` (required)                          | —             |
| `value`       | `string \| null` (controlled)                        | —             |
| `defaultValue`| `string \| null` (uncontrolled)                      | `null`        |
| `onChange`    | `(value: string) => void`                            | —             |
| `searchable`  | `boolean`                                            | `false`       |
| `placeholder` | `string`                                             | `'Select…'`   |
| `label/hint/error/required/hideLabel` | as on `Input`                |               |
| `size`        | `'sm' \| 'md' \| 'lg'`                               | `'md'`        |

## Keyboard

| Key                    | Action                              |
| ---------------------- | ----------------------------------- |
| `Enter` / `Space` / `↓`| Open menu.                          |
| `↑` / `↓`              | Move highlight.                     |
| `Home` / `End`         | Jump to first / last option.        |
| `Enter`                | Select highlighted option.          |
| `Escape`               | Close without selecting.            |
| `Tab`                  | Close and move focus.               |
| `type`                 | When `searchable`, filters options. |

## A11y

- Trigger uses `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-haspopup="listbox"`.
- Listbox uses `role="listbox"` with `aria-activedescendant` pointing to the highlighted option.
- Each option uses `role="option"` + `aria-selected`.
- Errors are announced via `role="alert"` and `aria-invalid` is set on the trigger.
