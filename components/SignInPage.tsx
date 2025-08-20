import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

const SignInPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                       <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414m15.556 15.556l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a5 5 0 100-10 5 5 0 000 10z"></path></svg>
                    </div>
                    <h1 className="text-4xl font-bold neon-text" style={{ '--glow-color': 'var(--neon-purple)' } as React.CSSProperties}>
                        Advanced Agent Development Kit
                    </h1>
                </div>
                <p className="text-lg text-gray-400">Please sign in to continue to the dashboard.</p>
            </div>
            <SignIn 
                routing="hash"
                appearance={{
                    baseTheme: dark,
                    variables: {
                        colorPrimary: '#a855f7',
                        colorText: '#d1d5db',
                        colorBackground: '#030712'
                    },
                    elements: {
                        rootBox: 'transform scale-95 md:scale-100',
                        card: 'bg-gray-950/60 backdrop-blur-md border border-purple-500/30 shadow-2xl shadow-purple-500/10',
                        formButtonPrimary: 'bg-purple-600 hover:bg-purple-500 transition-all duration-300',
                        footerActionLink: 'text-purple-400 hover:text-purple-300',
                        identityPreviewEditButton: 'text-purple-400 hover:text-purple-300',
                        formFieldInput: 'bg-gray-800/50 border-gray-700',
                    }
                }}
            />
        </div>
    );
};

export default SignInPage;