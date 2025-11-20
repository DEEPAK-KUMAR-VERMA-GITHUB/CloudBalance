export const validateEmail = (email) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email);

export const validatePassword = (password) =>
  password.length > 7 && /[A-Z]/.test(password) && /\d/.test(password);

export const sanitizeInput = (input) =>
  input.replace(/[<>{}()'"`;\\]/g, ""); // Removes common injection vectors
