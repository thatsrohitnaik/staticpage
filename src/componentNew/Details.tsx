import { MapPin, Clock, Camera, Gift, ExternalLink } from 'lucide-react';

export default function Details() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-light text-center mb-16 text-gray-700">
                    Wedding Details
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-3xl shadow-neu">
                        <div className="w-16 h-16 rounded-full shadow-neu mb-6 flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-pink-300" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-700 mb-4">Wedding Venue</h3>
                        <a
                            href="https://maps.app.goo.gl/x9yGzeV9u1JrYRag8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-2 text-pink-300 underline hover:text-pink-400 transition-colors font-medium mb-4"
                        >
              <span>
                Sala de Gaspar<br />
                Miramar, Goa
              </span>
                            <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                        </a>
                        <p className="text-gray-500 text-sm">
                            Reception to follow at 2:00 PM
                        </p>
                    </div>

                    <div className="p-10 rounded-3xl shadow-neu">
                        <div className="w-16 h-16 rounded-full shadow-neu mb-6 flex items-center justify-center">
                            <Clock className="w-8 h-8 text-pink-300" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-700 mb-4">Schedule</h3>
                        <div className="space-y-3 text-gray-600">
                            <div className="flex justify-between">
                                <span>Haldi Ceremony</span>
                                <span className="text-gray-500">Feb 25, 10:00 AM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Wedding Ceremony</span>
                                <span className="text-gray-500">Feb 26, 12:06 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Reception</span>
                                <span className="text-gray-500">Feb 26, 2:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-3xl shadow-neu">
                        <div className="w-16 h-16 rounded-full shadow-neu mb-6 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-pink-300" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-700 mb-4">Dress Code</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Traditional attire. If your out fit doesn’t make a little swish-swish sound when you walk, try again.
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Come prepared for a joyous celebration filled with music, dance, and festive cheer.
                        </p>
                    </div>

                    <div className="p-10 rounded-3xl shadow-neu">
                        <div className="w-16 h-16 rounded-full shadow-neu mb-6 flex items-center justify-center">
                            <Gift className="w-8 h-8 text-pink-300" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-700 mb-4">Groom Haldi Venue</h3>
                        <a
                            href="https://maps.app.goo.gl/b9gcVuNKXmcPoCYS6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-2 text-pink-300 underline hover:text-pink-400 transition-colors font-medium mb-4"
                        >
              <span>
                Raghuvir Niwas<br />
                Kundai, Ponda<br />
                Goa
              </span>
                            <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                        </a>
                        <p className="text-gray-500 text-sm">
                            Wednesday, February 25th at 10:00 AM
                        </p>
                    </div>
                    <div className="p-10 rounded-3xl shadow-neu">
                        <div className="w-16 h-16 rounded-full shadow-neu mb-6 flex items-center justify-center">
                            <Gift className="w-8 h-8 text-pink-300" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-700 mb-4">Bride Haldi Venue</h3>
                        <a
                            href="https://maps.app.goo.gl/u866X4JRQFsJWJzG9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-2 text-pink-300 underline hover:text-pink-400 transition-colors font-medium mb-4"
                        >
              <span>
                Gracia's villa<br />
                Miramar,<br />
                Goa
              </span>
                            <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                        </a>
                        <p className="text-gray-500 text-sm">
                            Wednesday, February 25th at 10:00 AM
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
