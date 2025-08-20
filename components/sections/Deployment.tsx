import React from 'react';
import CodeBlock from '../CodeBlock.tsx';

const Deployment: React.FC = () => {
    return (
        <section id="deployment" className="fade-in space-y-8">
            <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                <h2 className="text-3xl font-bold mb-2 neon-text" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                    Deployment & Operations
                </h2>
                <p className="text-lg text-gray-300">
                    Transition your agents from development to production with robust, scalable deployment patterns. The ADK is designed to integrate with modern cloud infrastructure and CI/CD pipelines.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 semi-transparent-card">
                    <h3 className="text-xl font-bold mb-4">Containerization with Docker</h3>
                    <p className="text-gray-300 mb-4">Package your entire ADK application, including agents, tools, and configurations, into a standard Docker container for consistent and portable deployments.</p>
                    <CodeBlock language="dockerfile" code={`
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy application dependency manifests
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Your app binds to port 8080
EXPOSE 8080

# Define environment variables for inference.
# These can be overridden at runtime.
ENV API_NAME="gemini-2.5-flash"
ENV API_KEY=""
ENV DATABASE_URL=""

# Run the app
CMD [ "npm", "start" ]
                    `} />

                    <h4 className="font-semibold text-lg text-purple-300 mt-6 mb-2">Runtime Configuration</h4>
                    <p className="text-gray-400 text-sm mb-4">
                        Environment variables are used to inject configuration like API keys at runtime.
                        Here's how you'd set them when running the container. These values would typically come from a secure secret store.
                    </p>
                    <div className="space-y-4 mb-4">
                        <div>
                            <label htmlFor="api-name" className="block text-sm font-semibold text-gray-300 mb-1">API_NAME</label>
                            <input 
                                id="api-name"
                                type="text" 
                                placeholder="e.g., 'gemini-2.5-flash'" 
                                className="w-full bg-gray-900/80 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm" 
                            />
                        </div>
                        <div>
                            <label htmlFor="api-key" className="block text-sm font-semibold text-gray-300 mb-1">API_KEY</label>
                            <input 
                                id="api-key"
                                type="password" 
                                placeholder="Enter your secret key" 
                                className="w-full bg-gray-900/80 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm" 
                            />
                        </div>
                    </div>
                    <CodeBlock language="bash" code={`
docker run -d -p 8080:8080 \\
  -e API_NAME="gemini-2.5-flash" \\
  -e API_KEY="your_secret_key_here" \\
  your-username/my-adk-app:latest
    `} />
                </div>
                <div className="p-6 semi-transparent-card">
                     <h3 className="text-xl font-bold mb-4">CI/CD with GitHub Actions</h3>
                    <p className="text-gray-300 mb-4">Automate testing and deployment directly from your GitHub repository. This example workflow builds and pushes a Docker image to a registry on every commit to the main branch.</p>
                     <CodeBlock language="yaml" code={`
name: ADK CI/CD

on:
  push:
    branches: [ "main" ]

jobs:
  build_and_push:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: \${{ secrets.DOCKERHUB_USERNAME }}
        password: \${{ secrets.DOCKERHUB_TOKEN }}
        
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: your-username/my-adk-app:latest
                    `} />
                </div>
            </div>

            <div className="p-6 md:p-8 semi-transparent-card" style={{'--glow-color': 'var(--neon-purple)'} as React.CSSProperties}>
                <h3 className="text-xl font-bold mb-4">Deployment Targets</h3>
                <p className="text-gray-300 mb-4">Once containerized, your ADK application can be deployed to any platform that supports Docker containers:</p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <li className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-bold text-lg text-purple-300">Google Cloud Run</h4>
                        <p className="text-sm text-gray-400">Fully managed, serverless platform that automatically scales your containers up and down, even to zero.</p>
                    </li>
                    <li className="bg-gray-800/50 p-4 rounded-lg">
                         <h4 className="font-bold text-lg text-purple-300">Kubernetes</h4>
                        <p className="text-sm text-gray-400">The industry standard for container orchestration, offering maximum control and flexibility for complex, large-scale deployments.</p>
                    </li>
                    <li className="bg-gray-800/50 p-4 rounded-lg">
                         <h4 className="font-bold text-lg text-purple-300">Virtual Private Server (VPS)</h4>
                        <p className="text-sm text-gray-400">A traditional virtual machine for straightforward deployments where you manage the underlying infrastructure.</p>
                    </li>
                </ul>
            </div>

        </section>
    );
};

export default Deployment;