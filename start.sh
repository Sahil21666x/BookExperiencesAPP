#!/bin/bash

echo "🚀 Starting BookIt Experiences Application..."

# Start backend server in the background
cd server
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
cd ../client
npm run dev &
FRONTEND_PID=$!

echo "✅ Backend running on http://localhost:3000"
echo "✅ Frontend running on http://0.0.0.0:5000"
echo "📝 Backend PID: $BACKEND_PID"
echo "📝 Frontend PID: $FRONTEND_PID"

# Wait for both processes
wait
