const fs = require("fs");
const defaultColors = require('tailwindcss/colors');
const exclude = ["inherit", "current", "transparent"];

// TODOs: generate these types dynamically
const themes = ["", "dark"];
const screens = ["", "sm", "lg", "md", "xlg"];
const attributes = ["bg", "text", "border"];
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const colors = Object.keys(defaultColors).filter(c => !exclude.includes(c));

function createFunctionClassMap() {
    const methods = [];
    for (const theme of themes) {
        for (const screen of screens) {
            for (const attribute of attributes) {
                for (const shade of shades) {
                    const methodName = camalize(`${theme} ${screen} ${attribute} ${shade}`);
                    const fnProps = {
                        name: methodName,
                        classes: []
                    };
                    for (const color of colors) {
                        const className = (theme ? `${theme}:` : "")
                            + (screen ? `${screen}:` : "")
                            + `${attribute}-${color}-${shade}`
                        fnProps.classes.push({ [color]: className });
                    }
                    methods.push(fnProps);
                }
            }
        }
    };
    return methods;
}

function createMethodExports(methods) {
    const cases = (c) => {
        const [color, className] = Object.entries(c)[0];
        return `case "${color}":
            return "${className}";
        `
    }
    return methods.map(m => {
        return `
        export const ${m.name} = (color) => {
            switch (color) {
                ${m.classes.map(cases).join()}
            }  
        };
        `
    }).join().replace(/,/g, '');
}

function camalize(text) {
    text = text.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    return text.substr(0, 1).toLowerCase() + text.substr(1);
};

const map = createFunctionClassMap();
const output = createMethodExports(map);

fs.writeFile('./generated/output.js', output, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('complete!');
});





