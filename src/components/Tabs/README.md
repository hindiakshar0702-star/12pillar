# Tabs

Accessible tabbed interface with roving tabindex and full keyboard navigation.

```tsx
<Tabs defaultValue="account">
  <Tabs.List aria-label="Settings">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">…</Tabs.Content>
  <Tabs.Content value="billing">…</Tabs.Content>
</Tabs>
```

## Keyboard

| Key                        | Action                       |
| -------------------------- | ---------------------------- |
| `Tab`                      | Focus active trigger.        |
| `ArrowLeft` / `ArrowRight` | Move focus (horizontal).     |
| `ArrowUp` / `ArrowDown`    | Move focus (vertical).       |
| `Home` / `End`             | First / last trigger.        |
| `Enter` / `Space`          | Activate focused tab.        |

## Variants

`underline` (default), `pill`, `enclosed`. Pair with `orientation="vertical"` for sidebars.
