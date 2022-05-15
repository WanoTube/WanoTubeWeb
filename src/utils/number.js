const ONE_MILLION = 1000000;
const ONE_THOUSAND = 1000;

export function formatSuffixNumber(number) {
  if (number / ONE_MILLION >= 1) return Math.round(number / ONE_MILLION * 10) / 10 + 'M';
  if (number / ONE_THOUSAND >= 1) return Math.round(number / ONE_THOUSAND * 10) / 10 + 'K';
  return number;
}
