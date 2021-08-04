export function formatCurrency(val: string | number, locale?: string, currency = 'VND') {
  const convertedNum = Number(val)
  if (isNaN(convertedNum)) return val

  let _locale = locale || 'it-IT'

  return new Intl.NumberFormat(_locale, { style: 'currency', currency }).format(convertedNum)
}

export const exchangeToVND = (amount, exchangeRate) => {
  return `${formatCurrency(amount * exchangeRate)}`
}
