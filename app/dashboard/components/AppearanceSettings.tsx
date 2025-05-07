"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle, Image as ImageIcon, Paintbrush } from "lucide-react"
import type { Link1tPageData } from "../types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AppearanceSettingsProps {
  profileData: Pick<Link1tPageData, "avatarUrl" | "avatarBorderColor" | "displayName" | "bio">;
  themeData: Link1tPageData["theme"];
  onProfileUpdate: (data: Partial<Pick<Link1tPageData, "avatarUrl" | "avatarBorderColor" | "displayName" | "bio">>) => void;
  onThemeUpdate: (data: Partial<Link1tPageData["theme"]>) => void;
}

const formatHexColor = (value: string): string => {
  if (value === undefined || value === null) return "";
  let hex = String(value).startsWith("#") ? String(value) : `#${String(value)}`;
  hex = hex.replace(/[^#0-9a-fA-F]/g, '');
  
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  if (hex.length > 7) {
    hex = hex.substring(0, 7);
  }
  return hex;
};

export const AppearanceSettings = ({
  profileData,
  themeData,
  onProfileUpdate,
  onThemeUpdate,
}: AppearanceSettingsProps) => {

  const handleColorInputChange = (
    value: string, 
    updateFn: (field: any, val: any) => void, 
    field: keyof typeof profileData | keyof Link1tPageData["theme"]
  ) => {
    const formattedColor = formatHexColor(value);
    updateFn(field, formattedColor);
  };
  
  const handleColorPickerChange = (
    value: string,
    updateFn: (field: any, val: any) => void,
    field: keyof typeof profileData | keyof Link1tPageData["theme"]
  ) => {
     updateFn(field, value);
  }

  const handleProfileChange = (field: keyof typeof profileData, value: any) => {
    onProfileUpdate({ [field]: value })
  }
  const handleThemeChange = (field: keyof Link1tPageData["theme"], value: any) => {
    onThemeUpdate({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/80 dark:bg-card/70 backdrop-blur-sm">
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
              <Input 
                id="avatarUrl"
                type="url"
                placeholder="https://example.com/avatar.png"
                value={profileData.avatarUrl || ""}
                onChange={(e) => handleProfileChange("avatarUrl", e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">Enter image URL. Recommended: Square image, 200x200px.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarBorderColor">Avatar Border Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="avatarBorderColorPicker"
                type="color"
                value={profileData.avatarBorderColor || "#000000"}
                onChange={(e) => handleColorPickerChange(e.target.value, handleProfileChange, "avatarBorderColor")}
                className="p-1 h-10 w-12 rounded-md cursor-pointer"
              />
              <Input
                id="avatarBorderColorText"
                type="text"
                value={profileData.avatarBorderColor || "#000000"}
                onChange={(e) => handleColorInputChange(e.target.value, handleProfileChange, "avatarBorderColor")}
                onBlur={(e) => handleColorInputChange(e.target.value, handleProfileChange, "avatarBorderColor")}
                placeholder="#000000"
                className="flex-grow"
              />
            </div>
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

      <Card className="bg-card/80 dark:bg-card/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Paintbrush className="mr-2 h-5 w-5 text-primary" /> Theme
          </CardTitle>
          <CardDescription>Personalize the look and feel of your Link1t page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Background Type</Label>
            <RadioGroup
              value={themeData.backgroundType || "color"}
              onValueChange={(value) => handleThemeChange("backgroundType", value as "color" | "image")}
              className="flex space-x-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="color" id="bg-type-color" />
                <Label htmlFor="bg-type-color" className="font-normal">Solid Color</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="bg-type-image" />
                <Label htmlFor="bg-type-image" className="font-normal">Image URL</Label>
              </div>
            </RadioGroup>
          </div>

          {themeData.backgroundType === "color" && (
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="backgroundColorPicker"
                  type="color"
                  value={themeData.backgroundColor || "#FFFFFF"}
                  onChange={(e) => handleColorPickerChange(e.target.value, handleThemeChange, "backgroundColor")}
                  className="p-1 h-10 w-12 rounded-md cursor-pointer"
                />
                <Input
                  id="backgroundColorText"
                  type="text"
                  value={themeData.backgroundColor || "#FFFFFF"}
                  onChange={(e) => handleColorInputChange(e.target.value, handleThemeChange, "backgroundColor")}
                  onBlur={(e) => handleColorInputChange(e.target.value, handleThemeChange, "backgroundColor")}
                  placeholder="#FFFFFF"
                  className="flex-grow"
                />
              </div>
            </div>
          )}
          
          {themeData.backgroundType === "image" && (
            <div className="space-y-2">
              <Label htmlFor="backgroundImageUrl">Background Image URL</Label>
              <Input
                id="backgroundImageUrl"
                type="url"
                placeholder="https://example.com/your-image.jpg"
                value={themeData.backgroundImageUrl || ""}
                onChange={(e) => handleThemeChange("backgroundImageUrl", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Recommended: 16:9 image. Overrides background color if set.</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
             <div className="flex items-center space-x-2">
                <Input
                  id="textColorPicker"
                  type="color"
                  value={themeData.textColor || "#000000"}
                  onChange={(e) => handleColorPickerChange(e.target.value, handleThemeChange, "textColor")}
                  className="p-1 h-10 w-12 rounded-md cursor-pointer"
                />
                <Input
                  id="textColorText"
                  type="text"
                  value={themeData.textColor || "#000000"}
                  onChange={(e) => handleColorInputChange(e.target.value, handleThemeChange, "textColor")}
                  onBlur={(e) => handleColorInputChange(e.target.value, handleThemeChange, "textColor")}
                  placeholder="#000000"
                  className="flex-grow"
                />
              </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="font">Font Family</Label>
            <Select
              value={themeData.font || "Inter, sans-serif"}
              onValueChange={(value) => handleThemeChange("font", value)}
            >
              <SelectTrigger id="font">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter, sans-serif">Inter (Default)</SelectItem>
                <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                <SelectItem value="Georgia, serif">Georgia</SelectItem>
                <SelectItem value="'Times New Roman', Times, serif">Times New Roman</SelectItem>
                <SelectItem value="'Courier New', Courier, monospace">Courier New</SelectItem>
              </SelectContent>
            </Select>
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
            <div className="flex items-center space-x-2">
                <Input
                  id="buttonColorPicker"
                  type="color"
                  value={themeData.buttonColor || "#3B82F6"}
                  onChange={(e) => handleColorPickerChange(e.target.value, handleThemeChange, "buttonColor")}
                  className="p-1 h-10 w-12 rounded-md cursor-pointer"
                />
                <Input
                  id="buttonColorText"
                  type="text"
                  value={themeData.buttonColor || "#3B82F6"}
                  onChange={(e) => handleColorInputChange(e.target.value, handleThemeChange, "buttonColor")}
                  onBlur={(e) => handleColorInputChange(e.target.value, handleThemeChange, "buttonColor")}
                  placeholder="#3B82F6"
                  className="flex-grow"
                />
              </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonTextColor">Button Text Color</Label>
            <div className="flex items-center space-x-2">
                <Input
                  id="buttonTextColorPicker"
                  type="color"
                  value={themeData.buttonTextColor || "#FFFFFF"}
                  onChange={(e) => handleColorPickerChange(e.target.value, handleThemeChange, "buttonTextColor")}
                  className="p-1 h-10 w-12 rounded-md cursor-pointer"
                />
                <Input
                  id="buttonTextColorText"
                  type="text"
                  value={themeData.buttonTextColor || "#FFFFFF"}
                  onChange={(e) => handleColorInputChange(e.target.value, handleThemeChange, "buttonTextColor")}
                  onBlur={(e) => handleColorInputChange(e.target.value, handleThemeChange, "buttonTextColor")}
                  placeholder="#FFFFFF"
                  className="flex-grow"
                />
              </div>
          </div>
          {themeData.buttonStyle === "hard-shadow" && (
            <div className="space-y-2">
              <Label htmlFor="buttonShadowColor">Button Shadow Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="buttonShadowColorPicker"
                  type="color"
                  value={themeData.buttonShadowColor || "#1E3A8A"}
                  onChange={(e) => handleColorPickerChange(e.target.value, handleThemeChange, "buttonShadowColor")}
                  className="p-1 h-10 w-12 rounded-md cursor-pointer"
                />
                <Input
                  id="buttonShadowColorText"
                  type="text"
                  value={themeData.buttonShadowColor || "#1E3A8A"}
                  onChange={(e) => handleColorInputChange(e.target.value, handleThemeChange, "buttonShadowColor")}
                  onBlur={(e) => handleColorInputChange(e.target.value, handleThemeChange, "buttonShadowColor")}
                  placeholder="#1E3A8A"
                  className="flex-grow"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}