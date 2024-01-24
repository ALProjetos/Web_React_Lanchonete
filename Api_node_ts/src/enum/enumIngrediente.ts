enum EnumIngrediente {
  Alface = 'Alface',
  Bacon = 'Bacon',
  HamburguerCarne = 'Hambúrguer de carne',
  Ovo = 'Ovo',
  Queijo = 'Queijo'
}

const ingredientesMap = new Map<string, EnumIngrediente>(Object.values(EnumIngrediente).map((v) => [v, v]))

export function parseEnumIngrediente(value: string): EnumIngrediente | undefined {
  return ingredientesMap.get(value);
}

export function parseToEnum(value: string): EnumIngrediente {
  return Object.values(EnumIngrediente)[Object.keys(EnumIngrediente).indexOf(value)];
}

export function parseToString(value: string): string {
  return Object.keys(EnumIngrediente)[Object.values(EnumIngrediente).indexOf(value as EnumIngrediente)];
}

export function parseEnum<T>(value: string): T | string | undefined {
  if(Object.keys(EnumIngrediente).findIndex(f => f == value) >= 0)
    return parseToString(value);

  return parseToEnum(value);
}
  
export default EnumIngrediente;