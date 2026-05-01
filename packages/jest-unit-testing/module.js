function sum(a, b) {
  if (!a || !b) return 0;
  return Number(a) + Number(b);
}

function div(a, b) {
  if (a == null || b == null) return 0
  return Number(a) / Number(b);
}

function containsNumbers(text) {
  if (!text) return false;
  for (let i = 0; i < text.length; i++) {
    if (/\d/.test(text.charAt(i))) return true;
  }
  return false;
}

export default { sum, div, containsNumbers };
