import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="px-10 py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">DSA Sheets</h1>
        <Link to="/" className="text-slate-400 hover:text-white">
          Home
        </Link>
      </nav>

      <main className="px-10 py-8 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
