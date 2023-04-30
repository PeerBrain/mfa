import fetch from "node-fetch";
async function verify(secret, token, otp, username) {
    const reply = await fetch(`https://mfa.peerbrain.net/api/v1/otp?token=${token}&otp=${otp}&key=${secret}`, {
        method: 'GET',
    })
    if (reply.status === 200) {
        console.log('verified');
        finish(username)
        return true;
    } else {
        console.log('not verified');
        alert('Try entering your code again.');
        return false;
    }
  
}

function finish(username) {
    window.location.href = 'https://mfa.peerbrain.net/completed?username=' + username;
  }

export default verify;