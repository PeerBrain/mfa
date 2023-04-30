import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import generateBase32Secret from './secret';
import otp from './otp';
import Gen from './gen';
import './App.css';

const AuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const searchParams = new URLSearchParams(document.location.search)

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('https://mfa.peerbrain.net/api/v1/token-test', {
        method: 'GET',
        headers: {
          'token': `${searchParams.get('token')}`,
        },
      });

      if (response.ok) {
        console.log(response)
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);
  if (isAuthenticated) {
    return (
      <div>
        <Gen />
      </div>
    );
    } else {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <h1>Not authenticated</h1>
                    </div>
                </header>    
            </div>
        );
    }
};

export default AuthCheck;
