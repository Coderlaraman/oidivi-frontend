const HeroSection = () => {
    return (
        <section className="relative w-full h-screen flex flex-col justify-center items-center text-white text-center">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                src="/videos/background.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative px-6 z-10">
                <h1 className="text-5xl md:text-7xl font-bold text-red-600">
                    Welcome to OiDiVi Helper
                </h1>
                <p className="text-2xl mt-4">
                    Connecting users with skilled professionals for various services.
                </p>


                {/* Search Form */}
                <div className="mt-12 flex flex-col items-center gap-4 px-4 sm:px-8">
                    <h3 className="text-xl text-white">Find Skilled Professionals</h3>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto">
                        <input
                            type="text"
                            placeholder="Category (e.g., plumber, electrician)"
                            className="w-full p-3 border border-gray-500 rounded text-gray-900"
                        />
                        <input
                            type="text"
                            placeholder="Location (ZIP code)"
                            className="w-2/5 p-3 border border-gray-500 rounded text-gray-900"
                        />
                        <button className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default HeroSection;
