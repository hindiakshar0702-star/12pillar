import { useState } from 'react';
import { Plus, ArrowRight, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/Button';

/**
 * Demo page for the BannerView 3D Design System.
 * Acts as a visual smoke test for the reference Button component.
 */
export default function App() {
  const [pending, setPending] = useState(false);

  const simulateAsync = () => {
    setPending(true);
    window.setTimeout(() => setPending(false), 1500);
  };

  return (
    <main className="min-h-dvh bg-bg text-text-primary">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-caption uppercase tracking-widest text-text-secondary">
            Design System
          </p>
          <h1 className="mt-2 text-display">BannerView 3D</h1>
          <p className="mt-3 max-w-2xl text-body text-text-secondary">
            Production-ready React components with a tactile 3D feel.
            Dark-first surfaces, WCAG-AA contrast, full keyboard support.
          </p>
        </header>

        <Section title="Variants">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
          </div>
        </Section>

        <Section title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">X-Large</Button>
            <Button size="icon" aria-label="Add item">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Section>

        <Section title="With icons">
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Create project</Button>
            <Button variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
            <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />}>
              Delete
            </Button>
            <Button variant="success" leftIcon={<Check className="h-4 w-4" />}>
              Approve
            </Button>
            <Button variant="ghost" size="icon" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Section>

        <Section title="States">
          <div className="flex flex-wrap gap-3">
            <Button
              loading={pending}
              loadingLabel="Saving changes"
              onClick={simulateAsync}
            >
              {pending ? 'Saving…' : 'Save changes'}
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section title="Full width (mobile-first)">
          <div className="max-w-sm">
            <Button fullWidth size="lg">
              Continue
            </Button>
          </div>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 rounded-lg border border-border bg-panel p-6 shadow-bv-2">
      <h2 className="mb-4 text-h3">{title}</h2>
      {children}
    </section>
  );
}
