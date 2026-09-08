import './globals.css';

export const metadata = {
  title: 'Mosaic — Find beauty everywhere',
  description: 'A tiny, thoughtful photo discovery experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
