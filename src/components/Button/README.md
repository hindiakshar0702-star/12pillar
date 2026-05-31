# Button

Primary action element of the **BannerView 3D Design System**.

A `forwardRef` + `memo` button with a CVA-powered variant system, full
accessibility, keyboard support, and a tactile 3D press feel built from
layered shadows + a 1-pixel translate on `:active`.

---

## Import

```tsx
import { Button } from '@/components/Button';
```

## Props

| Prop            | Type                                                                                                | Default     | Description                                                  |
| --------------- | --------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `variant`       | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'danger' \| 'success' \| 'warning'`            | `'primary'` | Visual style.                                                |
| `size`          | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon'`                                                            | `'md'`      | Geometry token.                                              |
| `fullWidth`     | `boolean`                                                                                           | `false`     | Stretch to fill parent.                                      |
| `loading`       | `boolean`                                                                                           | `false`     | Replace label with spinner; sets `aria-busy`; disables click.|
| `loadingLabel`  | `string`                                                                                            | `'Loading'` | Announced to screen readers via `role="status"`.             |
| `leftIcon`      | `ReactNode`                                                                                         | —           | Decorative icon before label (`aria-hidden`).                |
| `rightIcon`     | `ReactNode`                                                                                         | —           | Decorative icon after label (`aria-hidden`).                 |
| `disabled`      | `boolean`                                                                                           | `false`     | Native disabled.                                             |
| `type`          | `'button' \| 'submit' \| 'reset'`                                                                   | `'button'`  | Defaults to `'button'` to prevent accidental form submits.   |
| ...rest         | `ButtonHTMLAttributes<HTMLButtonElement>`                                                           | —           | All standard button props (incl. `onClick`, `aria-*`).       |

## Accessibility

- Native `<button>` element — full keyboard support out of the box (Enter / Space).
- `aria-busy` is set during `loading`; a visually-hidden `role="status"`
  announces `loadingLabel` to screen readers.
- Decorative icons are wrapped with `aria-hidden="true"`.
- Use `aria-label` for icon-only buttons (`size="icon"`).
- Focus is rendered with a 2px primary ring on `:focus-visible` only — pointer
  users never see the ring.
- Color contrast meets **WCAG AA** for all variants on the dark surface.

## Keyboard

| Key       | Action                |
| --------- | --------------------- |
| `Tab`     | Move focus to button. |
| `Enter`   | Activate.             |
| `Space`   | Activate.             |

## Responsive behaviour

The component is fluid by design — it stretches to its content. Use
`fullWidth` for stacked mobile layouts:

```tsx
<Button fullWidth className="md:w-auto">
  Continue
</Button>
```

## Examples

### Primary CTA

```tsx
<Button variant="primary" size="lg">
  Get started
</Button>
```

### Destructive with confirmation hint

```tsx
<>
  <Button variant="danger" aria-describedby="del-hint" leftIcon={<Trash2 />}>
    Delete project
  </Button>
  <p id="del-hint" className="text-caption text-text-secondary">
    This action is irreversible.
  </p>
</>
```

### Async submit

```tsx
function SaveButton() {
  const [pending, setPending] = useState(false);
  return (
    <Button
      type="submit"
      loading={pending}
      loadingLabel="Saving changes"
      onClick={async () => {
        setPending(true);
        try { await save(); } finally { setPending(false); }
      }}
    >
      Save
    </Button>
  );
}
```

### Icon-only

```tsx
<Button size="icon" variant="ghost" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

## Testing

Tests live next to the component (`Button.test.tsx`). Run:

```bash
npm test
```

Coverage includes: rendering, ref forwarding, all variants/sizes, click +
keyboard activation, disabled / loading semantics, icon a11y, and
`aria-label` / `aria-describedby` propagation.
