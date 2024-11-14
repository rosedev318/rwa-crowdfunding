## Project overview

RWA Crowdfunding platfrom built with
- Next.js, TypeScript, Tailwind CSS for Frontend
- React Query, Zustand for state management
- flowbite-react UI library
- json-server for mockup api

## Setup and installation instructions
Requirement: latest node version
```
git clone https://github.com/iceknight17/rwa-crowdfunding.git
cd rwa-crowdfunding
# copy .env.example to .env
npm install -f
# run json-server mockup api on http://localhost:3001
npm run start:mock
# run next.js project
npm run dev
# http://localhost:3000
# admin@gmail.com / password
```

## Notes on mock API usage
You can check all records in JSON server with following urls.
- http://localhost:3001/properties
- http://localhost:3001/users
- http://localhost:3001/investments
