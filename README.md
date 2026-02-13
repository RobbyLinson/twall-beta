# TWall Beta 🧗

A community-driven platform for rating, reviewing, and sharing beta on climbing routes at Trinity Climbing Wall.

![Trinity Wall Colors](https://img.shields.io/badge/Colors-Light_Blue_%26_Silver-0ea5e9)
![License](https://img.shields.io/badge/License-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 Features

- **Browse Routes**: View all climbing routes organized by rope (A-N) and color
- **Rate & Review**: Leave star ratings and detailed reviews for climbs
- **Share Beta**: Post tips, sequences, and beta for routes
- **Grade Suggestions**: Suggest alternative grades if you think the official grade is off
- **User Authentication**: Secure sign-in with Clerk
- **Community Driven**: Open source and maintained by climbers

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Authentication**: Clerk
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Vercel Postgres)
- Clerk account for authentication

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RobbyLinson/twall-beta.git
   cd twall-beta
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Database
   DATABASE_URL=your_postgres_connection_string

   # App URL (for production)
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database** (optional)
   
   Edit `prisma/climbs.json` with your climbing routes, then:
   ```bash
   npm run seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
twall-beta/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── climbs.json         # Seed data for climbs
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── climbs/         # Climbs pages
│   │   ├── authors/        # Contributors page
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ReviewForm.tsx
│   │   └── ReviewsList.tsx
│   ├── lib/
│   │   └── db.ts           # Prisma client
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   └── data/
│       └── authors.json    # Contributors list
└── public/                 # Static assets
```

## 🎨 Color Scheme

TWall Beta uses Trinity Climbing Wall's brand colors:

- **Primary Blue**: Light blue (#0ea5e9) - represents energy and trust
- **Secondary Silver**: Cool silver (#64748b) - represents professionalism
- Gradient backgrounds and accents throughout

## 🗄️ Database Schema

### Models

- **User**: Clerk authentication synced users
- **Climb**: Routes organized by rope letter and color
- **Review**: User reviews with ratings, comments, and beta

See `prisma/schema.prisma` for the complete schema.

## 🤝 Contributing

We welcome contributions from the climbing community! Here's how you can help:

### Adding Yourself as a Contributor

1. Fork the repository
2. Edit `src/data/authors.json` and add your entry:
   ```json
   {
     "name": "Your Name",
     "role": "Contributor",
     "github": "your-github-username",
     "contributions": ["Feature you added", "Bug you fixed"],
     "joinedDate": "2025-02"
   }
   ```
3. Submit a pull request

### Development Workflow

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test locally: `npm run build` to catch TypeScript errors
4. Commit: `git commit -m "Add: your feature description"`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

### Adding New Climbs

Edit `prisma/climbs.json`:
```json
{
  "rope": "A",
  "color": "Red",
  "grade": "6B+"
}
```

Then run: `npm run seed`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database from climbs.json
- `npx prisma studio` - Open Prisma Studio (database GUI)

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The database will automatically connect if you're using Vercel Postgres.

## 🐛 Known Issues

- None currently! Report issues on GitHub.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Trinity Climbing Wall for being awesome
- The climbing community for feedback and contributions
- shadcn for the beautiful UI components

## 📧 Contact

- **Project Link**: [https://github.com/your-username/twall-beta](https://github.com/your-username/twall-beta)
- **Live Demo**: [https://twall-beta.vercel.app](https://twall-beta.vercel.app)

---

Built with ❤️ by climbers, for climbers. Keep sending! 🧗‍♀️