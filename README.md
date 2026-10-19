# Computer Assembly and Windows Learning Prototype

Interactive lessons for computer assembly and Windows installation, with pre-test and post-test quizzes.

## Technology Stack

- React 18
- Vite 5
- Three.js
- React Three Fiber
- @react-three/drei

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Google Sheets quiz results

The assembly and Windows practice lessons remain available. The site asks for a student's name, class number, and room only when starting a test. It saves only quiz results to `แบบทดสอบก่อนเรียน` and `แบบทดสอบหลังเรียน`, including the lesson, score, maximum score, and submission time. There is no member registration or practice-time saving.

1. Create or open the Google Sheet that will hold the class records.
2. In that spreadsheet, open **Extensions → Apps Script** and paste the contents of `google-apps-script/Code.gs` into the script editor.
3. Run `setupSheets` once from the Apps Script editor and approve the requested spreadsheet access. This creates the two quiz tabs with headers. Existing member or practice tabs are left untouched.
4. If a web app deployment already exists, open **Deploy → Manage deployments**, edit it, select **New version**, and deploy. Otherwise select **Deploy → New deployment → Web app**. Set **Execute as** to your account and access according to your school's policy, then deploy and copy the URL ending in `/exec`.
5. Copy `.env.example` to `.env.local` and set `VITE_GOOGLE_SHEETS_WEB_APP_URL` to the copied URL.
6. Restart the development server, or build and redeploy the site so the URL is included in the site configuration.

The site sends quiz results to the deployed endpoint. Keep the spreadsheet private and share the endpoint only through the class site.

The browser sends requests in no-cors mode, so the page can report that a save request was sent but cannot read the Apps Script response. Confirm a quiz result appears in the matching tab after deployment.

## Features

- Interactive 3D computer assembly practice
- Windows installation simulation
- Pre-test and post-test modes
- Quizzes for computer assembly and Windows installation
- Score feedback with explanations for each answer
- Google Sheets result logging by student, lesson, and test mode

## Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── ErrorBoundary.jsx
│   ├── Scene.jsx
│   ├── ComputerCase.jsx
│   ├── Part.jsx
│   ├── InstallationZone.jsx
│   ├── AssemblyPanel.jsx
│   ├── ComponentPanel.jsx
│   └── TopNav.jsx
├── data/
│   ├── parts.js
│   ├── installationZones.js
│   └── assemblySteps.js
└── hooks/
    └── useAssemblyStore.js
```

## Usage

1. Choose assembly practice, Windows practice, the pre-test, or the post-test.
2. For a test, enter the name, class number, and room to identify the result.
3. Select either computer assembly or Windows installation and answer the 10 questions.
4. Review the score and confirm it appears in the matching Google Sheets tab.
