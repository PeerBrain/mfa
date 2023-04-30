import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import generateBase32Secret from './secret';
import { useForm } from 'react-hook-form';
import otp from './otp';
import verify from './verify';

function Gen() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => testdata(data);
    const searchParams = new URLSearchParams(document.location.search)
    var token = searchParams.get('token')
    var secret = generateBase32Secret();
      const username = searchParams.get('username')
      var opturl = otp(secret, username);
        return (
        <div className="App">
          <header className="App-header">
            <h1>PeerBrain</h1>
            <h2>MFA setup for {username}</h2>
            <p>
                Scan the QR code below with your authenticator app.
                Or you can enter the code manually.
            </p>
            <div>
                <code>{secret}</code>
            </div>
            <QRCode value={opturl} renderAs="svg" />
            <p2>Once setup in your auth app then enter the generated code bellow</p2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" placeholder="OTP" {...register("OTP", {required: true, maxLength: 11})} />
            <input type="hidden" {...register("SECRET", {required: true})} value={secret} />
            <input type="hidden" {...register("TOKEN", {required: true})} value={token} />
            <input type="hidden" {...register("USERNAME", {required: true})} value={username} />


            <input type="submit" />
            </form>   
          </header>
        </div>
      );
  }

function testdata(data) {
    console.log(data);
    const verified = verify(data.SECRET, data.TOKEN, data.OTP, data.USERNAME);

}

  

export default Gen;  