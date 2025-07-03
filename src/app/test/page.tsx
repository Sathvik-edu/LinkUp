'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">UI Components Test</h1>
        
        {/* Buttons */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button size="sm">Small Button</Button>
            <Button size="lg">Large Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </Card>

        {/* Inputs */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Inputs</h2>
          <div className="space-y-4">
            <Input
              label="Default Input"
              placeholder="Enter some text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Input with Helper Text"
              placeholder="This input has helper text"
              helperText="This is some helpful text below the input"
            />
            <Input
              label="Input with Error"
              placeholder="This input has an error"
              error="This field is required"
            />
            <Input
              label="Disabled Input"
              placeholder="This input is disabled"
              disabled
            />
          </div>
        </Card>

        {/* Avatars */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Avatars</h2>
          <div className="flex items-center gap-4">
            <Avatar
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              name="Sarah Johnson"
              size="sm"
            />
            <Avatar name="John Doe" size="md" />
            <Avatar name="Jane Smith" size="lg" />
            <Avatar name="Bob Wilson" size="xl" />
          </div>
        </Card>

        {/* Badges */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </Card>

        {/* Cards */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-gray-600">This is a default card with some content.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-semibold mb-2">Outlined Card</h3>
              <p className="text-gray-600">This is an outlined card with some content.</p>
            </Card>
            <Card variant="elevated">
              <h3 className="font-semibold mb-2">Elevated Card</h3>
              <p className="text-gray-600">This is an elevated card with some content.</p>
            </Card>
          </div>
        </Card>

        {/* Modal */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Modal</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
        </Card>

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Test Modal"
          size="md"
        >
          <div className="space-y-4">
            <p>This is a test modal with some content.</p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
} 