import { useState } from 'react';
import {
  Plus,
  Trash2,
  ArrowRight,
  Mail,
  Search,
  Save,
  Bell,
  Hash,
} from 'lucide-react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Popover,
  Select,
  Tabs,
  Tag,
  Textarea,
  Toaster,
  toast,
  Tooltip,
} from '@/components';

const countryOptions = [
  { value: 'in', label: 'India', description: 'Asia' },
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'jp', label: 'Japan', description: 'Asia' },
  { value: 'br', label: 'Brazil', description: 'South America' },
  { value: 'de', label: 'Germany', description: 'Europe' },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [tags, setTags] = useState(['typescript', 'react', 'tailwind']);
  const [bio, setBio] = useState('Building tactile interfaces.');

  return (
    <main className="min-h-dvh bg-bg text-text-primary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mb-12">
          <p className="text-caption uppercase tracking-widest text-text-secondary">
            Design System
          </p>
          <h1 className="mt-2 text-display">BannerView 3D</h1>
          <p className="mt-3 max-w-2xl text-body text-text-secondary">
            Production-ready React components with a tactile 3D feel — buttons, cards,
            inputs, modals, popovers, tabs, toasts and more.
          </p>
        </header>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Create</Button>
            <Button variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
            <Tooltip content="This action cannot be undone">
              <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />}>
                Delete
              </Button>
            </Tooltip>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </Section>

        {/* Avatars + Badges + Tags */}
        <Section title="Identity, status & metadata">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Avatar alt="Aksh Aksh" status="online" />
              <Avatar alt="Jane Doe" size="lg" status="busy" />
              <Avatar alt="Solo" size="xl" shape="square" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="primary">Beta</Badge>
              <Badge variant="outline">v2.1.0</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag
                  key={t}
                  variant="primary"
                  leftIcon={<Hash className="h-3 w-3" />}
                  onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}
                >
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        </Section>

        {/* Forms */}
        <Section title="Forms">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Email" type="email" placeholder="you@company.com" leftIcon={<Mail className="h-4 w-4" />} required />
            <Input label="Search" hideLabel placeholder="Search…" leftIcon={<Search className="h-4 w-4" />} />
            <Select
              label="Country"
              searchable
              options={countryOptions}
              value={country}
              onChange={(v) => setCountry(v)}
            />
            <Input label="Username" hint="3–20 characters" />
            <div className="md:col-span-2">
              <Textarea
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                showCount
                maxLength={280}
              />
            </div>
          </div>
        </Section>

        {/* Tabs + Card */}
        <Section title="Composition">
          <Card variant="elevated">
            <Card.Header>
              <Card.Title>Project settings</Card.Title>
              <Card.Description>Manage how your project behaves.</Card.Description>
            </Card.Header>
            <Card.Body>
              <Tabs defaultValue="general">
                <Tabs.List aria-label="Project settings sections">
                  <Tabs.Trigger value="general">General</Tabs.Trigger>
                  <Tabs.Trigger value="members">Members</Tabs.Trigger>
                  <Tabs.Trigger value="danger">Danger zone</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="general">
                  <p className="text-body text-text-secondary">
                    Configure the project name, slug, and default visibility.
                  </p>
                </Tabs.Content>
                <Tabs.Content value="members">
                  <p className="text-body text-text-secondary">
                    Invite collaborators and manage roles.
                  </p>
                </Tabs.Content>
                <Tabs.Content value="danger">
                  <p className="text-body text-danger">
                    Irreversible actions — delete or transfer this project.
                  </p>
                </Tabs.Content>
              </Tabs>
            </Card.Body>
            <Card.Footer>
              <Popover
                trigger={
                  <Button variant="outline" leftIcon={<Bell className="h-4 w-4" />}>
                    Notifications
                  </Button>
                }
              >
                <div className="w-64 p-3">
                  <h4 className="text-h4 mb-1">Notifications</h4>
                  <p className="text-small text-text-secondary">You're all caught up.</p>
                </div>
              </Popover>
              <Button variant="ghost">Cancel</Button>
              <Button leftIcon={<Save className="h-4 w-4" />} onClick={() => toast.success('Settings saved')}>
                Save
              </Button>
            </Card.Footer>
          </Card>
        </Section>

        {/* Modal + Toast triggers */}
        <Section title="Overlays & feedback">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Button variant="success" onClick={() => toast.success('Saved successfully')}>
              Trigger success toast
            </Button>
            <Button variant="warning" onClick={() => toast.warning('Disk almost full')}>
              Trigger warning toast
            </Button>
            <Button
              variant="danger"
              onClick={() => toast.error('Operation failed', { description: 'Please retry.' })}
            >
              Trigger error toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.info('New release available', {
                  description: 'Version 2.1 just shipped.',
                  action: { label: 'View', onClick: () => alert('View clicked') },
                })
              }
            >
              Toast with action
            </Button>
          </div>
        </Section>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete project"
        description="This action is permanent and cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setOpen(false);
                toast.error('Project deleted', { description: 'You can undo within 30 days.' });
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-body text-text-secondary">
          The project, its history, and all members will be removed.
        </p>
      </Modal>

      <Toaster position="top-right" />
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
