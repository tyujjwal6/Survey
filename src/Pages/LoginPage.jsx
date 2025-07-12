import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

// Import Lucide icons
import { Mail, Asterisk, Cloud, BarChart3, ChevronRight } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // useNavigate hook is already correctly initialized
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Logging in with:', formData);

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Login is successful
        // You can remove the alert or keep it for testing
        alert('Login successful! Redirecting to dashboard...');
        
        // ===============================================
        //  THIS IS THE CHANGE: Navigate to the dashboard
        // ===============================================
        navigate('/dashboard'); 
        
      } else {
        // Handle failed login
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container now holds the background and centers the card directly
    <div 
      className="relative min-h-screen w-full flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(160deg, #6495ED, #87CEEB)' }}
    >
      
      {/* Faint decorative background lines */}
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-px h-[150%] bg-white/10 transform -rotate-[30deg] top-[-25%] left-1/3"></div>
          <div className="absolute w-px h-[150%] bg-white/10 transform -rotate-[30deg] top-[-25%] left-2/3"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-[#6495ED] text-white p-8 text-center">
          {/* Logo block */}
          <div className="inline-block bg-white text-black py-2 px-4 rounded-lg mx-auto mb-5 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 flex items-center justify-center">
                <Cloud className="text-blue-500 h-8 w-8" />
                <BarChart3 className="absolute text-blue-700 h-4 w-4" />
              </div>
              <div className="text-left">
                <h1 className="font-bold text-sm leading-tight">VISION DATA</h1>
                <p className="text-gray-500 text-[9px] leading-tight">Powered by Abhasthra Technology</p>
              </div>
            </div>
          </div>
          <h2 className="text-xl">
            Please <span className="font-bold">Login</span>
          </h2>
        </div>

        {/* Card Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-gray-200 pb-2">
              <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Mail className="h-4 w-4 mr-2 text-red-400" />Username
              </label>
              <Input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className="w-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 h-8" required/>
            </div>

            <div className="border-b border-gray-200 pb-2">
              <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Asterisk className="h-4 w-4 mr-2 text-red-400" />Password
              </label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 h-8" required/>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Switch id="remember-me" checked={formData.rememberMe} onCheckedChange={handleSwitchChange} />
                <label htmlFor="remember-me" className="text-sm text-gray-600 select-none cursor-pointer">Remember me</label>
              </div>
              <Button 
                type="submit" 
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md px-3 py-2 h-9 text-sm flex items-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : <><ChevronRight className="h-4 w-4" /> <span>Login</span></>}
              </Button>
            </div>
          </form>

          <div className="text-center mt-8">
            <Button asChild variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto text-sm">
              <Link to="/forgot-password">Forgot password?</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;