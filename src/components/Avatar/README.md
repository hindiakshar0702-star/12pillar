# Avatar

User identity element with image, initials fallback, and optional status indicator.

```tsx
import { Avatar } from '@/components/Avatar';

<Avatar src="/me.jpg" alt="Jane Doe" status="online" />
<Avatar alt="Jane Doe" /> {/* initials: JD */}
```

## Props

| Prop       | Type                                              | Default    |
| ---------- | ------------------------------------------------- | ---------- |
| `src`      | `string`                                          | —          |
| `alt`      | `string` (required)                               | —          |
| `fallback` | `ReactNode`                                       | initials   |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`            | `'md'`     |
| `shape`    | `'circle' \| 'square'`                            | `'circle'` |
| `status`   | `'online' \| 'offline' \| 'busy' \| 'away'`       | —          |

## A11y

- Uses `role="img"` + `aria-label={alt}` so the avatar announces a single
  meaningful label (the inner `<img>` is `aria-hidden`).
- Status dot is decorative (`aria-hidden`) — surface presence in adjacent text.
