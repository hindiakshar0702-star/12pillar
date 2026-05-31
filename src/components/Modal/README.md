# Modal

Accessible dialog. Focus trap, scroll lock, escape-to-close, overlay close,
animated entrance/exit (Framer Motion), portal-rendered.

```tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project"
  description="This action is permanent."
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={confirm}>Delete</Button>
    </>
  }
>
  <p>Are you absolutely sure?</p>
</Modal>
```

| Prop                  | Type                                     | Default |
| --------------------- | ---------------------------------------- | ------- |
| `open`                | `boolean` (required)                     | —       |
| `onClose`             | `() => void` (required)                  | —       |
| `title`               | `ReactNode`                              | —       |
| `description`         | `ReactNode`                              | —       |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  |
| `showCloseButton`     | `boolean`                                | `true`  |
| `closeOnOverlayClick` | `boolean`                                | `true`  |
| `closeOnEscape`       | `boolean`                                | `true`  |
| `footer`              | `ReactNode`                              | —       |

## A11y

- `role="dialog"` + `aria-modal="true"`
- `aria-labelledby` and `aria-describedby` linked to title/description
- Tab focus is trapped; Escape closes (configurable)
- Body scroll is locked while open
- Focus is returned to the trigger on close
