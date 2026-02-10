# Unflatten

**Unflatten** is an AI-powered design tool that converts static mobile app screenshots into editable, auto-layout ready Figma designs.

It uses **Gemini 3 Flash** to "vibe code" the visual design into a React + Tailwind implementation, then programmatically traverses the rendered DOM to extract computed styles (flexbox, padding, colors) for Figma.

![Unflatten Preview](https://placehold.co/800x400/18181b/white?text=Unflatten+Screenshot+to+Figma)

## Features

- **Drag & Drop Upload**: Simple interface to upload mobile UI screenshots.
- **Vibe Coding Engine**: leveraging Gemini 3 Flash to generate pixel-perfect Tailwind CSS.
- **Ghost Renderer**: A sandboxed environment to render and analyze the generated code.
- **Auto Layout Extraction**: Intelligently converts DOM flexbox structures into Figma Auto Layout frames.
- **Figma Plugin**: A dedicated plugin to paste and draw the extracted design directly in Figma.

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **AI**: Google Gemini 3 Flash
- **Figma**: Plugin API

## Getting Started

### Prerequisites

You need a Google Gemini API Key.

1. Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=AIza-your-key-here
   ```

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building the Plugin (Distribution)

To create a distributable zip file for the Figma plugin:

1. Run the build command:
   ```bash
   npm run build:plugin
   ```
2. This will create a `public/unflatten-plugin.zip` file.
3. You can download and install this zip file via the `/install` page in the running app.

## How to use (Figma Workflow)

1. **Upload**: Drop a screenshot into the web app.
2. **Generate**: Wait for the AI to generate the code.
3. **Copy JSON**: Click the **Copy for Figma** button in the preview window.
4. **Open Figma**:
   - Go to **Main Menu** > **Plugins** > **Development** > **Import plugin from manifest...**
   - Select `figma-plugin/manifest.json` from this project folder.
   - Run the **Unflatten Paster** plugin.
5. **Paste**: Paste the JSON data into the plugin window and click **Draw**.

## Limitations (SLC Prototype)

- **Icons**: Currently assumes standard Lucide icons; custom icons in screenshots may be replaced or missing.
- **Complex Layouts**: Highly complex grids may fall back to simple frames if the AI generation is ambiguous.
- **Images**: Images are currently replaced with placeholders or their source URLs if accessible.

## License

MIT
