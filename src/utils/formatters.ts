export const formatPhone = (phone: string | undefined | null): string => {
  if (!phone) return ''

  let cleaned = phone.split('x')[0]

  cleaned = cleaned
    .replace(/[()]/g, '-') // Paréntesis a guiones
    .replace(/[. ]/g, '-') // Puntos y espacios a guiones
    .replace(/--+/g, '-') // Guiones dobles o triples a uno solo
    .trim() // Quitar espacios al inicio/final
    .replace(/^-|-$/g, '') // Quitar guiones sobrantes al inicio/final

  return cleaned
}
