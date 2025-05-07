"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle, Image as ImageIcon, Paintbrush } from "lucide-react"
import type { Link1tPageData } from "../types"

interface AppearanceSettingsProps {
  profileData: Pick<Link1tPageData, "avatarUrl" | "avatarBorderColor" | "displayName" | "bio">;
  themeData: Link1tPageData["theme"];
  onProfileUpdate: (data: Partial<Pick<Link1tPageData, "avatarUrl" | "avatarBorderColor" | "displayName" | "bio">>) => void;
  onThemeUpdate: (data: Partial<Link1tPageData["theme"]>) => void;
}

export const AppearanceSettings = ({
  profileData,
  themeData,
  onProfileUpdate,
  onThemeUpdate,
}: AppearanceSettingsProps) => {
  const handleProfileChange = (field: keyof typeof profileData, value: any) => {
    onProfileUpdate({ [field]: value })
  }
  const handleThemeChange = (field: keyof typeof themeData, value: any) => {
    onThemeUpdate({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCircle className="mr-2 h-5 w-5 text-primary" /> Profile
          </CardTitle>
          <CardDescription>Set up your public profile information and avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            {profileData.avatarUrl ? (
              <img
                src={profileData.avatarUrl}
                alt="Avatar"
                className="h-20 w-20 rounded-full object-cover border-2"
                style={{ borderColor: profileData.avatarBorderColor || "transparent" }}
              />
            ) : (
              <div
                className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2"
                style={{ borderColor: profileData.avatarBorderColor || "transparent" }}
              >
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            <div className="space-y-1">
              <Button
                variant="outline"
                onClick={() => alert("Avatar upload placeholder: Implement file upload logic.")}
              >
                <ImageIcon className="mr-2 h-4 w-4" /> Upload Avatar
              </Button>
              <p className="text-xs text-muted-foreground">Recommended: Square image, 200x200px.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarBorderColor">Avatar Border Color</Label>
            <Input
              id="avatarBorderColor"
              type="color"
              value={profileData.avatarBorderColor || "#000000"}
              onChange={(e) => handleProfileChange("avatarBorderColor", e.target.value)}
              className="w-full h-10 p-1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name / Headline</Label>
            <Input
              id="displayName"
              placeholder="Your Name or Brand"
              value={profileData.displayName || ""}
              onChange={(e) => handleProfileChange("displayName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio (Optional)</Label>
            <textarea
              id="bio"
              placeholder="A little bit about you, your mission, or your links."
              value={profileData.bio || ""}
              onChange={(e) => handleProfileChange("bio", e.target.value)}
              className="w-full min-h-[80px] p-2 border rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Paintbrush className="mr-2 h-5 w-5 text-primary" /> Theme
          </CardTitle>
          <CardDescription>Personalize the look and feel of your Link1t page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color (Fallback)</Label>
            <Input
              id="backgroundColor"
              type="color"
              value={themeData.backgroundColor || "#FFFFFF"}
              onChange={(e) => handleThemeChange("backgroundColor", e.target.value)}
              className="w-full h-10 p-1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backgroundImageUrl">Background Image URL</Label>
            <Input
              id="backgroundImageUrl"
              type="url"
              placeholder="https://example.com/your-image.jpg"
              value={themeData.backgroundImageUrl || ""}
              onChange={(e) => {
                const imageUrl = e.target.value;
                handleThemeChange("backgroundImageUrl", imageUrl);
                // Also update backgroundType based on whether imageUrl is present
                handleThemeChange("backgroundType", imageUrl ? 'image' : 'color');
              }}
            />
            <p className="text-xs text-muted-foreground">Recommended: 16:9 image. Overrides background color if set.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <Input
              id="textColor"
              type="color"
              value={themeData.textColor || "#000000"}
              onChange={(e) => handleThemeChange("textColor", e.target.value)}
              className="w-full h-10 p-1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonStyle">Button Style</Label>
            <Select
              value={themeData.buttonStyle || "filled"}
              onValueChange={(value) =>
                handleThemeChange("buttonStyle", value as Link1tPageData["theme"]["buttonStyle"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select button style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filled">Filled</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="rounded-filled">Rounded Filled</SelectItem>
                <SelectItem value="rounded-outline">Rounded Outline</SelectItem>
                <SelectItem value="hard-shadow">Hard Shadow</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonColor">Button Color (Background/Border)</Label>
            <Input
              id="buttonColor"
              type="color"
              value={themeData.buttonColor || "#3B82F6"}
              onChange={(e) => handleThemeChange("buttonColor", e.target.value)}
              className="w-full h-10 p-1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonTextColor">Button Text Color</Label>
            <Input
              id="buttonTextColor"
              type="color"
              value={themeData.buttonTextColor || "#FFFFFF"}
              onChange={(e) => handleThemeChange("buttonTextColor", e.target.value)}
              className="w-full h-10 p-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}