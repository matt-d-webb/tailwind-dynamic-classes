import * as generatedExports from "../../generated/output";

describe('verify classname strings for varying types and colors', () => {

    test('should match expected tailwind string format', () => {

        const bgColor500 = generatedExports.bgColor500;

        expect(typeof bgColor500 === 'object').toBe(true);
        expect(bgColor500.black).toEqual("bg-black-500");
        
        const { textColor200 } = generatedExports;

        expect(typeof textColor200 === 'object').toBe(true);
        expect(textColor200.orange).toEqual("text-orange-200");

        const { darkTextColor600 } = generatedExports;

        expect(typeof darkTextColor600 === 'object').toBe(true);
        expect(darkTextColor600.blue).toEqual("dark:text-blue-600");

        const { mdBorderColor50 } = generatedExports;

        expect(typeof mdBorderColor50 === 'object').toBe(true);
        expect(mdBorderColor50.gray).toEqual("md:border-gray-50");

    });

    test('should work as user intends to use it 🤣, dynamically', () => {

        const color = ["red", "blue", "green"];
        const expectedText = ["text-red-200", "text-blue-200", "text-green-200"];
        const expectedScreen = ["md:bg-red-500", "md:bg-blue-500", "md:bg-green-500"];
        const expectedTheme = ["dark:border-red-100", "dark:border-blue-100", "dark:border-green-100"];
        
        const { textColor200, mdBgColor500, darkBorderColor100 } = generatedExports;

        const textResult = color.map(c => textColor200[c]);
        expect(textResult).toStrictEqual(expectedText);

        const screenResult = color.map(c => mdBgColor500[c]);
        expect(screenResult).toStrictEqual(expectedScreen);

        const themeResult = color.map(c => darkBorderColor100[c]);
        expect(themeResult).toStrictEqual(expectedTheme);
    });

});