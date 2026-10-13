export type SheetSource = 'budget' | 'guests';

export interface SheetTab {
  gid: string;
  title: string;
  rows: string[][];
  headerRow: number;
  numericColumns: number[];
  /** Original worksheet row numbers, for stable record identity. */
  rowNumbers: number[];
}

export interface SheetData {
  source: SheetSource;
  tabs: SheetTab[];
  sheetUrl: string;
  fetchedAt: string;
}
