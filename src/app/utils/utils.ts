export const getError = (error: any): string | void => {
  const _error = error.toString();

  if (_error.includes('auth/email-already-in-use')) {
    return 'auth/email-already-in-use';
  }
};
