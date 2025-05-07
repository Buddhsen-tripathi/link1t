"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings as SettingsIcon } from "lucide-react"
import type { Link1tPageData } from "../types"

interface PageSettingsProps {
  settings: Pick<Link1tPageData, "isPublic" | "username" | "slug">;
  onUpdate: (data: Partial<Pick<Link1tPageData, "isPublic" | "username" | "slug">>) => void;
}

export const PageSettings = ({ settings, onUpdate }: PageSettingsProps) => {
  const handleSettingChange = (field: keyof typeof settings, value: any) => {
    onUpdate({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <SettingsIcon className="mr-2 h-5 w-5 text-primary" /> Page Settings
        </CardTitle>
        <CardDescription>Configure your page's visibility and access URL.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username">Public Username (@username)</Label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-muted border border-r-0 rounded-l-md text-muted-foreground text-sm">
              link1t.com/@
            </span>
            <Input
              id="username"
              placeholder="yourname"
              value={settings.username || ""}
              onChange={(e) =>
                handleSettingChange(
                  "username",
                  e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, "")
                )
              }
              className="rounded-l-none"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            This will be your public page URL. Only letters, numbers, underscores, dots, hyphens.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <Label htmlFor="isPublic" className="font-medium">
              Page Visibility
            </Label>
            <p className="text-xs text-muted-foreground">
              {settings.isPublic
                ? "Your page is public and discoverable."
                : "Your page is private and only visible to you."}
            </p>
          </div>
          <Switch
            id="isPublic"
            checked={settings.isPublic}
            onCheckedChange={(checked) => handleSettingChange("isPublic", checked)}
            aria-label="Toggle page visibility"
          />
        </div>
      </CardContent>
    </Card>
  )
}