This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



```
oidivi-frontend
├─ .git
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           └─ HEAD
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-cf1583929420a8228e48f082633dcae6e254b6eb.idx
│  │     ├─ pack-cf1583929420a8228e48f082633dcae6e254b6eb.pack
│  │     └─ pack-cf1583929420a8228e48f082633dcae6e254b6eb.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.json
├─ clear
├─ eslint.config.mjs
├─ i18n.ts
├─ next.config.ts
├─ npm
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ images
│  │  ├─ default_avatar.png
│  │  └─ logo.jpeg
│  ├─ locales
│  │  ├─ en
│  │  │  └─ translation.json
│  │  └─ es
│  │     └─ translation.json
│  ├─ next.svg
│  ├─ vercel.svg
│  ├─ videos
│  │  └─ background.mp4
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  └─ register
│  │  │     └─ page.tsx
│  │  ├─ (dashboard)
│  │  │  └─ dashboard
│  │  │     └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ test
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ LoginForm.tsx
│  │  │  └─ RegisterForm.tsx
│  │  ├─ dashboard
│  │  │  └─ Dashboard.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ home
│  │  │  ├─ FeaturesSection.tsx
│  │  │  ├─ HeroSection.tsx
│  │  │  ├─ SearchForm.tsx
│  │  │  ├─ ServicesSection.tsx
│  │  │  └─ TestimonialsSection.tsx
│  │  ├─ layout
│  │  │  ├─ Footer.tsx
│  │  │  └─ Navbar.tsx
│  │  └─ shared
│  │     ├─ AddressInput.tsx
│  │     ├─ DashboardFooter.tsx
│  │     ├─ DashboardHeader.tsx
│  │     ├─ EditProfile.tsx
│  │     ├─ ProfilePhotoUploader.tsx
│  │     ├─ ProfileVideoUploader.tsx
│  │     ├─ QuickLinks.tsx
│  │     ├─ SearchInput.tsx
│  │     ├─ SidebarDesktop.tsx
│  │     ├─ SidebarMobile.tsx
│  │     ├─ UserActivities.tsx
│  │     └─ UserProfileDetails.tsx
│  ├─ hooks
│  │  ├─ useDashboard.ts
│  │  ├─ useLogin.ts
│  │  └─ useRegister.ts
│  ├─ lib
│  │  └─ api.ts
│  ├─ styles
│  │  └─ globals.css
│  ├─ types
│  │  └─ index.ts
│  └─ utils
│     ├─ formDataHelper.ts
│     └─ helpers.ts
├─ tailwind.config.ts
└─ tsconfig.json

```