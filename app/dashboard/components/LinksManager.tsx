"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Trash2, Link2 as Link2Icon, GripVertical } from "lucide-react"
import type { LinkItem } from "../types"

interface LinksManagerProps {
  links: LinkItem[];
  onUpdate: (links: LinkItem[]) => void;
}

export const LinksManager = ({ links, onUpdate }: LinksManagerProps) => {
  // const [editingLink, setEditingLink] = useState<LinkItem | null>(null) // Keep if you plan to use a modal

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: "New Link",
      url: "https://",
      enabled: true,
    }
    onUpdate([...links, newLink])
  }

  const handleUpdateLink = (updatedLink: LinkItem) => {
    onUpdate(links.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
    // setEditingLink(null) // Keep if you plan to use a modal
  }

  const handleDeleteLink = (linkId: string) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      onUpdate(links.filter((link) => link.id !== linkId))
    }
  }

  const handleToggleEnable = (linkId: string) => {
    onUpdate(links.map((link) => (link.id === linkId ? { ...link, enabled: !link.enabled } : link)))
  }

  return (
    // Added bg-card/80 backdrop-blur-sm to the main Card for consistency with dashboard background effect
    <Card className="bg-card/80 dark:bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link2Icon className="mr-2 h-5 w-5 text-primary" /> Manage Links
        </CardTitle>
        <CardDescription>Add, edit, reorder, and toggle your links.</CardDescription>
      </CardHeader>
      {/* Increased space-y from 3 to 4 */}
      <CardContent className="space-y-4">
        {links.map((link) => (
          <Card
            key={link.id}
            // Adjusted background of individual link cards for the new dashboard theme
            className={`p-3 ${!link.enabled ? "opacity-60 bg-muted/40 dark:bg-muted/30" : "bg-background/50 dark:bg-background/40"} backdrop-blur-sm rounded-md shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span title="Drag to reorder (not implemented)">
                  <GripVertical
                    className="h-5 w-5 text-muted-foreground cursor-grab"
                  />
                </span>
                <div>
                  <Input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleUpdateLink({ ...link, title: e.target.value })}
                    className="text-md font-medium border-0 focus:ring-0 mb-2 h-auto bg-transparent"
                    placeholder="Link Title"
                  />
                  <Input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleUpdateLink({ ...link, url: e.target.value })}
                    className="text-xs text-muted-foreground border-0 focus:ring-0 h-auto bg-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Switch
                  checked={link.enabled}
                  onCheckedChange={() => handleToggleEnable(link.id)}
                  aria-label="Toggle link visibility"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteLink(link.id)}
                  className="text-destructive hover:text-destructive"
                  title="Delete Link"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {links.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No links added yet. Click below to add your first link!
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddLink} variant="outline" className="w-full bg-background/50 hover:bg-background/70 dark:bg-background/40 dark:hover:bg-background/60 backdrop-blur-sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Link
        </Button>
      </CardFooter>
    </Card>
  )
}