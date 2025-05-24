
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-center text-white px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Learn with AI Assistant
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Enhance your knowledge with our intelligent learning companion.
          Get answers, explore concepts, and master new skills through natural conversations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="bg-white text-blue-900 hover:bg-white/90"
          >
            Sign In
          </Button>
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
          >
            Register
          </Button>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="opacity-80">
                Learn through conversation with our AI that adapts to your pace and style.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="opacity-80">
                Review your chat history and see how your understanding has grown.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Always Available</h3>
              <p className="opacity-80">
                Get answers and explanations whenever you need them, 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
