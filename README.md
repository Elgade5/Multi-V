# MultiV Dashboard

A Next.js 14 dashboard for the MultiV Discord verification bot.

## Stack
- **Next.js 14** (App Router)
- **NextAuth.js** (Discord OAuth)
- **Supabase** (database)
- **Tailwind CSS** (styling)
- **Framer Motion** / **Lucide** (icons)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Edit `.env.local` and fill in your values:

```env
DISCORD_ID=1439003828639760656
DISCORD_CLIENT_SECRET=your_secret
DISCORD_TOKEN=your_bot_token
SUPABASE_URL=https://rxaggefixdonftkzyjhx.supabase.co
SUPABASE_SERVICE_ROLE=your_service_role
NEXTAUTH_SECRET=generate_with_openssl_rand_-base64_32
NEXTAUTH_URL=http://localhost:3000
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Discord OAuth redirect URI

In your [Discord Developer Portal](https://discord.com/developers/applications):
1. Go to **OAuth2 → Redirects**
2. Add: `http://localhost:3000/api/auth/callback/discord`
3. For production add your real domain too

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Gallery

To add screenshots to the gallery, place image files in `/public/gallery/` and update `src/data/gallery.ts`:

```ts
{
  id: 1,
  title: 'Verification Button',
  image: '/gallery/verify-button.png',   // ← set this
  ...
}
```

---

## Deploy to Vercel

```bash
npm run build
```

Or push to GitHub and connect to [Vercel](https://vercel.com). Set all `.env.local` variables in your Vercel project settings.

Update `NEXTAUTH_URL` to your production domain before deploying.
