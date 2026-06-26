
function Footer() {
  return (
    <footer
  className="border-t border-slate-800 bg-slate-900/40 backdrop-blur-xl"
>

      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            EventSphere
          </h3>

          <p className="text-slate-400 text-sm mt-1">
            Modern College Event Management Platform
          </p>

        </div>

        <div className="flex gap-6 text-slate-400 text-sm">

          <a
            href="#about"
            className="hover:text-blue-400 transition"
          >
            About
          </a>

          <a
            href="#features"
            className="hover:text-blue-400 transition"
          >
            Features
          </a>

          <a
            href="#contact"
            className="hover:text-blue-400 transition"
          >
            Contact
          </a>
        </div>

        <div className="text-slate-500 text-sm">
          © 2026 EventSphere. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;

