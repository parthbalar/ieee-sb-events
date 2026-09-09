
// Note the updated path to match your folder structure
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'IEEE Student Branch | RNGPIT',
  description: 'Official portal for events, team, and registration.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <div className="pt-24 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}