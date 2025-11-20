export const login = async (email, password) => {
  // Simulate an API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "deepak@gmail.com" && password === "SecurePassword@123") {
        resolve({ message: "Login successful", user: { email } });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 2000);
  });
};