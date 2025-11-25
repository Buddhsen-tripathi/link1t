# Link1t Portfolio Generator - Project Context

## Overview
Link1t is a **Developer Portfolio Generator** app that allows users to create professional developer portfolios instantly. Users can upload their resume, let AI parse it, and get a shareable portfolio URL.

## Tech Stack
- **Framework**: Next.js 15 with Turbopack
- **Auth**: Clerk
- **Database**: Supabase (table: `portfolios` with `slug` and `data` columns)
- **Storage**: Cloudflare R2 (AWS S3-compatible)
- **AI**: OpenRouter API with `google/gemini-2.0-flash-001` for resume parsing
- **Styling**: Tailwind CSS v4, Radix UI components
- **Date Picker**: react-day-picker v9, date-fns

## Project Structure
```
app/
  layout.tsx              # Root layout with Clerk, ThemeProvider
  page.tsx                # Homepage (Hero, Features, CTA)
  generator/
    page.tsx              # 3-step portfolio generator (username → method → form)
  p/[username]/
    page.tsx              # Dynamic portfolio display page
  api/
    check-username/route.ts   # Check username availability
    generate/route.ts         # Save portfolio to Supabase
    parse-resume/route.ts     # AI resume parsing (Gemini 2.0 Flash)
    upload/route.ts           # Upload files to R2
    image/[...path]/route.ts  # Image proxy from R2

components/
  Navbar.tsx              # Site navigation with Clerk auth
  Hero.tsx                # Homepage hero section
  Features.tsx            # Feature highlights
  CallToAction.tsx        # CTA section
  Footer.tsx              # Site footer
  generator/
    PortfolioForm.tsx     # Main form with tabs (Hero, Experience, Projects)
  portfolio/
    HeroSection.tsx       # Portfolio hero display
    Experience.tsx        # Work experience section
    FeaturedProjects.tsx  # Projects grid
  ui/                     # Radix-based UI components
    button.tsx, card.tsx, input.tsx, label.tsx, select.tsx,
    tabs.tsx, textarea.tsx, checkbox.tsx, popover.tsx, calendar.tsx

lib/
  utils.ts                # cn() utility
  supabaseServer.ts       # Server-side Supabase client
  supabaseClient.ts       # Client-side Supabase client
  r2Client.ts             # Cloudflare R2 S3 client

types/
  portfolio.ts            # TypeScript interfaces (PortfolioData, Experience, Project, etc.)
```

## Key Features
1. **Resume Upload with AI Parsing**: Upload PDF/DOC/TXT, Gemini 2.0 Flash extracts structured data
2. **Manual Form Entry**: Tab-based form (Hero, Experience, Projects)
3. **Form Validation**: Required fields - Name, Email, Experience (company/role), Project (title/description/image)
4. **TagInput Component**: For subtitles and technologies (type + Enter)
5. **DatePicker with Dropdowns**: Month/year navigation for experience dates
6. **Project Active/Inactive Toggle**: Checkbox to mark project status
7. **Image Uploads**: Profile image, company logos, project screenshots → R2 storage
8. **Instant Publishing**: Get live URL at `/p/{username}`

## Portfolio Data Structure
```typescript
interface PortfolioData {
  slug: string
  hero: {
    name: string
    email: string
    subtitle: string[]
    bio: string
    profileImage: string
    resumeUrl: string
    socialLinks: SocialLink[]
  }
  experiences: Experience[]  // company, role, period, logo, companyUrl, currentlyWorkHere
  projects: Project[]        // title, description, image, technologies, github, demo, active
}
```

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENROUTER_API_KEY=
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_IMAGE_BUCKET_NAME=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Generator Flow
1. **Username Step**: User enters desired username, checked for availability against Supabase
2. **Method Step**: Choose between "Upload Resume" (AI parsing) or "Fill Manually"
3. **Form Step**: Tab-based form with Hero, Experience, and Projects sections
4. **Success**: Portfolio saved to Supabase, user gets live URL with copy button

## API Endpoints
- `GET /api/check-username?slug=xxx` - Check if username is available
- `POST /api/parse-resume` - Upload resume file, returns parsed JSON data
- `POST /api/generate` - Save portfolio `{ slug, data }` to Supabase
- `POST /api/upload` - Upload file to R2, returns URL
- `GET /api/image/[...path]` - Proxy images from R2

## Notes
- react-day-picker v9 uses `Chevron` component (not IconLeft/IconRight)
- react-day-picker v9 `DropdownProps` has `options` array (not children)
- Images use Next.js `remotePatterns: [{ protocol: 'https', hostname: '**' }]`
- Clerk handles all authentication (login, signup, user management)
