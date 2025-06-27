# Edwin Ng - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, showcasing my skills and experience as a Full-Stack Developer.

## 🌟 Features

- **Modern Design**: Clean, professional aesthetic with dark theme and gradient accents
- **Timeline Navigation**: Interactive sidebar with smooth scroll detection and section highlighting
- **Responsive Layout**: Adaptive margins for sidebar visibility on different screen sizes
- **Performance Optimized**: Optimized images, lazy loading, and fast LCP times
- **Responsive Design**: Mobile-first approach with seamless tablet and desktop experiences
- **Interactive Sections**: 
  - Hero with animated profile photo
  - About with skills showcase
  - Experience timeline
  - Projects with GitHub integration
  - Professional recommendations
  - Contact form with email integration
- **Smooth Animations**: Cascading entrance animations and hover effects
- **SEO Optimized**: Comprehensive metadata and semantic HTML

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Email**: SMTP integration
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/notedwin-dev/edwin-portfolio.git
   cd edwin-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```bash
   # SMTP Configuration for Email Sending
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # GitHub API Token (Optional - for higher rate limits)
   GITHUB_TOKEN=your-github-personal-access-token
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `components/hero.tsx` - Name, title, and profile image
- `components/about.tsx` - About section content
- `components/experience.tsx` - Work experience
- `components/recommendations.tsx` - Professional recommendations
- `components/contact.tsx` - Contact information

### Images
Replace images in `public/images/`:
- `profile.jpg` - Your profile photo
- `logo.png` - Your personal logo
- Add project screenshots as needed

### Styling
- Colors and themes: `tailwind.config.ts`
- Global styles: `app/globals.css`
- Component styles: Individual component files

## 📱 Performance

This portfolio is optimized for performance with:
- **Image Optimization**: WebP/AVIF formats with proper sizing
- **Code Splitting**: Automatic by Next.js
- **Lazy Loading**: Images and non-critical components
- **Caching**: Optimized cache headers and static generation
- **Core Web Vitals**: Optimized LCP, FID, and CLS scores

## 🔧 Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checking
```

## 📂 Project Structure

```
edwin-portfolio/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero.tsx          # Hero section
│   ├── about.tsx         # About section
│   ├── experience.tsx    # Experience timeline
│   ├── projects.tsx      # Projects showcase
│   ├── recommendations.tsx # Professional recommendations
│   ├── contact.tsx       # Contact form
│   ├── navigation.tsx    # Top navigation
│   ├── sidebar.tsx       # Timeline sidebar
│   └── footer.tsx        # Footer
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   └── images/           # Image assets
├── styles/               # Additional styles
└── ...config files
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
This is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any platform supporting Node.js

## 📧 Contact Form Setup

To enable the contact form:

1. **Gmail SMTP** (Recommended)
   - Enable 2FA on your Gmail account
   - Generate an App Password
   - Use the App Password in `SMTP_PASS`

2. **Other Email Providers**
   - Update SMTP settings in `.env.local`
   - Ensure the provider allows SMTP access

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [Vercel](https://vercel.com/) - Deployment platform

---

**Edwin Ng** - Full-Stack Developer  
📧 [Contact](mailto:your-email@example.com) | 💼 [LinkedIn](https://linkedin.com/in/edwin-ng2404) | 🐱 [GitHub](https://github.com/notedwin-dev)
