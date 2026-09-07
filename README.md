# UBUREZI Mobile App

UBUREZI ni mobile learning app yubakiwe abana bafite imyaka 1–15, ifite Parent Account yo gucunga profile z’abana, imyigire, screen-time n’umutekano w’ibirimo. Hari n’igice cyihariye cy’uburezi ku bantu bakuru 18+ gikingirwa na Parent Account.

## Ibirimo ubu

- Age selection: 1–3, 4–6, 7–10, 11–15
- Lessons zifite lesson detail, intambwe ku yindi n’igihe
- Quiz flow ifite amanota n’ibisubizo
- Learning progress ibikwa muri AsyncStorage kandi ishobora guhuza na Supabase
- Quiz attempts zibikwa muri AsyncStorage
- Parent authentication: Supabase Auth iyo environment variables zihari
- Demo fallback: password ibikwa muri Expo SecureStore gusa ku gikoresho, si production authentication
- Parent child profiles
- Screen-time settings zibikwa
- Content safety settings zibikwa
- Adult education section itandukanye n’ibirimo by’abana kandi ikenera Parent Account
- Supabase schema ifite Row Level Security (RLS)

## Gutangiza app

```bash
npm install
npx expo start
```

## Supabase setup

Kora project muri Supabase, ukore SQL iri muri `supabase/schema.sql`, hanyuma ushyire environment variables zikurikira muri `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Ntushyire secret/service-role keys muri GitHub cyangwa muri mobile app. Koresha publishable key igenewe client kandi ugene RLS neza kuri database.

Iyo variables za Supabase zitabonetse, app ikomeza gukora muri demo mode. Kuri production, koresha Supabase Auth kandi ushyire RLS kuri tables zose.

## Tech stack

- React Native + Expo + TypeScript
- AsyncStorage + Expo SecureStore
- Supabase Auth + PostgreSQL + RLS
- Expo Vector Icons

## Branch

Development branch: `feature/parent-auth-profiles`
