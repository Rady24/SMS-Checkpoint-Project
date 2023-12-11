export function isValidName(name) {
  const nameRegExp = /^[a-zA-Z\s]+$/;
  return nameRegExp.test(name);
}
export function isValidGrade(grade) {
  const gradeRegExp = /^-?\d*\.?\d+$/;
  const parsedGrade = parseFloat(grade);
  return !isNaN(parsedGrade) && gradeRegExp.test(grade);
}

export function isNonEmptyString(value) {
  return value.trim() !== "";
}
