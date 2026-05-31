# Tooltip

Hover/focus-triggered overlay. Manually positioned, portal-rendered.

```tsx
<Tooltip content="Save (⌘S)" placement="top">
  <Button size="icon" aria-label="Save"><Save /></Button>
</Tooltip>
```

| Prop         | Type                                   | Default   |
| ------------ | -------------------------------------- | --------- |
| `children`   | `ReactElement` (single child)          | —         |
| `content`    | `ReactNode`                            | —         |
| `placement`  | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| `openDelay`  | `number` (ms)                          | `250`     |
| `closeDelay` | `number` (ms)                          | `80`      |
| `disabled`   | `boolean`                              | `false`   |
| `offset`     | `number` (px)                          | `8`       |

## A11y

- Trigger receives `aria-describedby` while open, pointing to the tooltip.
- Tooltip uses `role="tooltip"`; closes on Escape and on blur.
