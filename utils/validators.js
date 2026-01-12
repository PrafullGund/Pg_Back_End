const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    };
  }

  return { isValid: true, message: "Password is valid" };
};

module.exports = { validatePassword };
