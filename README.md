# Moonlit Kingdom

Next.js 16 / React 19 wedding presentation and authenticated planning panel. The existing Vercel project deploys `main`.

## Local development

Use Node.js 22.18 or newer (the data tests use native TypeScript stripping).

```sh
npm ci
npm run dev
```

Set `ADMIN_PASSWORD` and `SESSION_SECRET` in local environment configuration. Use the existing Supabase environment configuration for shared planning overrides. Do not commit credentials or guest exports.

```sh
npm run lint
npm test
npx tsc --noEmit
npm run build
```

## Planning spreadsheets

The mirrors are read-only; edits remain in Google Sheets. `Actualizar` fetches the latest formatted values. A failed refresh retains the previous loaded data.

- Budget: `Presupuesto General` and `Cálculos Adicionales`, through `/api/sheet?source=budget`.
- Guests: `Invitados` and `Resumen`, through `/api/sheet?source=guests` and `/dashboard/invitados`.

`lib/sheet-sources.ts` contains the approved source IDs, exact tab IDs and expected headers. It is server-only. The former `NEXT_PUBLIC_BUDGET_SHEET_ID` variable is no longer used, so an old deployment variable cannot select the previous budget by accident.

Both API sources require the existing admin session before fetching data. Responses use `private, no-store`; neither guest records nor downloaded spreadsheet files are included in the repository. The current integration reads Google CSV exports and needs the existing spreadsheet link access to remain available. Spreadsheet sharing is managed separately in Google Drive.

## Background and reading surfaces

The base parchment color and the low-opacity page texture are independent in `app/globals.css`. The hero and margin botanicals use the intact approved artwork with CSS masks. Planning tables, cards and forms use solid parchment surfaces so the texture cannot interfere with the data. The hero date and 18:00 remain unchanged.
