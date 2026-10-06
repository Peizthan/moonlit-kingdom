export interface SheetTab {
  gid: string;
  title: string;
  rows: string[][];
}

export interface SheetData {
  tabs: SheetTab[];
  sheetUrl: string;
  fetchedAt: string;
}

export const SHEET_ID =
  process.env.NEXT_PUBLIC_BUDGET_SHEET_ID ?? '1dpwSrqkRMuzn46Xhnbh1irvTAoKJduSBedtpBONlRFg';

export const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;
