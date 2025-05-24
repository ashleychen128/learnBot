
import React from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Join Us</h1>
          <p className="text-white/80 mt-2">Create an account to start learning with AI</p>
        </div>
        <AuthForm mode="register" />
      </div>
    </div>
  );
};

export default RegisterPage;
