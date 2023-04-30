import base32 from 'base32.js';

const generateBase32Secret = () => {
  const randomBytes = new Uint8Array(20);
  window.crypto.getRandomValues(randomBytes);
  const base32Secret = base32.encode(randomBytes).slice(0, 32);
  return base32Secret;
};

export default generateBase32Secret;