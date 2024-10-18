document.getElementById('palindrome-form').addEventListener('submit', function(event) {
event.preventDefault();

const textInput = document.getElementById('palindrome').value;
const resultSection = document.getElementById('result');

if (isPalindrome(textInput)) {
    resultSection.textContent =`"${textInput}" est un palindrome.`;

} else {
    resultSection.textContent = `"${textInput}" n'est pas un palindrome.`;
}
});

function isPalindrome(str) {
const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
const reverseStr = cleanedStr.split('').reverse().join('');
return cleanedStr === reverseStr;

}