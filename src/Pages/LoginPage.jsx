import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- IMPORT LINK FOR NAVIGATION

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

    // Dummy API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Login successful!');
        // In a real app, redirect to dashboard: navigate('/dashboard');
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gray-100">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'linear-gradient(to bottom right, #4A89DC, #A8D3F1 60%, #FFFFFF)' }}>
        <div className="absolute inset-0 opacity-15 transform -rotate-45">
          <div className="absolute w-[2px] h-full bg-white left-1/4"></div>
          <div className="absolute w-[1px] h-full bg-white left-1/3"></div>
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#5B95EF] text-white p-8">
          <div className="flex justify-center mb-5">
            <div className="bg-white p-3 rounded-xl shadow-lg inline-block">
              <div className="flex items-center space-x-2">
                <div className="relative h-10 w-10 flex items-center justify-center">
                  <Cloud className="text-[#5B95EF] h-10 w-10" />
                  <BarChart3 className="absolute text-[#3e7ac5]/80 h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-lg text-gray-800 tracking-wide">VISION DATA</span>
                  <span className="text-[10px] text-gray-500">Powered by Abhasthra Technology</span>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl text-center">Please <span className="font-bold">Login</span></h2>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-gray-300 pb-2">
              <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                <Mail className="h-4 w-4 mr-2 text-red-500/80" />Username
              </label>
              <Input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className="w-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1" required/>
            </div>

            <div className="border-b border-gray-300 pb-2">
              <label htmlFor="password"  className="flex items-center text-sm font-medium text-gray-600 mb-2">
                <Asterisk className="h-4 w-4 mr-2 text-red-500/80" />Password
              </label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1" required/>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <Switch id="remember-me" checked={formData.rememberMe} onCheckedChange={handleSwitchChange} />
              <Button type="submit" className="bg-[#4A89DC] hover:bg-[#3e7ac5] text-white rounded-md px-4 py-2" disabled={isLoading}>
                {isLoading ? "Logging in..." : <><ChevronRight className="h-5 w-5 mr-1" /> Login to Dashboard</>}
              </Button>
            </div>
          </form>

          {/* IMPROVED NAVIGATION LINK */}
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