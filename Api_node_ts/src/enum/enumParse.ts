
class EnumParse {

    private static parseEnumKey<T>(enm: { [s: string]: T}, value: string): T | undefined {
        return Object.values(enm)[Object.keys(enm).indexOf(value)];
    }

    private static parseEnumValue<T>(enm: { [s: string]: T}, value: string): string | undefined {
        return Object.keys(enm)[Object.values(enm).indexOf(value as T)];
    }

    public static parse<T>(enm: { [s: string]: T}, value: string): T {
        let ret: T;

        if(Object.keys(enm).findIndex(f => f === value) >= 0)
            //retr = this.parseEnumKey<T>(enm, value);
            ret = value as T;
        else
            ret = this.parseEnumValue<T>(enm, value) as T;

        if(ret === undefined)
            throw new Error(`Enum [${value}] não encontrado para o tipo informado`);

        return ret;
    }
}

export default EnumParse;