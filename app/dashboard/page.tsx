"use client"

import { useState, useEffect} from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  PlusCircle,
  Edit3,
  Trash2,
  Palette,
  Link2 as Link2Icon,
  Settings as SettingsIcon,
  UserCircle,
  Image as ImageIcon,
  Paintbrush,
  Save,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react"

type LinkItem = {
  id: string
  title: string
  url: string
  enabled: boolean
  icon?: string
}

type Link1tPageData = {
  id: string
  userId: string
  slug: string
  username?: string
  avatarUrl?: string
  avatarBorderColor?: string
  displayName?: string
  bio?: string
  links: LinkItem[]
  theme: {
    backgroundType: "color" | "gradient" | "image"; // Added 'image'
    backgroundColor?: string;
    backgroundImageUrl?: string; // New field for background image
    gradient?: { from: string; to: string; direction: string }
    font?: string
    textColor?: string
    buttonStyle?: "filled" | "outline" | "rounded-filled" | "rounded-outline" | "hard-shadow"
    buttonColor?: string
    buttonTextColor?: string
    buttonShadowColor?: string
  }
  isPublic: boolean
  customDomain?: string
}

const AppearanceSettings = ({
  profileData,
  themeData,
  onProfileUpdate,
  onThemeUpdate,
}: {
  profileData: Pick<Link1tPageData, "avatarUrl" | "avatarBorderColor" | "displayName" | "bio">
  themeData: Link1tPageData["theme"]
  onProfileUpdate: (data: Partial<Pick<Link1tPageData, "avatarUrl" | "avatarBorderColor" | "displayName" | "bio">>) => void
  onThemeUpdate: (data: Partial<Link1tPageData["theme"]>) => void
}) => {
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
                onThemeUpdate({
                  backgroundImageUrl: imageUrl,
                  backgroundType: imageUrl ? 'image' : (themeData.backgroundColor ? 'color' : 'gradient'), // Keep existing type if no image
                });
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

const LinksManager = ({
  links,
  onUpdate,
}: {
  links: LinkItem[]
  onUpdate: (links: LinkItem[]) => void
}) => {
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null)

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
    setEditingLink(null)
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link2Icon className="mr-2 h-5 w-5 text-primary" /> Manage Links
        </CardTitle>
        <CardDescription>Add, edit, reorder, and toggle your links.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {links.map((link, index) => (
          <Card
            key={link.id}
            className={`p-3 ${!link.enabled ? "opacity-60 bg-muted/50" : "bg-card"}`}
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
                    className="text-md font-medium border-0 focus:ring-0 p-0 h-auto bg-transparent"
                    placeholder="Link Title"
                  />
                  <Input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleUpdateLink({ ...link, url: e.target.value })}
                    className="text-xs text-muted-foreground border-0 focus:ring-0 p-0 h-auto bg-transparent"
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
        <Button onClick={handleAddLink} variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Link
        </Button>
      </CardFooter>
    </Card>
  )
}

const PageSettings = ({
  settings,
  onUpdate,
}: {
  settings: Pick<Link1tPageData, "isPublic" | "username" | "slug">
  onUpdate: (data: Partial<Pick<Link1tPageData, "isPublic" | "username" | "slug">>) => void
}) => {
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
        <div className="space-y-2"> {/* Group for Username option */}
          <Label htmlFor="username">Public Username (@username)</Label>
          <div className="flex items-center"> {/* Removed mt-1, parent space-y-2 handles it */}
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
          <p className="text-xs text-muted-foreground"> {/* Removed mt-1 */}
            This will be your public page URL. Only letters, numbers, underscores, dots, hyphens.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1"> {/* Added space-y-1 for label and description */}
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

const LivePreview = ({ pageData }: { pageData: Partial<Link1tPageData> }) => {
  const theme = pageData.theme || { backgroundType: "color" } // Ensure theme exists

  const getButtonBaseClasses = () => {
    let base = "w-full py-3 px-4 text-center font-medium transition-all duration-200 ease-in-out shadow-sm";
    switch (theme.buttonStyle) {
      case "filled":
        base += " rounded-md hover:opacity-90";
        break;
      case "outline":
        base += " border-2 rounded-md";
        break;
      case "rounded-filled":
        base += " rounded-full hover:opacity-90";
        break;
      case "rounded-outline":
        base += " border-2 rounded-full";
        break;
      case "hard-shadow":
        base += " rounded-md border-2";
        base += " active:translate-y-0.5 active:translate-x-0.5";
        break;
      default:
        base += " bg-primary text-primary-foreground rounded-md hover:bg-primary/90";
        break;
    }
    return base;
  }

  const previewCardContentStyles: React.CSSProperties = {
    color: theme.textColor || '#000000',
    fontFamily: theme.font || 'inherit',
    backgroundColor: theme.backgroundColor || '#FFFFFF', // Always apply background color as fallback
  };

  if (theme.backgroundType === 'image' && theme.backgroundImageUrl) {
    previewCardContentStyles.backgroundImage = `url(${theme.backgroundImageUrl})`;
  }
  // Future: else if (theme.backgroundType === 'gradient' && theme.gradient) { ... }


  return (
    <div className="sticky top-24 lg:max-h-[calc(100vh-7rem)]">
      <Card className="w-full max-w-[300px] mx-auto shadow-xl overflow-hidden border-4 border-foreground rounded-[30px]">
        <CardHeader className="bg-foreground p-2 text-center relative h-[20px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-background/50 rounded-full"></div>
        </CardHeader>
        <CardContent
          className="p-0 aspect-[9/19.5] overflow-y-auto bg-cover bg-center bg-no-repeat" // Tailwind classes for image display
          style={previewCardContentStyles}
        >
          <div className="p-5 space-y-4 text-center flex flex-col items-center min-h-full">
            {pageData.avatarUrl ? (
              <img
                src={pageData.avatarUrl}
                alt="Avatar"
                className="h-24 w-24 rounded-full object-cover mt-4 border-4 shadow-md"
                style={{ borderColor: pageData.avatarBorderColor || "transparent" }}
              />
            ) : (
              <div
                className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mt-4 border-4 shadow-md"
                style={{ borderColor: pageData.avatarBorderColor || "transparent" }}
              >
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <h2
              className="text-2xl font-bold mt-2"
              style={{ color: theme.textColor }} // Text color still applies directly
            >
              {pageData.displayName || "Your Name"}
            </h2>
            <p
              className="text-sm"
              style={{ color: theme.textColor, opacity: 0.9 }} // Text color still applies directly
            >
              {pageData.bio || "Your bio will appear here."}
            </p>

            <div className="space-y-3 pt-3 w-full max-w-xs mx-auto">
              {(pageData.links || [])
                .filter((l) => l.enabled)
                .map((link) => {
                  const baseButtonClasses = getButtonBaseClasses();
                  const dynamicButtonStyles: React.CSSProperties = theme.buttonStyle ? {
                    backgroundColor:
                      theme.buttonStyle === "filled" ||
                      theme.buttonStyle === "rounded-filled" ||
                      theme.buttonStyle === "hard-shadow"
                        ? theme.buttonColor || "#3B82F6"
                        : "transparent",
                    color:
                      theme.buttonStyle === "filled" ||
                      theme.buttonStyle === "rounded-filled" ||
                      theme.buttonStyle === "hard-shadow"
                        ? theme.buttonTextColor || "#FFFFFF"
                        : theme.buttonColor || "#3B82F6",
                    borderColor:
                      theme.buttonStyle === "outline" ||
                      theme.buttonStyle === "rounded-outline" ||
                      theme.buttonStyle === "hard-shadow"
                        ? theme.buttonColor || "#3B82F6"
                        : "transparent",
                    boxShadow:
                      theme.buttonStyle === "hard-shadow"
                        ? `3px 3px 0px ${theme.buttonShadowColor || "black"}`
                        : undefined,
                  } : {};

                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseButtonClasses}
                      style={dynamicButtonStyles}
                    >
                      {link.title}
                    </a>
                  );
                })}
              {!(pageData.links || []).filter((l) => l.enabled).length && (
                <p className="text-xs text-muted-foreground py-4">
                  Your active links will appear here!
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-xs text-center text-muted-foreground mt-2">Live Preview</p>
    </div>
  )
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [currentPageData, setCurrentPageData] = useState<Partial<Link1tPageData>>({
    id: "default-page-id",
    userId: user?.id || "temp-user-id",
    slug: "mypage",
    username: user?.username || "yourname",
    avatarUrl: undefined,
    avatarBorderColor: "#3B82F6",
    displayName: "Your Name Here",
    bio: "Welcome to my Link1t page! Discover more about me below.",
    links: [
      { id: "link1", title: "My Portfolio", url: "#", enabled: true },
      { id: "link2", title: "Follow me on X", url: "#", enabled: true },
      { id: "link3", title: "Subscribe to Newsletter", url: "#", enabled: false },
    ],
    theme: {
      backgroundType: "color",
      backgroundColor: "#F9FAFB",
      textColor: "#1F2937",
      font: "Inter, sans-serif",
      buttonStyle: "rounded-filled",
      buttonColor: "#3B82F6",
      buttonTextColor: "#FFFFFF",
      buttonShadowColor: "#1E3A8A",
    },
    isPublic: false,
  })
  const [activeTab, setActiveTab] = useState("appearance")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setCurrentPageData((prev) => ({
        ...prev,
        userId: user.id,
        username: user.username || prev.username,
      }))
    }
  }, [isLoaded, isSignedIn, user])

  const handleUpdatePageData = (updatedFields: Partial<Link1tPageData>) => {
    setCurrentPageData((prev) => ({ ...prev, ...updatedFields }))
  }

  const handleUpdateThemeData = (updatedThemeFields: Partial<Link1tPageData["theme"]>) => {
    setCurrentPageData((prev) => ({
      ...prev,
      theme: { ...(prev.theme as Link1tPageData["theme"]), ...updatedThemeFields },
    }))
  }

  const handleSaveChanges = async () => {
    if (!user) {
      alert("User not found. Please sign in again.")
      return
    }
    setIsSaving(true)
    console.log("Saving data to backend:", currentPageData)
    setTimeout(() => {
      alert("Changes saved (simulated)!")
      setIsSaving(false)
    }, 1000)
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/20">
        <p>Loading dashboard…</p>
      </div>
    )
  }

  if (!isSignedIn) {

    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/20">
        <p>Please login to access the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-background">
      <div className="container mx-auto px-2 sm:px-4 pt-20 pb-6 sm:pt-24 sm:pb-8">
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Link1t Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Customize your page, {user?.firstName || "User"}. Preview changes on the right.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
                <TabsTrigger
                  value="appearance"
                  className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
                >
                  <Palette className="mr-1.5 h-4 w-4 sm:mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="links"
                  className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
                >
                  <Link2Icon className="mr-1.5 h-4 w-4 sm:mr-2" />
                  Links
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
                >
                  <SettingsIcon className="mr-1.5 h-4 w-4 sm:mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="mt-6">
                <AppearanceSettings
                  profileData={{
                    avatarUrl: currentPageData.avatarUrl,
                    avatarBorderColor: currentPageData.avatarBorderColor,
                    displayName: currentPageData.displayName,
                    bio: currentPageData.bio,
                  }}
                  themeData={currentPageData.theme as Link1tPageData["theme"]}
                  onProfileUpdate={(data) => handleUpdatePageData(data)}
                  onThemeUpdate={(data) => handleUpdateThemeData(data)}
                />
              </TabsContent>
              <TabsContent value="links" className="mt-6">
                <LinksManager
                  links={currentPageData.links || []}
                  onUpdate={(updatedLinks) => handleUpdatePageData({ links: updatedLinks })}
                />
              </TabsContent>
              <TabsContent value="settings" className="mt-6">
                <PageSettings
                  settings={{
                    isPublic: currentPageData.isPublic || false,
                    username: currentPageData.username,
                    slug: currentPageData.slug || "",
                  }}
                  onUpdate={(data) => handleUpdatePageData(data)}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 px-4 py-6 bg-card rounded-lg shadow-md">
            <LivePreview pageData={currentPageData} />
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
              size="lg"
              className="w-full mt-6"
            >
              <Save className="mr-2 h-5 w-5" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}