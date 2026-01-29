export default function Navigation() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-full shadow-neu backdrop-blur-sm">
            <div className="flex gap-8">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-600 hover:text-pink-300 transition-colors font-light"
                >
                    Home
                </button>
                <button
                    onClick={() => scrollToSection('rsvp')}
                    className="text-gray-600 hover:text-pink-300 transition-colors font-light"
                >
                    RSVP
                </button>
                <button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    className="text-gray-600 hover:text-pink-300 transition-colors font-light"
                >
                    Details
                </button>
            </div>
        </nav>
    );
}
