export type LinkItem = {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  icon?: string; 
};

export type Link1tPageData = {
  id: string; 
  userId: string;
  slug: string; 
  username?: string;

  // Profile Section
  avatarUrl?: string;
  avatarBorderColor?: string; 
  displayName?: string;
  bio?: string;

  // Links Section
  links: LinkItem[];

  // Theme Section
  theme: {
    backgroundType: 'color' | 'gradient' | 'image';
    backgroundColor?: string; 
    backgroundImageUrl?: string;
    gradient?: { from: string; to: string; direction: string }; 
    font?: string; 
    textColor?: string; 
    buttonStyle?: 'filled' | 'outline' | 'rounded-filled' | 'rounded-outline' | 'hard-shadow';
    buttonColor?: string; 
    buttonTextColor?: string; 
    buttonShadowColor?: string; 
  };

  // Settings Section
  isPublic: boolean;
  customDomain?: string; 
};