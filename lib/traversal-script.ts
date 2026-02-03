
export const TRAVERSAL_SCRIPT = `
// Traversal Script (Native JS)
window.getFigmaData = async function() {
    console.log("Unflatten: getFigmaData called");
    if (!window.htmlToFigma) {
        console.error('htmlToFigma library not loaded yet');
        return null;
    }

    const root = document.getElementById('root');
    if (!root) {
        console.error("Unflatten: #root element not found!");
        return null;
    }
    
    // Check if empty
    if (root.children.length === 0) {
         console.warn("Unflatten: #root is empty. React might not have mounted yet or crashed.");
         // Try body as fallback if root is empty but body has stuff? 
         // But usually we want the component.
         return null;
    }

    try {
        console.log("Unflatten: Starting htmlToFigma conversion");
        // htmlToFigma(element, options)
        const result = await window.htmlToFigma(root, {
            useFrames: true,
            // Add more options if needed
        });
        console.log("Unflatten: Conversion complete", result);
        return result;
    } catch (err) {
        console.error('Error generating Figma data:', err);
        return null;
    }
};
`;
