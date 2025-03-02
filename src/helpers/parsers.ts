
export const parsers = {
  toInt,
  toFloat,
  toBool,
} as const;

function toInt(value: any): number | null {
  const ret = parseInt(value, 10);
  return isNaN(ret) ? null : ret;
}

function toFloat(value: any): number | null {
  const ret = parseFloat(value);
  return isNaN(ret) ? null : ret;
}

function toBool(value: any): boolean | null {
  if (typeof value === 'boolean') {
    return value;
  }
  else if (typeof value === 'string') {
    value = value.trim().toLocaleLowerCase();
    return ['true','false'].includes(value)
      ? value === 'true'
      : null;
  }
  else if (typeof value === 'number') {
    return value < 0
      ? null
      : value !== 0;
  }

  return null;
}