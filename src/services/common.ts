export const onError = (error: { errors: { msg: string; path: string }[] } | { error: string } | string) => {
  if (typeof error === 'string') {
    throw new Error(error);
  } else if (typeof error === 'object' && 'error' in error) {
    throw new Error(error.error);
  } else {
    const errorMessage = error?.errors?.map((err) => `${err.path}: ${err.msg}`).join('\n');
    throw new Error(errorMessage);
  }
};
