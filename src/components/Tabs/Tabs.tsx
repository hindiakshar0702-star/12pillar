import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/lib/cn';
import { tabsListVariants, tabsTriggerVariants } from './Tabs.variants';
import type {
  TabsContextValue,
  TabsContentProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps,
} from './Tabs.types';

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* components must be rendered inside <Tabs>');
  return ctx;
}

/**
 * Tabs — accessible tabbed interface with roving tabindex and arrow-key navigation.
 *
 *   <Tabs defaultValue="account">
 *     <Tabs.List aria-label="Settings">
 *       <Tabs.Trigger value="account">Account</Tabs.Trigger>
 *       <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
 *     </Tabs.List>
 *     <Tabs.Content value="account">…</Tabs.Content>
 *     <Tabs.Content value="billing">…</Tabs.Content>
 *   </Tabs>
 */
const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function Tabs(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    variant = 'underline',
    className,
    ...rest
  },
  ref
) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolled;
  const baseId = useId();

  const setValue = useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolled(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, setValue, orientation, variant, baseId }}>
      <div
        ref={ref}
        data-orientation={orientation}
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col gap-3',
          className
        )}
        {...rest}
      />
    </TabsContext.Provider>
  );
});

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, ...rest },
  ref
) {
  const { orientation, variant } = useTabs();
  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      className={cn(tabsListVariants({ orientation, variant }), className)}
      {...rest}
    />
  );
});

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, disabled, className, children, ...rest },
  ref
) {
  const { value: active, setValue, orientation, variant, baseId } = useTabs();
  const selected = active === value;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const id = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const next =
      orientation === 'horizontal'
        ? { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' }
        : { ArrowDown: 1, ArrowUp: -1, Home: 'first', End: 'last' };
    const direction = next[e.key as keyof typeof next];
    if (direction === undefined) return;
    e.preventDefault();
    const tabs = Array.from(
      triggerRef.current?.parentElement?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([data-disabled])'
      ) ?? []
    );
    if (tabs.length === 0) return;
    const idx = tabs.indexOf(triggerRef.current!);
    let target: HTMLButtonElement;
    if (direction === 'first') target = tabs[0];
    else if (direction === 'last') target = tabs[tabs.length - 1];
    else target = tabs[(idx + (direction as number) + tabs.length) % tabs.length];
    target.focus();
    target.click();
  };

  return (
    <button
      ref={(node) => {
        triggerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
      id={id}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      data-state={selected ? 'active' : 'inactive'}
      data-disabled={disabled || undefined}
      onClick={() => !disabled && setValue(value)}
      onKeyDown={onKeyDown}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </button>
  );
});

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, forceMount, className, ...rest },
  ref
) {
  const { value: active, baseId } = useTabs();
  const selected = active === value;
  if (!selected && !forceMount) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      hidden={!selected}
      tabIndex={0}
      className={cn('focus-visible:outline-none', className)}
      {...rest}
    />
  );
});

type TabsComponent = typeof TabsRoot & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
};

export const Tabs = TabsRoot as TabsComponent;
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
