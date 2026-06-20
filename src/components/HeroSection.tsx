import RevealLayer from "./RevealLayer";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";

const BG_IMAGE_1 = image1;
const BG_IMAGE_2 = image2;

const NAV_ITEMS = ["Story", "Career", "Racing", "Gallery", "Live"] as const;

export default function HeroSection() {
  return (
    <>
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between p-4 sm:p-5">
        {/* Left: logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic">
            Colapinto
          </span>
        </div>

        {/* Center pill (md+) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-white text-gray-900"
                  : "text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right: sign up (md+) + mobile hamburger */}
        <div className="flex items-center gap-3">
          <button className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
            Fan Zone
          </button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Open menu"
          >
            <span className="block w-5 h-px bg-white" />
            <span className="block w-5 h-px bg-white" />
            <span className="block w-5 h-px bg-white" />
          </button>
        </div>
      </nav>

      {/* ── Hero section ── */}
      <section
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: "100dvh" }}
      >
        {/* 1. Base image – z-10 */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* 2. Reveal layer – z-30 */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <RevealLayer image={BG_IMAGE_2} />
        </div>

        {/* 3. Heading – z-50 */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
            >
              Born to race,
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
            >
              built for F1
            </span>
          </h1>
        </div>

        {/* 4. Bottom-left paragraph – z-50 */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-65 z-50 hero-anim hero-fade"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Franco Colapinto — Argentina's fastest son. From karting circuits in
            Buenos Aires to the Formula 1 grid, every corner tells a story
            written at 300 km/h.
          </p>
        </div>
      </section>
    </>
  );
}
