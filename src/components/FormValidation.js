"use client";

/**
 * Custom hook for form validation
 */
import { useState } from "react";
import {
  getGmailError,
  getPasswordError,
  getPhoneError,
  getUsernameError,
} from "../utils/validation";

/**
 * Custom hook for form validation
 * @returns {Object} Form validation utilities
 */
export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  /**
   * Validates a Gmail address
   * @param {string} email - The email to validate
   * @param {string} fieldName - The field name in the errors object
   * @returns {boolean} True if valid, false otherwise
   */
  const validateGmail = (email, fieldName = "email") => {
    const errorMessage = getGmailError(email);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));

    return !errorMessage;
  };

  /**
   * Validates a password
   * @param {string} password - The password to validate
   * @param {string} fieldName - The field name in the errors object
   * @returns {boolean} True if valid, false otherwise
   */
  const validatePassword = (password, fieldName = "password") => {
    const errorMessage = getPasswordError(password);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));

    return !errorMessage;
  };

  /**
   * Validates a phone number
   * @param {string} phone - The phone number to validate
   * @param {string} fieldName - The field name in the errors object
   * @returns {boolean} True if valid, false otherwise
   */
  const validatePhone = (phone, fieldName = "phone") => {
    const errorMessage = getPhoneError(phone);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));

    return !errorMessage;
  };

  /**
   * Validates a username
   * @param {string} username - The username to validate
   * @param {string} fieldName - The field name in the errors object
   * @returns {boolean} True if valid, false otherwise
   */
  const validateUsername = (username, fieldName = "username") => {
    const errorMessage = getUsernameError(username);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));

    return !errorMessage;
  };

  /**
   * Validates a form object with multiple fields
   * @param {Object} formData - The form data object
   * @returns {boolean} True if all fields are valid, false otherwise
   */
  const validateForm = (formData) => {
    const newErrors = {};
    let isValid = true;

    // Validate each field based on its name
    Object.entries(formData).forEach(([fieldName, value]) => {
      if (fieldName.includes("email")) {
        const error = getGmailError(value);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      } else if (fieldName.includes("password")) {
        const error = getPasswordError(value);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      } else if (fieldName.includes("phone")) {
        const error = getPhoneError(value);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      } else if (fieldName.includes("username")) {
        const error = getUsernameError(value);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Clears all errors
   */
  const clearErrors = () => {
    setErrors({});
  };

  /**
   * Sets a specific error
   * @param {string} fieldName - The field name
   * @param {string} message - The error message
   */
  const setError = (fieldName, message) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: message,
    }));
  };

  return {
    errors,
    validateGmail,
    validatePassword,
    validatePhone,
    validateUsername,
    validateForm,
    clearErrors,
    setError,
  };
};
