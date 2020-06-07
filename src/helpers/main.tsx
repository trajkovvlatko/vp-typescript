export function getDate() {
  const today = new Date();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  return [
    today.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('-');
}

export function getAuthHeader(token: string) {
  return {Authorization: `Bearer ${token}`};
}

export function toTitleCase(term: string) {
  return term.charAt(0).toUpperCase() + term.slice(1);
}

