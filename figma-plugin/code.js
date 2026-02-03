// This plugin will open a UI to let the user paste the JSON from Unflatten
// Then it will draw the nodes.

figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async msg => {
    if (msg.type === 'draw-layout') {
        let layersToImport = [];
        try {
            const parsed = JSON.parse(msg.json);
            // Handle different possible structures from html-to-figma or custom
            if (Array.isArray(parsed)) {
                layersToImport = parsed;
            } else if (parsed.layers && Array.isArray(parsed.layers)) {
                layersToImport = parsed.layers;
            } else if (parsed.type) {
                // It's a single layer object
                layersToImport = [parsed];
            } else {
                console.warn("Parsed object has no clear layer structure:", parsed);
                // Fallback: try to treat it as a layer anyway, or maybe it is the old format?
                layersToImport = [parsed];
            }
        } catch (e) {
            figma.notify("Error: Invalid JSON. Make sure you clicked 'Copy for Figma' in the web app.", { error: true });
            return;
        }

        figma.notify("JSON Parsed. Loading fonts...");

        // Pre-load fonts
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        await figma.loadFontAsync({ family: "Inter", style: "Bold" });
        // Also try to load standard fonts if mentioned

        // We can add a font loader helper if needed later


        // Helper to process fills (especially images)
        async function processFills(fills) {
            if (!fills || !Array.isArray(fills)) return fills;

            const processedFills = [];
            for (const fill of fills) {
                // Check if it's an image fill that needs processing (has url but no hash)
                if (fill.type === 'IMAGE' && fill.url && !fill.imageHash) {
                    try {
                        console.log("Fetching image from:", fill.url.substring(0, 50) + "...");
                        const response = await fetch(fill.url);
                        const buffer = await response.arrayBuffer();
                        const image = figma.createImage(new Uint8Array(buffer));

                        const newFill = {
                            type: 'IMAGE',
                            imageHash: image.hash,
                            scaleMode: fill.scaleMode || 'FILL'
                        };
                        // Copy other potential properties
                        if (typeof fill.opacity === 'number') newFill.opacity = fill.opacity;
                        if (fill.blendMode) newFill.blendMode = fill.blendMode;
                        // Transform fallback
                        if (fill.imageTransform) newFill.imageTransform = fill.imageTransform;
                        if (fill.scalingFactor) newFill.scalingFactor = fill.scalingFactor;

                        processedFills.push(newFill);
                    } catch (err) {
                        console.error("Failed to load image from URL:", fill.url, err);
                        // Fallback to a placeholder
                        processedFills.push({
                            type: 'SOLID',
                            color: { r: 0.8, g: 0.8, b: 0.8 },
                            opacity: 0.5
                        });
                    }
                } else if (fill.type === 'IMAGE' && !fill.imageHash) {
                    // Image type but no URL and no Hash? Skip or solid
                    console.warn("Skipping invalid Image fill:", fill);
                } else {
                    // Pass through valid fills (SOLID, GRAIDENT, or already hashed images)
                    // Sanitize keys just in case (remove 'url' if it exists but we ignored it)
                    // const { url, ...cleanFill } = fill; // Object spread might cause syntax error in some environments
                    const cleanFill = Object.assign({}, fill);
                    delete cleanFill.url;
                    processedFills.push(cleanFill);
                }
            }
            return processedFills;
        }

        const nodes = [];

        async function importLayer(layer, parent) {
            let node;

            // 1. Create Node based on type
            if (layer.type === 'FRAME' || layer.type === 'GROUP') {
                node = figma.createFrame();
            } else if (layer.type === 'TEXT') {
                node = figma.createText();
            } else if (layer.type === 'RECTANGLE' || layer.type === 'IMAGE') {
                node = figma.createRectangle();
            } else if (layer.type === 'VECTOR' || layer.type === 'SVG') {
                if (layer.svg) {
                    node = figma.createNodeFromSvg(layer.svg);
                } else {
                    node = figma.createRectangle();
                }
            } else {
                console.warn("Skipping unknown layer type:", layer.type);
                return null;
            }

            // 2. Set Properties
            node.name = layer.name || 'Layer';

            // Safe resize
            const w = layer.width || 100;
            const h = layer.height || 100;
            if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
                node.resize(w, h);
            }
            node.x = layer.x || 0;
            node.y = layer.y || 0;


            // Fills - async
            if (layer.fills) {
                node.fills = await processFills(layer.fills);
            }

            // Strokes
            if (layer.strokes) {
                // Ensure we sanitize strokes too if needed, but usually they are simpler
                node.strokes = layer.strokes;
                if (layer.strokeWeight) node.strokeWeight = layer.strokeWeight;
            }

            // Opacity & Effects
            if (typeof layer.opacity === 'number') node.opacity = layer.opacity;
            if (layer.effects) node.effects = layer.effects;

            // Frame specific
            if (layer.type === 'FRAME' || layer.type === 'GROUP') {
                if (node.type === 'FRAME') {
                    // Border Radius
                    if (layer.cornerRadius) node.cornerRadius = layer.cornerRadius;

                    // Clips content
                    if (typeof layer.clipsContent === 'boolean') node.clipsContent = layer.clipsContent;
                }
            }

            // Text specific
            if (layer.type === 'TEXT') {
                // Font Load Check
                const fontFamily = layer.fontFamily || "Inter";
                const fontStyle = layer.fontWeight >= 600 ? "Bold" : "Regular";
                // We only loaded Inter, so fail-safe to Inter for now to avoid errors
                // Ideally we load the requested font dynamically.
                const fontName = { family: "Inter", style: fontStyle };

                try {
                    node.fontName = fontName;
                } catch (e) {
                    // Fallback
                    node.fontName = { family: "Inter", style: "Regular" };
                }

                node.characters = layer.characters || layer.text || "";
                node.fontSize = layer.fontSize || 16;
                if (layer.textAlignHorizontal) node.textAlignHorizontal = layer.textAlignHorizontal;
                if (layer.textAlignVertical) node.textAlignVertical = layer.textAlignVertical;
                if (layer.lineHeight) {
                    if (typeof layer.lineHeight === 'number') {
                        node.lineHeight = { value: layer.lineHeight, unit: 'PIXELS' };
                    } else if (layer.lineHeight.unit) {
                        node.lineHeight = layer.lineHeight;
                    }
                }
            }

            // 3. Children (Recursive)
            if (layer.children && layer.children.length > 0) {
                for (const childLayer of layer.children) {
                    await importLayer(childLayer, node);
                }
            }

            // 4. Append to parent
            if (parent) {
                try {
                    parent.appendChild(node);
                } catch (e) {
                    console.error("Failed to append child", e);
                }
            } else {
                figma.currentPage.appendChild(node);
                nodes.push(node);
            }

            return node;
        }

        if (layersToImport.length > 0) {
            figma.notify("Fonts loaded. Importing layers...");
            for (const layer of layersToImport) {
                await importLayer(layer, null);
            }
            figma.viewport.scrollAndZoomIntoView(nodes);
            figma.notify("Import Complete!");
        } else {
            figma.notify("No layers found in JSON", { error: true });
        }

        figma.closePlugin();
    }
};
