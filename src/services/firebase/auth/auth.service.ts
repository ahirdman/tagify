export const errorMessage = (code: string) => {
  if (code === 'auth/weak-password') {
    return 'Password must be longer them 6 characters';
  }

  if (code === 'auth/email-already-in-use') {
    return 'Email is already in use';
  }

  if (code === 'auth/invalid-email') {
    return 'Invalid email';
  }

  if (code === 'auth/wrong-password') {
    return 'Wrong password';
  }

  if (code === 'auth/user-not-found') {
    return 'No account linked to email address';
  }

  return code;
};
