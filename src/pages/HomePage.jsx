// Replace COMPLETE HomePage.jsx with this upgraded version

const companies = [
  {
    name: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    color: "from-red-600 to-orange-500",
    glow: "shadow-red-200",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    color: "from-yellow-500 to-orange-500",
    glow: "shadow-yellow-200",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    color: "from-blue-500 to-green-500",
    glow: "shadow-blue-200",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-200",
  },
];

const floatingIcons = [
  "☕",
  "💻",
  "⚡",
  "🚀",
  "🧠",
  "🖥️",
  "📦",
  "🔧",
  "☁️",
  "🧩",
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden relative">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <div
            key={index}
            className={`absolute text-5xl opacity-10 animate-bounce`}
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + index}s`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Gradient Blur Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-400 rounded-full blur-[120px] opacity-20"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-400 rounded-full blur-[120px] opacity-20"></div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-10 py-5 flex justify-between items-center">

        {/* Logo */}
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            <span className="text-blue-600">Java</span>
            <span className="text-slate-900">Hired</span>
          </h1>

          <p className="text-slate-500 text-sm font-medium tracking-wide">
            JAVA INTERVIEW PLATFORM
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
          Login
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold text-sm mb-8">
            🚀 AI Powered Interview Preparation
          </div>

          <h1 className="text-7xl font-black text-slate-900 leading-tight tracking-tight">
            Crack Java Interviews
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Like A Pro
            </span>
          </h1>

          <p className="mt-8 text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Master Java Backend, Spring Boot, System Design,
            Microservices & Real Company Interview Questions.
          </p>

        </div>

        {/* Search Container */}
        <div className="relative mt-16 max-w-6xl mx-auto">

          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-[40px] blur-3xl opacity-20"></div>

          <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[40px] shadow-2xl p-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <select className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-5 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-200">
                <option>Select Company</option>
                <option>Oracle</option>
                <option>Amazon</option>
                <option>Google</option>
                <option>Infosys</option>
                <option>TCS</option>
              </select>

              <select className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-5 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-200">
                <option>Years of Experience</option>
                <option>0-1 Years</option>
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>5-8 Years</option>
              </select>

              <select className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-5 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-200">
                <option>Interview Type</option>
                <option>Java Backend</option>
                <option>Java Full Stack</option>
                <option>Spring Boot</option>
                <option>React Frontend</option>
              </select>

            </div>

            <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition duration-300 text-white text-2xl font-bold py-5 rounded-2xl shadow-xl">
              Generate Interview Plan 🚀
            </button>

          </div>

        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-14">

          {[
            "Java",
            "Spring Boot",
            "Microservices",
            "System Design",
            "DSA",
            "React",
            "SQL",
            "Kafka",
          ].map((tech) => (
            <div
              key={tech}
              className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-semibold text-slate-700 shadow-sm hover:shadow-lg transition"
            >
              {tech}
            </div>
          ))}

        </div>

        {/* Company Cards */}
       {/* Featured Company Cards */}
<div className="mt-28">

  <div className="text-center">

    <h2 className="text-5xl font-black text-slate-900">
      Prepare For Top Companies
    </h2>

    <p className="mt-5 text-xl text-slate-600">
      Company-specific interview preparation roadmaps powered by AI.
    </p>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">

    {/* Mphasis */}
    <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-purple-700 to-indigo-600 p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500">

      <div className="bg-white rounded-2xl p-4 w-fit">
        <img
          src="https://companieslogo.com/img/orig/MPHASIS.NS_BIG-76fdbb6a.png?t=1720244492"
          alt="Mphasis"
          className="h-10 object-contain"
        />
      </div>

      <h3 className="mt-8 text-4xl font-black">
        Mphasis
      </h3>

      <p className="mt-4 text-lg leading-relaxed opacity-90">
        Java backend, Spring Boot, banking domain,
        SQL & microservices interview preparation.
      </p>

      <button className="mt-10 bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold">
        Explore Questions →
      </button>

    </div>

    {/* JPMorgan */}
    <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500">

      <div className="bg-white rounded-2xl p-4 w-fit">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg"
          alt="JPMorgan"
          className="h-10 object-contain"
        />
      </div>

      <h3 className="mt-8 text-4xl font-black">
        JPMorgan
      </h3>

      <p className="mt-4 text-lg leading-relaxed opacity-90">
        Enterprise Java, multithreading,
        low latency systems & fintech interviews.
      </p>

      <button className="mt-10 bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold">
        Explore Questions →
      </button>

    </div>

    {/* Wells Fargo */}
    <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-red-700 to-yellow-600 p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500">

      <div className="bg-white rounded-2xl p-4 w-fit">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Wells_Fargo_Bank.svg"
          alt="Wells Fargo"
          className="h-10 object-contain"
        />
      </div>

      <h3 className="mt-8 text-4xl font-black">
        Wells Fargo
      </h3>

      <p className="mt-4 text-lg leading-relaxed opacity-90">
        Banking technology interviews,
        APIs, Java backend & production support.
      </p>

      <button className="mt-10 bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold">
        Explore Questions →
      </button>

    </div>

    {/* Deloitte */}
    <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 to-green-500 p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500">

      <div className="bg-white rounded-2xl p-4 w-fit">
        <img
          src="https://1000logos.net/wp-content/uploads/2021/05/Deloitte-logo.png"
          alt="Deloitte"
          className="h-10 object-contain"
        />
      </div>

      <h3 className="mt-8 text-4xl font-black">
        Deloitte
      </h3>

      <p className="mt-4 text-lg leading-relaxed opacity-90">
        Java full stack, consulting projects,
        React + Spring Boot interview prep.
      </p>

      <button className="mt-10 bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold">
        Explore Questions →
      </button>

    </div>

  </div>

</div>

{/* Moving Companies Strip */}
<div className="mt-32">

  <div className="text-center">

    <h2 className="text-5xl font-black text-slate-900">
      Companies Developers Prepare For
    </h2>

    <p className="mt-5 text-xl text-slate-600">
      Curated interview preparation experiences from top companies.
    </p>

  </div>

  <div className="relative overflow-hidden mt-16">

    <div className="flex gap-16 animate-marquee whitespace-nowrap">

      {[
        "Google",
        "Microsoft",
        "Amazon",
        "Oracle",
        "Infosys",
        "TCS",
        "Wipro",
        "Accenture",
        "Capgemini",
        "PayPal",
        "Netflix",
        "Uber",
        "Adobe",
        "Flipkart",
        "Swiggy",
        "Zomato",
        "LinkedIn",
        "Meta",
        "Apple",
        "IBM",
        "Cisco",
        "Goldman Sachs",
        "Paytm",
        "Intuit",
      ].map((company) => (
        <div
          key={company}
          className="bg-white border border-slate-200 shadow-lg px-8 py-5 rounded-2xl text-xl font-bold text-slate-700 hover:scale-105 transition"
        >
          {company}
        </div>
      ))}

    </div>

  </div>

</div>
      </section>

    </div>
  );
};

export default HomePage;