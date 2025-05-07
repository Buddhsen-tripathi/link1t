"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Image as ImageIcon } from "lucide-react"
import type { Link1tPageData } from "../types"

interface LivePreviewProps {
  pageData: Partial<Link1tPageData>;
}

export const LivePreview = ({ pageData }: LivePreviewProps) => {
  const theme = pageData.theme || { 
    backgroundType: "color", 
    backgroundColor: "#FFFFFF", 
    textColor: "#000000",       
    font: "inherit",            
  }

  const getButtonBaseClasses = () => {
    // Added 'block' to ensure each link button takes its own line
    let base = "block w-full py-2.5 sm:py-3 px-4 text-center font-medium transition-all duration-200 ease-in-out shadow-sm";
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
    color: theme.textColor,
    fontFamily: theme.font,
    backgroundColor: theme.backgroundType === 'color' || !theme.backgroundImageUrl ? theme.backgroundColor : undefined,
    backgroundImage: theme.backgroundType === 'image' && theme.backgroundImageUrl ? `url(${theme.backgroundImageUrl})` : undefined,
  };

  return (
    <>
      <Card className="w-full max-w-[300px] mx-auto shadow-xl overflow-hidden border-4 border-foreground rounded-[30px] bg-card/80 dark:bg-card/70 backdrop-blur-sm">
        <CardHeader className="bg-foreground/80 dark:bg-foreground/70 p-2 text-center relative h-[20px] backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-background/50 rounded-full"></div>
        </CardHeader>
        <CardContent
          className="p-0 aspect-[9/18] overflow-y-auto bg-cover bg-center bg-no-repeat"
          style={previewCardContentStyles}
        >
          <div className="px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center w-full">
            <div className="mb-3">
              {pageData.avatarUrl ? (
                <img
                  src={pageData.avatarUrl}
                  alt="Avatar"
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 shadow-md"
                  style={{ borderColor: pageData.avatarBorderColor || "transparent" }}
                />
              ) : (
                <div
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted flex items-center justify-center border-4 shadow-md"
                  style={{ borderColor: pageData.avatarBorderColor || "transparent" }}
                >
                  <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
                </div>
              )}
            </div>

            <h2
              className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 text-center"
            >
              {pageData.displayName || "Your Name"}
            </h2>

            <p
              className="text-xs sm:text-sm leading-snug text-center mb-4 sm:mb-5"
            >
              {pageData.bio || "Your bio will appear here."}
            </p>

            <div className="w-full max-w-xs mx-auto space-y-3">
              {(pageData.links || [])
                .filter((l) => l.enabled)
                .map((link) => {
                  const baseButtonClasses = getButtonBaseClasses(); // This now includes 'block'
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
                        ? `3px 3px 0px ${theme.buttonShadowColor || "#1E3A8A"}`
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
                <p className="text-xs text-muted-foreground text-center py-3 sm:py-4">
                  Your active links will appear here!
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-xs text-center text-muted-foreground mt-2">Live Preview</p>
    </>
  )
}