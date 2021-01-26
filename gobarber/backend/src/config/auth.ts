export default {
  jwt: {
    secrete: process.env.APP_SECRETE || 'teste',
    expiresIn: '1d',
  },
};
