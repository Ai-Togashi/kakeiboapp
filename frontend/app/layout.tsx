import './globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>家計簿アプリ</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
