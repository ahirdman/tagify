
export const getToken = async (data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    );
  }

  const uid = context.auth.uid;

  const userDoc = (await AuthService.getUserDoc(uid)) as IUSerDocument;

  // Check if token is valid

  const form = new URLSearchParams();
  form.append('grant_type', 'refresh_token');
  form.append('refresh_token', userDoc.spotifyRefreshToken);

  const response = await axios('https://accounts.spotify.com/api/token', {
    method: 'post',
    data: form,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${AuthService.clientId}:${AuthService.clientSecret}`
      ).toString('base64')}`,
    },
  });

  const { access_token, expires_in } = response.data;

  await AuthService.updateUserDoc(id, access_token, expires_in);

  return `User with id: ${uid}, sent ${text}`;
});

export const refreshToken = async (data, context) => {};
