const defaultColors = require('tailwindcss/colors');
const exclude = ["inherit", "current", "transparent"];
const defaultConfig = {
    themes: ["", "dark"],
    screens: ["", "sm", "lg", "md", "xlg"],
    attributes: ["bg", "text", "border"],
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
};
const colors = Object.keys(defaultColors).filter(c => !exclude.includes(c));

const camalize = str => {
    str = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    return str.substr(0, 1).toLowerCase() + str.substr(1);
};

/**
 * Generates an array of method names and associated classes for each tailwind colour
 * @param {object} overrides 
 * @returns array
 */
exports.createFunctionClassMap = (overrides = {}) => {
    const config = { ...defaultConfig, ...overrides };
    const { themes, screens, attributes, shades } = config;
    const methods = [];
    for (const theme of themes) {
        for (const screen of screens) {
            for (const attribute of attributes) {
                for (const shade of shades) {
                    const methodName = camalize(`${theme} ${screen} ${attribute} Color ${shade}`);
                    const fnProps = {
                        name: methodName,
                        classes: {}
                    };
                    for (const color of colors) {
                        const className = `${(theme && `${theme}:`)}` +
                        `${(screen && `${screen}:`)}${attribute}-${color}-${shade}`.trim();
                        fnProps.classes[color] = className;
                    }
                    methods.push(fnProps);
                }
            }
        }
    };   
    return methods;
};

/**
 * Generates the list of javascript object exports as a string to be written to a file
 * @param {Array} methods 
 * @returns string
 */
exports.createMethodExports = (methods) => {
    return methods.map(m => 
        `export const ${m.name} = { ${Object.entries(m.classes).map(([key, value]) => (`${key}: "${value}"`))}};\n`
    ).join()
    // gnary way to remove the "," break between exports:
    .replace(/,export/g, 'export')
    .trim();
};