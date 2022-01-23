import defaultColors from "tailwindcss/colors";
import { Config, Methods } from "./types";

const exclude: Array<string> = ["inherit", "current", "transparent"];
const defaultConfig: Config = {
    themes: ["", "dark"],
    screens: ["", "sm", "lg", "md", "xlg"],
    attributes: ["bg", "text", "border"],
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
};
const colors = Object.keys(defaultColors).filter(c => !exclude.includes(c));

function camalize(str: string): string {
    str = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    return str.substring(0, 1).toLowerCase() + str.substring(1);
}

export const createFunctionClassMap = (overrides = {}): Array<Methods> => {
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

export const createMethodExports = (methods: Array<Methods>): string => {
    return methods.map(m => 
        `export const ${m.name} = { ${Object.entries(m.classes).map(([key, value]) => (`${key}: "${value}"`))}};\n`
    ).join()
    // gnary way to remove the "," break between exports:
    .replace(/,export/g, 'export')
    .trim();
};