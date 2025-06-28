export const TAB_ITEMS = ["家計入力", "月別分析", "全履歴"] as const;
export type TabItem = (typeof TAB_ITEMS)[number];
