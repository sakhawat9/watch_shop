// Shared validation rules.
//
// The old pattern was /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ — duplicated
// across four forms, it rejected any address with a capital letter and any
// TLD longer than four characters (.online, .digital, .technology).
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const PASSWORD_RULES = {
  required: "Choose a password",
  minLength: {
    value: 6,
    message: "Use at least 6 characters",
  },
};
