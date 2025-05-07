"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Link2 as Link2Icon, Settings as SettingsIcon, Save } from "lucide-react"

import type { Link1tPageData } from "./types" // Import shared types
import { AppearanceSettings } from "./components/AppearanceSettings"
import { LinksManager } from "./components/LinksManager"
import { PageSettings } from "./components/PageSettings"
import { LivePreview } from "./components/LivePreview"

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
      backgroundImageUrl: undefined,
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
      // TODO: Fetch user's actual Link1t page data from your backend
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
    // TODO: Implement API call to save currentPageData
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
        <p>Please sign in to access the dashboard.</p>
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

          <div
            className="lg:col-span-1 px-4 py-6 bg-card rounded-lg shadow-md sticky top-24 self-start overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 6rem)' }}
          >
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