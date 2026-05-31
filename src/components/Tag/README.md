# Tag

Removable / actionable label. Use for filter chips and token-style inputs.

```tsx
<Tag onRemove={() => remove(id)}>typescript</Tag>
<Tag variant="primary" leftIcon={<Hash />}>topic</Tag>
```

| Prop          | Type                                                                  | Default     |
| ------------- | --------------------------------------------------------------------- | ----------- |
| `variant`     | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'`        | `'neutral'` |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                | `'md'`      |
| `onRemove`    | `MouseEventHandler<HTMLButtonElement>`                                | —           |
| `removeLabel` | `string`                                                              | `'Remove'`  |
| `leftIcon`    | `ReactNode`                                                           | —           |
