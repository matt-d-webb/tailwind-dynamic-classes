import { createFunctionClassMap, createMethodExports } from "../scripts/createColorClasses";

describe("shallow test of outputs from exported script methods", () => {

    let arrayOutput = null;
    let stringOutput = null;

    beforeAll(() => {
        arrayOutput = createFunctionClassMap();
        stringOutput = createMethodExports(arrayOutput);
    });

    test('createFunctionClassMap should return an array of structured objects', () => {

        const expected = {
            name: "bgColor50", classes: {
                black: "bg-black-50",
                white: "bg-white-50",
                slate: "bg-slate-50",
                gray: "bg-gray-50",
                zinc: "bg-zinc-50",
                neutral: "bg-neutral-50",
                stone: "bg-stone-50",
                red: "bg-red-50",
                orange: "bg-orange-50",
                amber: "bg-amber-50",
                yellow: "bg-yellow-50",
                lime: "bg-lime-50",
                green: "bg-green-50",
                emerald: "bg-emerald-50",
                teal: "bg-teal-50",
                cyan: "bg-cyan-50",
                sky: "bg-sky-50",
                blue: "bg-blue-50",
                indigo: "bg-indigo-50",
                violet: "bg-violet-50",
                purple: "bg-purple-50",
                fuchsia: "bg-fuchsia-50",
                pink: "bg-pink-50",
                rose: "bg-rose-50",
                lightBlue: "bg-lightBlue-50",
                warmGray: "bg-warmGray-50",
                trueGray: "bg-trueGray-50",
                coolGray: "bg-coolGray-50",
                blueGray: "bg-blueGray-50"
            }
        };

        const randomSelect = Math.floor(Math.random() * arrayOutput.length);
        const bgColor50 = arrayOutput.find(({ name }) => name === "bgColor50");
        expect(Array.isArray(arrayOutput)).toBe(true);
        expect(arrayOutput.length).toBeGreaterThan(0);
        expect(arrayOutput[randomSelect]).toEqual(expect.objectContaining({
            name: expect.any(String),
            classes: expect.any(Object)
        }));
        expect(bgColor50).toStrictEqual(expected);
    });

    test('createMethodExports should return a string containing exports', () => {
        expect(typeof stringOutput === 'string').toBe(true);
        expect(stringOutput.includes("export const")).toBe(true);
    });

    test('createFunctionClassMap should produce alternate output when overrides are provided', () => {
        const removeDarkTheme = createFunctionClassMap({ themes: [""] });
        const containsDarkClasses = removeDarkTheme
            .some(({ classes }) => Object.values(classes)
                .some((c) => c.includes("dark:")));

        expect(containsDarkClasses).toBe(false);
    });
});
