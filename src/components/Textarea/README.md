# Textarea

Multi-line text field with hint, error, and optional character counter.

```tsx
<Textarea
  label="Bio"
  hint="Up to 280 characters."
  showCount
  maxLength={280}
/>
```

| Prop               | Type                          | Default   |
| ------------------ | ----------------------------- | --------- |
| `label`            | `ReactNode`                   | —         |
| `hint`             | `ReactNode`                   | —         |
| `error`            | `ReactNode`                   | —         |
| `hideLabel`        | `boolean`                     | `false`   |
| `showCount`        | `boolean`                     | `false`   |
| `maxLength`        | `number`                      | —         |
| `wrapperClassName` | `string`                      | —         |
| ...rest            | `TextareaHTMLAttributes`      | —         |
