import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { AppRoutes } from './routes';
import ReactPixel from 'react-facebook-pixel';
import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

// NOTE: You'll likely want to get user data from a hook or state
// import { useAuth } from '@/hooks/useAuth'; 

function App() {
  const FacebookPixelId = import.meta.env.VITE_FACEBOOK_PIXAL_ID;
  const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

  // 1. Facebook Pixel Initialization
  useEffect(() => {
    if (FacebookPixelId) {
      const options = {
        autoConfig: true,
        debug: false,
      };

      ReactPixel.init(FacebookPixelId, undefined, options);
      ReactPixel.pageView();
    }
  }, [FacebookPixelId]);

  // 2. Microsoft Clarity Initialization & User Identification
  useEffect(() => {
    if (clarityProjectId) {
      Clarity.init(clarityProjectId);

       

      
    }
  }, [clarityProjectId]); // Added project ID as a dependency

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;