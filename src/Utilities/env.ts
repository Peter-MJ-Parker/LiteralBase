import { existsSync, readFileSync } from 'fs';

function load<T extends object>(
    struct: Struct<T>,
    path: string = '.env',
    inject: boolean = true
): T {
    const out: Partial<T> = {};

    if (!existsSync(path)) {
        throw new Error(`Cannot read contents of '${path}': File does not exist`);
    }

    const file = readFileSync(path);
    const lines = file.toString().split('\n');

    const raw: Record<string, string> = {};

    for (const line of lines) {
        const [key, value] = [line.split('=')[0], line.split('=').slice(1).join('=')] as [string, string];

        let real_value = value;

        try {
            real_value = JSON.stringify(JSON.parse(value));
        } catch {
            void real_value;
        }

        raw[key] = value;
    }

    for (const key in struct) {
        const transformer = struct[key];
        const rawValue = raw[key];

        if (rawValue === undefined) {
            if (transformer.optional) {
                continue;
            } else {
                throw new Error(`Cannot map key '${key}': Key does not exist`);
            }
        }

        out[key] = transformer.transform(rawValue);
    }

    if (inject) {
        Object.assign(process.env, out);
    }

    return out as T;
}

type Struct<T extends object> = {
    [P in keyof T]: {
        transform: (str: string) => T[P];
        optional?: boolean;
    };
};

export const env = load({
    DISCORD_TOKEN: { transform: String },
    clientId: { transform: String },
    devGuild: { transform: String, optional: true },
    prefix: { transform: String },
    mongooseUri: { transform: String, optional: true },
    sqlitePath: { transform: String, optional: true },
});