import { TRAVERSAL_SCRIPT } from './traversal-script';

export function generateSandboxHtml(code: string) {
    // 1. Extract Component Name
    // Expecting: export function Component() ...
    const componentNameMatch = code.match(/export\s+function\s+(\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Component';

    // 2. Extract Lucide Imports to mock them (before we strip imports)
    // Regex to find: import { A, B } from 'lucide-react';
    const lucideMatch = code.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
    let iconMocks = '';
    if (lucideMatch && lucideMatch[1]) {
        const iconNames = lucideMatch[1].split(',').map(s => s.trim());
        // Generate mock components for each icon
        iconMocks = iconNames.map(name => {
            return `const ${name} = (props) => React.createElement('div', { ...props, style: { ...props.style, width: 24, height: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#888' } }, '${name}');`;
        }).join('\n');
    }

    // 3. Clean Code
    // Remove imports and exports
    // Use [\s\S]*? to match across newlines for multiline imports
    const cleanCode = code
        .replace(/export\s+default\s+function/, 'function')
        .replace(/export\s+function/, 'function')
        .replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '') // Remove all imports (multiline friendly)
        .replace(/require\(.*\)/g, '{}'); // Naive removal of require calls if inline

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="module">
        import { htmlToFigma } from 'https://esm.sh/@builder.io/html-to-figma@latest';
        window.htmlToFigma = htmlToFigma;
    </script>
    
    <style>
        body { margin: 0; padding: 0; background: #000; }
        #root { width: 100%; min-height: 100vh; overflow: auto; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script>
        // Traversal Script (Native JS)
        ${TRAVERSAL_SCRIPT}

        // Shims for CommonJS/Node environments to prevent crashes
        window.require = function(mod) {
            console.warn('Shimmed require for:', mod);
            if (mod === 'react') return React;
            if (mod === 'react-dom') return ReactDOM;
            return {}; 
        };
        window.module = { exports: {} };
        window.exports = window.module.exports;
    </script>
    <script type="text/babel">
        const { useState, useEffect, useRef } = React;
        const { createRoot } = ReactDOM;

        // Mocked Icons
        ${iconMocks}

        // User Code
        ${cleanCode}

        // Safe Mount
        try {
            const rootElement = document.getElementById('root');
            if (rootElement) {
                const root = createRoot(rootElement);
                if (typeof ${componentName} !== 'undefined') {
                    root.render(<${componentName} />);
                } else {
                    root.render(<div style={{color: 'red', padding: 20}}>Error: Component '${componentName}' not found. Check code tab.</div>);
                }
            }
        } catch (err) {
            console.error("Mount Error:", err);
            document.body.innerHTML += '<div style="color:red; padding:20px"><pre>' + err.toString() + '</pre></div>';
        }
    </script>
</body>
</html>
    `;
}
