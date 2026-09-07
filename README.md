# UBUREZI Mobile App

UBUREZI ni mobile learning app yubakiwe abana bafite imyaka 1–15, ifite Parent Account yo gucunga profile z’abana, imyigire, screen-time n’umutekano w’ibirimo. Hari n’igice cyihariye cy’uburezi ku bantu bakuru 18+ gikingirwa na Parent Account.

## UI / Design System

- Professional mobile-first visual system based on the selected UBUREZI visual target
- Blue educational brand palette with soft sky backgrounds, white surfaces, green success states, purple adult section and warm accent cards
- Consistent spacing, radii, borders and elevation through `src/theme.ts`
- Reusable bottom navigation and onboarding
- Supericons-selected Lucide icon set through `src/components/AppIcon.tsx` and `SuperIcon.tsx`
- Accessible touch targets, clear hierarchy and concise Kinyarwanda copy

## Ibirimo

- Onboarding flow
- Age selection: 1–3, 4–6, 7–10, 11–15
- 8 structured lessons with lesson detail and step-by-step learning
- Subject-specific quiz banks with saved scores
- Learning progress and quiz attempts
- Parent authentication with Supabase Auth
- Parent child profiles with Supabase synchronization
- Parent dashboard with synced child summary
- Screen-time controls
- Content safety controls; public child-to-child chat is disabled
- Adult education section separated from child learning
- Supabase PostgreSQL schema with Row Level Security (RLS)

## Gutangiza app

```bash
npm install
npx expo start
```

## Type checking

```bash
npm run typecheck
```

## Supabase setup

Kora project muri Supabase, ukore SQL iri muri `supabase/schema.sql`, hanyuma ushyire environment variables zikurikira muri `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Ntushyire secret/service-role keys muri GitHub cyangwa muri mobile app. Koresha publishable key igenewe client kandi ugene RLS neza kuri database.

Iyo variables za Supabase zitabonetse, app ikomeza gukora muri demo mode. Kuri production, koresha Supabase Auth, database policies na RLS.

## Tech stack

- React Native + Expo + TypeScript
- AsyncStorage + Expo SecureStore
- Supabase Auth + PostgreSQL + RLS
- `lucide-react-native` icons selected through Supericons

## Development branch

`feature/parent-auth-profiles`
