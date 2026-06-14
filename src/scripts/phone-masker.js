export function phoneMasker(phone) {
  const digits = String(phone).replace(/\D/g, '');

  const formats = {
    13: /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
    12: /^(\d{2})(\d{2})(\d{4})(\d{4})$/,
    11: /^(\d{2})(\d{5})(\d{4})$/,
    10: /^(\d{2})(\d{4})(\d{4})$/,
    9: /^(\d{5})(\d{4})$/,
    8: /^(\d{4})(\d{4})$/,
  };

  const replacements = {
    13: '+$1 ($2) $3-$4',
    12: '+$1 ($2) $3-$4',
    11: '($1) $2-$3',
    10: '($1) $2-$3',
    9: '$1-$2',
    8: '$1-$2',
  };

  const format = formats[digits.length];
  const replacement = replacements[digits.length];

  return format && replacement ? digits.replace(format, replacement) : digits;
}