const fs = require('fs');
const content = fs.readFileSync('UserProfile.jsx', 'utf8');
const lines = content.split('\n');
let braces = 0;
let parens = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let char of line) {
    if (char === '{') braces++;
    if (char === '}') braces--;
    if (char === '(') parens++;
    if (char === ')') parens--;
  }
  if (braces < 0 || parens < 0) {
    console.log(`Balance broken at line ${i + 1}: Braces: ${braces}, Parens: ${parens}`);
    break;
  }
}
console.log(`Final Balance: Braces: ${braces}, Parens: ${parens}`);
