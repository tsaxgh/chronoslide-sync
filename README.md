
# TSA Animated Year Timeline

## Project Overview

This project is a modern React + Vite web application featuring a custom animated timeline component (`AnimatedYearTimeline`). The timeline displays major news and milestones for TSA India, with a visually engaging year slider and content transitions.

## Local Development Workflow

1. **Clone the repository**
	```sh
	git clone <YOUR_GIT_URL>
	cd <YOUR_PROJECT_NAME>
	```
2. **Install dependencies**
	```sh
	npm install
	```
3. **Start the development server**
	```sh
	npm run dev
	```
	The app will be available at [http://localhost:8080](http://localhost:8080).

4. **Edit the Timeline**
	- The main timeline logic is in `src/components/AnimatedYearTimeline.tsx`.
	- Timeline data is defined at the top of that file. You can add, remove, or edit years and news items as needed.
	- The component supports infinite looping, smooth scroll, and responsive design.

5. **Build for production**
	```sh
	npm run build
	```
	The output will be in the `dist/` folder.

## Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

You can deploy the contents of the `dist/` folder to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

---

All references to Lovable and its services have been removed from this project. This is now a fully standalone React/Vite application.
