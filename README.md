# Silhouettes Website

A minimalist website for the Silhouettes art collection, featuring white lines on black backgrounds.

## Features

- **Minimalist Design**: Black theme with white typography using Bebas Neue and Noto Sans fonts
- **Gallery**: High-resolution SVG artwork viewing and downloading (SVG/PNG formats)
- **Responsive**: Mobile-first design that works on all devices
- **Sections**: 
  - Home page with featured works
  - Gallery with download functionality
  - Exhibitions (past and upcoming)
  - Physical prints information
  - About the collection and artist
  - Interactive tools

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Adding Artwork

1. Place your SVG files in the `public/artworks/` directory
2. Update the artwork data in `components/GalleryGrid.tsx` to include your files

### Building for Production

```bash
npm run build
```

## Deployment to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure your custom domain in Vercel settings
4. Update your GoDaddy DNS to point to Vercel

### Domain Setup

To connect your GoDaddy domain to Vercel:

1. In Vercel dashboard, go to your project settings
2. Add your custom domain (e.g., silhouettes.io)
3. In GoDaddy DNS management, add these records:
   - A record: @ → 76.76.19.61
   - CNAME record: www → cname.vercel-dns.com

## Tools Integration

The existing HTML tools can be integrated by:

1. Creating `/public/tools/` directory
2. Adding your HTML tool files
3. Updating the tools page with correct URLs

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Typography**: Bebas Neue, Noto Sans
- **Icons**: Lucide React
- **Deployment**: Vercel

## License

© 2024 Silhouettes. All rights reserved. 