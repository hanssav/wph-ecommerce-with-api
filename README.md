# 🛍️ WPH Ecommerce

Ecommerce web app built with **Next.js 15**, **React 19**, and **TypeScript**.  
The project implements modern frontend architecture using **Server-Side Rendering (SSR)**, **Client-Side Rendering (CSR)**, and **Static Site Generation (SSG)** concepts — all integrated with **real API** endpoints and **protected routes** for authenticated users.

---

## 🚀 Live Demo

🔗 **Production URL:** [https://wph-ecommerce-with-api-fbno.vercel.app/](https://wph-ecommerce-with-api-fbno.vercel.app/)  
🎨 **Figma Design:** [View on Figma](https://www.figma.com/design/W38k1PafXVD6LnAQo8lNWe/Ecommerce---Batch-4---V2?node-id=29411-12622&p=f&t=P5BA56NN1CdwpvCv-0)

---

## 🧠 Core Features

- ✅ **Next.js Rendering Modes**

  - **SSR**: For dynamic and SEO-optimized pages (e.g. product details, user dashboard)
  - **SSG**: For static marketing or landing pages
  - **CSR**: For interactive client features (e.g. cart, filters, wishlist)

- 🔒 **Protected Routes**

  - Implemented with middleware & conditional client logic to restrict pages to **authenticated users only**

- 🔗 **Real API Integration**

  - Uses `axios` for fetching from live backend endpoints

- 💅 **UI/UX**
  - Built with **TailwindCSS v4**
  - Styled using **shadcn/ui** components (built on top of **Radix UI**)
  - Smooth animations via `tw-animate-css`

---

## 🧩 Tech Stack

| Layer             | Library / Tool                                                                                                                                  | Description                                 |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------ |
| **Framework**     | [Next.js 15](https://nextjs.org/)                                                                                                               | Hybrid React framework with SSR, SSG, CSR   |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                                                                                   | Strongly-typed JavaScript                   |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)                                                                     | Accessible and composable UI primitives     |
| **Styling**       | [TailwindCSS 4](https://tailwindcss.com/)                                                                                                       | Utility-first CSS framework                 |
| **Animation**     | [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)                                                                                  | CSS animation utility for Tailwind          |
| **State & Data**  | [@tanstack/react-query](https://tanstack.com/query/latest)                                                                                      | Data fetching, caching, and synchronization |
| **Forms**         | [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Form handling and validation                |
| **HTTP Client**   | [axios](https://axios-http.com/)                                                                                                                | Simplified API requests                     |
| **Date Utils**    | [dayjs](https://day.js.org/) / [date-fns](https://date-fns.org/)                                                                                | Lightweight date manipulation               |
| **Icons**         | [lucide-react](https://lucide.dev/)                                                                                                             | Beautifully simple icons for React          |
| **Helpers**       | `clsx`, `class-variance-authority`, `tailwind-merge`                                                                                            | Utility for managing Tailwind classnames    |

---

## 📦 Dependencies

```json
"dependencies": {
  "@hookform/resolvers": "^5.2.2",
  "@radix-ui/react-checkbox": "^1.3.3",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-popover": "^1.1.15",
  "@radix-ui/react-radio-group": "^1.3.8",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-slot": "^1.2.3",
  "@radix-ui/react-tabs": "^1.1.13",
  "@tanstack/react-query": "^5.90.2",
  "axios": "^1.12.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^4.1.0",
  "dayjs": "^1.11.18",
  "lucide-react": "^0.544.0",
  "next": "15.5.4",
  "react": "19.1.0",
  "react-day-picker": "^9.11.1",
  "react-dom": "19.1.0",
  "react-hook-form": "^7.63.0",
  "tailwind-merge": "^3.3.1",
  "zod": "^4.1.11"
}
```
