const fs = require('fs');
const content = fs.readFileSync('c:/Users/shrik/Job-Portal/frontend/src/pages/UserProfile.jsx', 'utf8');
const lines = content.split('\n');
const start = 607;
const end = 1195;
let braces = 0;
let parens = 0;
for (let i = start - 1; i < end; i++) {
  const line = lines[i];
  for (let char of line) {
    if (char === '{') braces++;
    if (char === '}') braces--;
    if (char === '(') parens++;
    if (char === ')') parens--;
  }
}
console.log(`Braces: ${braces}, Parens: ${parens}`);
