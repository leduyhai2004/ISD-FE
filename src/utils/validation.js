/**
 * Validation utility functions for form inputs
 */

/**
 * Validates if the input is a valid Gmail address
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidGmail = (email) => {
  if (!email) return false;

  // Check if the email ends with @gmail.com
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
};

/**
 * Validates if the password meets minimum requirements
 * @param {string} password - The password to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPassword = (password) => {
  if (!password) return false;

  // Check if password is at least 6 characters
  return password.length >= 6;
};

/**
 * Validates if the input is a valid Vietnamese phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;

  // Check if phone starts with 0 and has exactly 10 digits
  const phoneRegex = /^0\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates if the username meets requirements
 * @param {string} username - The username to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidUsername = (username) => {
  if (!username) return false;

  // Check if username contains only lowercase English letters and no spaces
  const usernameRegex = /^[a-z0-9_]+$/;
  return usernameRegex.test(username);
};

/**
 * Get validation error message for Gmail
 * @param {string} email - The email to validate
 * @returns {string|null} Error message or null if valid
 */
export const getGmailError = (email) => {
  if (!email) return "Email không được để trống";
  if (!isValidGmail(email)) return "Email phải có định dạng @gmail.com";
  return null;
};

/**
 * Get validation error message for password
 * @param {string} password - The password to validate
 * @returns {string|null} Error message or null if valid
 */
export const getPasswordError = (password) => {
  if (!password) return "Mật khẩu không được để trống";
  if (!isValidPassword(password)) return "Mật khẩu phải có ít nhất 6 ký tự";
  return null;
};

/**
 * Get validation error message for phone number
 * @param {string} phone - The phone number to validate
 * @returns {string|null} Error message or null if valid
 */
export const getPhoneError = (phone) => {
  if (!phone) return "Số điện thoại không được để trống";
  if (!isValidPhone(phone))
    return "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số";
  return null;
};

/**
 * Get validation error message for username
 * @param {string} username - The username to validate
 * @returns {string|null} Error message or null if valid
 */
export const getUsernameError = (username) => {
  if (!username) return "Tên đăng nhập không được để trống";
  if (!isValidUsername(username))
    return "Tên đăng nhập chỉ được chứa chữ cái tiếng Anh viết thường, số và dấu gạch dưới";
  return null;
};
