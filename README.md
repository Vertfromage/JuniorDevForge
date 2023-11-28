# JuniorDevForge
Our mission is to empower junior developers by providing them with a platform to form teams and collaboratively build real-world projects.

# Live Site

[junior-dev-forge.vercel.app](https://junior-dev-forge.vercel.app/)

# Run locally
- clone the project locally
- First you'll need to setup your own versions of mongoDB and github Oauth app. 

mongoDB: Follow the configuration directions from the example project: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/README.md

github Oauth: https://github.com/settings/developers
-You'll need to make a new OauthApp
-Save the client ID and client secret for your env.local variables
-set the homepage url to: http://localhost:3000/
-set the call back url to: http://localhost:3000/api/auth/callback/github
- for next auth secret: https://generate-secret.vercel.app/32

- change the .env.local.example to .env.local and fill in the variables

- open folder in terminal
- If you haven't already install npm (google it)

```bash
# cd into NEXTJS folder
cd j_dev_forge

# install all packages
npm install

# run it in development mode
npm run dev
```

# Understanding the code
This starter is a combo of the two examples:
- with-mongodb-mongoose example: with https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose
- next-auth example: https://github.com/nextauthjs/next-auth-example

- We're using the pages router, in the (docs)[https://nextjs.org/docs] make sure you select using pages router instead of using app router.

- Everything important is in the src folder. 
- The lib folder is where the database connection code is
- The models folder is where the database schema is defined
- auth.ts and middleware.ts are for openAuth
- As it's react everything is like russian nesting dolls, but the outermost file to worry about is pages/index.tsx, around that is _app.tsx but unless you're adding global props you probably shouldn't be making changes there. 

- All the other pages are files in pages.tsx
- Routes are under pages/api, the two folders 'examples' and 'pets' are examples from auth and mongodb, which should serve as examples.
- The folder [id] is how they set up the cards for the mongoDB example, it may be a helpful example
- All of the components that are used in the various pages are found in the components folder

# Helpful Docs:
https://react.dev/learn
https://nextjs.org/learn/foundations/about-nextjs

https://nextjs.org/docs
https://nodejs.org/en/docs/guides

https://eslint.org/docs/latest/

https://www.digitalcrafts.com/blog/learn-how-start-new-group-project-github (See last part for how to make branches and pull requests. Unfortunately my github account isn't good enough to enforce branch protection rules.) 

https://tailwindcss.com/ 
Simple css framework

# Github directions
Make new branch
```bash
git checkout -b branchName 
```
Check out existing branch
```bash
git checkout branchName
```
Push your branch to github
```bash
git add . 

git commit -m “message”

git push origin branchName

```
– This creates the branch remotely and pushes to that branch on GitHub

Whenever main is updated make sure you bring those changes into your branch and resolve any conflicts, this will reduce conflicts overall
```bash
git checkout main
git pull
git checkout branchName
git pull
git merge origin/main
git push
```
If you're feeling brave you can use rebase: https://www.atlassian.com/git/tutorials/merging-vs-rebasing

```bash
git checkout main
git pull
git checkout branchName
git pull
git rebase main
git push
```

# When ready to merge to main:
- Check that it passes the lint tests
```bash
 npm run lint
 ```
 - Warnings are okay, errors are not

- Go on github and make a pull request
- Message one of your team members to do a code review
- If approved merge to main
- Fix any merge conflicts, and make sure deployment works
Deployed link: https://junior-dev-forge.vercel.app/

- Update project board

