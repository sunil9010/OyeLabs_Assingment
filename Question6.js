// {6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered
// , one number from 1 to 100 is missing , Please write the code for finding the missing
// number
// }
let numbers=[1,2,3,4,5,6,7,8,10]

const missingNumber = findMissingNumber(numbers);

console.log(`The missing number is: ${missingNumber}`);

function findMissingNumber(arr) {
  const n = arr.length + 1; // Total number of elements including the missing number
  const expectedSum = (n * (n + 1)) / 2; // Expected sum of all numbers from 1 to n
  const actualSum = arr.reduce((sum, num) => sum + num, 0); // Sum of the given array

  return expectedSum - actualSum;
}
