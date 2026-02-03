# PRD: Project "Unflatten" (Screenshot-to-Figma SLC)

## 1. Executive Summary

**Goal:** Build a SaaS tool that converts static screenshots (specifically mobile apps) into editable, auto-layout ready Figma designs.
**Core Mechanism:** The system uses an LLM (Vision capabilities) to "vibe code" the screenshot into an intermediate HTML/Tailwind representation, renders it, and then programmatically converts that DOM structure into Figma nodes.

## 2. User Flow

1. **Input:** User uploads a screenshot (PNG/JPG) of a mobile app interface.
2. **Processing (The Black Box):**
* System sends image to Vision LLM.
* LLM generates precise React/Tailwind code to replicate the visual.
* System renders this code in a sandbox (invisible to user).
* System traverses the rendered DOM to extract computed styles and structure.


3. **Output:** User receives a `.fig` file OR a link to a Figma plugin that pastes the design directly into their canvas.

## 3. Technical Architecture (For AI Agent Context)

### Phase 1: The "Vibe Coding" Engine (Image -> Code)

* **Model:** GPT-4o or Claude 3.5 Sonnet (Vision).
* **Prompt Strategy:** The prompt must strictly enforce "Pixel Perfect" replication using **Tailwind CSS**.
* **Output Format:** JSON containing a single field `code` with the raw JSX string.
* **Constraint:** No external CSS files. All styling must be utility classes (Tailwind) or inline styles to ensure easy parsing later.

### Phase 2: The "Ghost Renderer" (Code -> Computed Data)

* **Mechanism:** Render the generated component in a hidden `iframe` or a headless browser context.
* **Extraction:** Write a script to traverse this "Ghost DOM."
* For every node, capture: `boundingBox`, `computedStyles` (color, font, radius, padding), `flex` properties (for Auto Layout), and text content.
* **Output:** A simplified recursive JSON tree representing the visual layers (The "Bridge JSON").



### Phase 3: The Figma Converter (Data -> Design)

* **Interface:** A Figma Plugin (easier for SLC than the REST API for creating complex layouts).
* **Logic:** The plugin reads the "Bridge JSON" and maps it to Figma API calls:
* `<div>` with `flex` -> `createFrame()` with `layoutMode: "AUTO"`.
* `<img>` -> `createRectangle()` with Image Fill.
* `<p>` -> `createText()` with exact font properties.



## 4. SLC (simple, lovable, complete) Features 

### Frontend (Next.js)

* Simple Drag & Drop upload zone.
* "Processing" state indicator (essential since LLM generation takes ~30s).
* Preview window: Show the *generated HTML* side-by-side with the *original screenshot* as a sanity check before Figma conversion.

### Backend (API Routes)

* `/api/generate-code`: Handles the OpenAI/Anthropic call.
* `/api/parse-dom`: (Optional) If running headless browser on server, or handle parsing client-side.

### Figma Plugin

* A "paster" plugin that takes the JSON payload and draws the UI.

## 5. Project Prompt for Agents

> "I want to build a Next.js application that acts as a bridge between screenshots and Figma.
> **The Workflow:**
> 1. User uploads a UI screenshot.
> 2. Send image to OpenAI GPT-4o Vision. Ask it to 'recreate this UI code using React and Tailwind CSS. Be extremely precise with spacing, colors, and font sizes.'
> 3. Render the returned code on a hidden part of the screen.
> 4. Create a utility function `domToFigmaJSON(element)` that recursively traverses the rendered element. It should use `window.getComputedStyle` to extract: background colors, border radius, flex direction, gap, padding, font-family, font-size, and text content.
> 5. Output this JSON so it can be copied.
> 
> 
> Let's start by setting up the Next.js project and the API route for the Vision LLM."

## 6. Success Metrics (Validation)

* **Fidelity:** Does the text in Figma match the screenshot?
* **Editability:** Are the resulting frames using Auto Layout, or are they just absolute positioned rectangles? (Success = Auto Layout).

---

### A Note for your prototype:

When you run this with Antigravity, the hardest part will be the **DOM-to-Figma mapping**.

* *Tip:* Tell Cursor to "Prioritize Flexbox translation." If the LLM generates a `div` with `flex-row`, the Figma plugin *must* set `layoutMode = "HORIZONTAL"`. This is the feature that beats competitors like `html.to.design`.
