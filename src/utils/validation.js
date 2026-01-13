export const validateEmail = (email) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email);

export const validatePassword = (password) =>
  password.length > 7 && /[A-Z]/.test(password) && /\d/.test(password);

export const sanitizeInput = (input) => input.replace(/[<>{}()'"`;\\]/g, ""); // Removes common injection vectors

// Add these AWS validations
export const validateRoleArn = (arn) => {
  const regex = /^arn:aws:iam::\d{12}:role\/[\w+=,.@-]+$/;
  return regex.test(arn);
};

export const validateS3BucketName = (bucketName) => {
  // S3 bucket naming rules
  const regex = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
  return regex.test(bucketName) && !bucketName.includes("..");
};

export const validateAwsAccountId = (accountId) => {
  return /^\d{12}$/.test(accountId);
};
