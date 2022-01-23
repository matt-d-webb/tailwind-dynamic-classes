export interface Config {
    themes: Array<string  | null> | null,
    screens: Array<string  | null> | null,
    attributes: Array<string  | null> | null,
    shades: Array<number> | null
}

export interface Methods {
    name: string,
    classes: {
        [key: string]: string
    }
}
