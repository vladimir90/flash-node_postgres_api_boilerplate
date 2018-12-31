# flash-node_postgres_api_boilerplate
A boilerplate app for building RESTful APIs in Node.js using express and sequelize (default is set for postgres).

- Clone the repo: 
  git@github.com:vladimir90/flash-node_postgres_api_boilerplate.git
  
- Update dependecies:   
  npm install
  
- Setup .env 
  rename .env-setup into .env and fill up variables
  
- Run sequelize CLI commands:
    - Create database: (sequelize db:create)
    - Create migrations: (sequelize db:migrate or db:migrate:all)
    - Create seeds: (sequelize db:seed or db:seed:all)
    
- Run app 
    nodemon server/app.js

- Run tests (require to change default port for running tests).Make test database and migrations: 
    - NODE_ENV=test sequelize db:create
    - NODE_ENV=test sequelize db:migrate
    - PORT=3000 npm run test 
        
- Implemented basic JWT auth:
   - POST/ login, register
   - GET/ me, users

    
  

