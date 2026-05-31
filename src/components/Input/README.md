# Input

Labeled text field with hint, error, and icon slots.

```tsx
<Input
  label="Email"
  type="email"
  required
  leftIcon={<Mail className="h-4 w-4" />}
  hint="We'll never share it."
/>

<Input label="Email" error="Enter a valid email address." />
```

| Prop               | Type                       | Default   |
| ------------------ | -------------------------- | --------- |
| `label`            | `ReactNode`                | —         |
| `hint`             | `ReactNode`                | —         |
| `error`            | `ReactNode`                | —         |
| `required`         | `boolean`                  | `false`   |
| `hideLabel`        | `boolean`                  | `false`   |
| `leftIcon`         | `ReactNode`                | —         |
| `rightIcon`        | `ReactNode`                | —         |
| `size`             | `'sm' \| 'md' \| 'lg'`     | `'md'`    |
| `wrapperClassName` | `string`                   | —         |
| ...rest            | `InputHTMLAttributes`      | —         |

## A11y

- `label` is associated via `htmlFor` / generated `id`.
- `hint` and `error` are linked to the input via `aria-describedby`.
- `error` triggers `aria-invalid="true"` and is announced as `role="alert"`.
- Use `hideLabel` when the field is self-evident from context (e.g. a search
  bar with a magnifier icon and placeholder).
