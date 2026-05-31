# Toast

Imperative notification API powered by **Zustand**, paired with a render-once
`<Toaster />` mounted at the app root.

## Setup

```tsx
// app root
import { Toaster } from '@/components/Toast';

export default function App() {
  return (
    <>
      <YourApp />
      <Toaster position="top-right" />
    </>
  );
}
```

## Trigger toasts from anywhere

```ts
import { toast } from '@/components/Toast';

toast.success('Saved');
toast.error('Network error', { description: 'Please retry.' });
toast.warning('Subscription expires soon');
toast.info('New version available', {
  action: { label: 'Reload', onClick: () => location.reload() },
});

// Custom + persistent
const id = toast({ title: 'Uploading…', duration: Infinity });
// later:
toast.dismiss(id);
```

## API

| Function           | Signature                                                 |
| ------------------ | --------------------------------------------------------- |
| `toast(input)`     | `(input: ToastInput) => string`                           |
| `toast.success`    | `(title, opts?) => string`                                |
| `toast.error`      | `(title, opts?) => string`                                |
| `toast.warning`    | `(title, opts?) => string`                                |
| `toast.info`       | `(title, opts?) => string`                                |
| `toast.dismiss(id)`| `(id: string) => void`                                    |
| `toast.clear()`    | `() => void`                                              |

### ToastInput

| Prop          | Type                       | Default     |
| ------------- | -------------------------- | ----------- |
| `title`       | `ReactNode` (required)     | —           |
| `description` | `ReactNode`                | —           |
| `variant`     | `'default' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'default'` |
| `duration`    | `number` ms; `Infinity`/`0` to persist | `5000`        |
| `action`      | `{ label, onClick }`       | —           |

### Toaster

| Prop       | Type                                                                                                    | Default       |
| ---------- | ------------------------------------------------------------------------------------------------------- | ------------- |
| `position` | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'`       | `'top-right'` |
| `max`      | `number`                                                                                                | `5`           |

## A11y

- `error` and `warning` toasts use `role="alert"` + `aria-live="assertive"`
- All other variants use `role="status"` + `aria-live="polite"`
- Each toast has a "Dismiss notification" button focusable via Tab
