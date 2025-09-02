import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

if (PUBLISHABLE_KEY) {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App clerkEnabled={true} />
      </ClerkProvider>
    </React.StrictMode>
  );
} else {
  console.warn("CLERK_PUBLISHABLE_KEY is not set. Rendering app without authentication features.");
  root.render(
    <React.StrictMode>
      <App clerkEnabled={false} />
    </React.StrictMode>
  );
}
