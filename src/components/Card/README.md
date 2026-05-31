# Card

Compound surface container with `Header`, `Title`, `Description`, `Body`,
and `Footer` slots.

```tsx
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Project settings</Card.Title>
    <Card.Description>Manage how your project behaves.</Card.Description>
  </Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

| Prop          | Type                                                | Default     |
| ------------- | --------------------------------------------------- | ----------- |
| `variant`     | `'default' \| 'elevated' \| 'outlined' \| 'panel'`  | `'default'` |
| `padding`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`            | `'md'`      |
| `interactive` | `boolean`                                           | `false`     |

When `interactive` is `true`, the card gains hover lift, active press, and
a focus ring — pair with `role="button"` + `tabIndex={0}` (or wrap in `<a>`).
