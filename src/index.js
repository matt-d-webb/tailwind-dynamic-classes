const fs = require("fs");
const { createFunctionClassMap, createMethodExports } = require("./scripts/createColorClasses");
const output = createMethodExports(createFunctionClassMap());

fs.writeFile('./generated/output.js', output, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('complete!');
});