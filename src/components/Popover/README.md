# Popover

Click-triggered overlay panel. Closes on outside click and Escape.

```tsx
<Popover trigger={<Button variant="outline">Open menu</Button>}>
  <div className="p-3 w-56">
    <h4 className="text-h4 mb-2">Notifications</h4>
    <p className="text-small text-text-secondary">You're up to date.</p>
  </div>
</Popover>
```

| Prop          | Type                                                           | Default    |
| ------------- | -------------------------------------------------------------- | ---------- |
| `trigger`     | `ReactElement` (must accept ref + onClick)                     | —          |
| `placement`   | `'top' \| 'bottom' \| 'left' \| 'right' \| 'bottom-start' \| 'bottom-end'` | `'bottom'` |
| `offset`      | `number` (px)                                                  | `8`        |
| `open`        | `boolean` (controlled)                                         | —          |
| `defaultOpen` | `boolean` (uncontrolled)                                       | `false`    |
| `onOpenChange`| `(open: boolean) => void`                                      | —          |
| `disabled`    | `boolean`                                                      | `false`    |

## A11y

- Trigger gets `aria-expanded` / `aria-haspopup="dialog"` / `aria-controls`.
- Popover panel has `role="dialog"` and is portal-rendered.
- Escape and outside-click close it; focus returns to trigger.
