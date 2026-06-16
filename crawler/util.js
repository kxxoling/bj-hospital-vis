exports.getHospitalName = (name) => {
  const sourceChars = ['、', '（', '）']
  const targetChar = ','

  for (const c of sourceChars) {
    name = name.replace(new RegExp(c, 'ig'), targetChar)
  }

  return name
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
