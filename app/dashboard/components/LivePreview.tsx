"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Image as ImageIcon } from "lucide-react"
import type { Link1tPageData } from "../types"

interface LivePreviewProps {
  pageData: Partial<Link1tPageData>;
}

export const LivePreview = ({ pageData }: LivePreviewProps) => {
  const theme = pageData.theme || { backgroundType: "color" }

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
    backgroundColor: theme.backgroundColor || '#FFFFFF',
  };

  if (theme.backgroundType === 'image' && theme.backgroundImageUrl) {
    previewCardContentStyles.backgroundImage = `url(${theme.backgroundImageUrl})`;
  }

  return (
    <>
      <Card className="w-full max-w-[300px] mx-auto shadow-xl overflow-hidden border-4 border-foreground rounded-[30px]">
        <CardHeader className="bg-foreground p-2 text-center relative h-[20px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-background/50 rounded-full"></div>
        </CardHeader>
        <CardContent
          className="p-0 aspect-[9/19.5] overflow-y-auto bg-cover bg-center bg-no-repeat"
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
              style={{ color: theme.textColor }}
            >
              {pageData.displayName || "Your Name"}
            </h2>
            <p
              className="text-sm"
              style={{ color: theme.textColor, opacity: 0.9 }}
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
    </>
  )
}