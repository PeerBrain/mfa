import base32 from 'base32.js';

const issuer = 'PeerBrain';

const generateOTPAuthURL = (secret, issuer, accountName) => {
  const encodedSecret = base32.encode(base32.decode(secret));
  const url = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${encodedSecret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
  return url;
}

function opt(base32Secret, accountName) {
  const otpAuthURL = generateOTPAuthURL(base32Secret, issuer, accountName);
  return otpAuthURL;
}

export default opt;