// import { useState } from 'react';
// // import { supabase } from '../supabase';
// import { Send } from 'lucide-react';
//
// export default function RSVP() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         guests_count: 1,
//         attending: true,
//         dietary_restrictions: '',
//         message: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [submitted, setSubmitted] = useState(false);
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//
//         try {
//             const { error } = await supabase
//                 .from('rsvps')
//                 .insert([formData]);
//
//             if (error) throw error;
//
//             setSubmitted(true);
//             setFormData({
//                 name: '',
//                 email: '',
//                 guests_count: 1,
//                 attending: true,
//                 dietary_restrictions: '',
//                 message: ''
//             });
//         } catch (error) {
//             console.error('Error submitting RSVP:', error);
//             alert('Failed to submit RSVP. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     if (submitted) {
//         return (
//             <section className="py-20 px-4" id="rsvp">
//                 <div className="max-w-2xl mx-auto">
//                     <div className="p-10 rounded-3xl shadow-neu text-center">
//                         <div className="w-20 h-20 mx-auto mb-6 rounded-full shadow-neu flex items-center justify-center">
//                             <span className="text-4xl">✓</span>
//                         </div>
//                         <h3 className="text-3xl font-light text-gray-700 mb-4">Thank You!</h3>
//                         <p className="text-gray-600 mb-6">
//                             Your RSVP has been received. We can't wait to celebrate with you!
//                         </p>
//                         <button
//                             onClick={() => setSubmitted(false)}
//                             className="px-8 py-3 rounded-full shadow-neu hover:shadow-neu-pressed transition-all duration-200 text-gray-700"
//                         >
//                             Submit Another RSVP
//                         </button>
//                     </div>
//                 </div>
//             </section>
//         );
//     }
//
//     return (
//         <section className="py-20 px-4" id="rsvp">
//             <div className="max-w-2xl mx-auto">
//                 <h2 className="text-5xl font-light text-center mb-4 text-gray-700">RSVP</h2>
//                 <p className="text-center text-gray-600 mb-12">
//                     Please let us know if you'll be joining us
//                 </p>
//
//                 <form onSubmit={handleSubmit} className="p-10 rounded-3xl shadow-neu">
//                     <div className="space-y-6">
//                         <div>
//                             <label className="block text-gray-700 mb-2 font-light">Name *</label>
//                             <input
//                                 type="text"
//                                 required
//                                 value={formData.name}
//                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                 className="w-full px-6 py-4 rounded-2xl shadow-neu-inset bg-transparent focus:outline-none text-gray-700"
//                                 placeholder="Your full name"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="block text-gray-700 mb-2 font-light">Email *</label>
//                             <input
//                                 type="email"
//                                 required
//                                 value={formData.email}
//                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                 className="w-full px-6 py-4 rounded-2xl shadow-neu-inset bg-transparent focus:outline-none text-gray-700"
//                                 placeholder="your@email.com"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="block text-gray-700 mb-2 font-light">Number of Guests *</label>
//                             <input
//                                 type="number"
//                                 min="1"
//                                 max="10"
//                                 required
//                                 value={formData.guests_count}
//                                 onChange={(e) => setFormData({ ...formData, guests_count: parseInt(e.target.value) })}
//                                 className="w-full px-6 py-4 rounded-2xl shadow-neu-inset bg-transparent focus:outline-none text-gray-700"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="block text-gray-700 mb-4 font-light">Will you be attending? *</label>
//                             <div className="flex gap-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setFormData({ ...formData, attending: true })}
//                                     className={`flex-1 px-6 py-4 rounded-2xl transition-all duration-200 ${
//                                         formData.attending
//                                             ? 'shadow-neu-pressed text-pink-300'
//                                             : 'shadow-neu text-gray-600 hover:shadow-neu-pressed'
//                                     }`}
//                                 >
//                                     Yes, I'll be there
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setFormData({ ...formData, attending: false })}
//                                     className={`flex-1 px-6 py-4 rounded-2xl transition-all duration-200 ${
//                                         !formData.attending
//                                             ? 'shadow-neu-pressed text-gray-700'
//                                             : 'shadow-neu text-gray-600 hover:shadow-neu-pressed'
//                                     }`}
//                                 >
//                                     Can't make it
//                                 </button>
//                             </div>
//                         </div>
//
//                         <div>
//                             <label className="block text-gray-700 mb-2 font-light">Dietary Restrictions</label>
//                             <input
//                                 type="text"
//                                 value={formData.dietary_restrictions}
//                                 onChange={(e) => setFormData({ ...formData, dietary_restrictions: e.target.value })}
//                                 className="w-full px-6 py-4 rounded-2xl shadow-neu-inset bg-transparent focus:outline-none text-gray-700"
//                                 placeholder="Any allergies or dietary needs?"
//                             />
//                         </div>
//
//                         <div>
//                             <label className="block text-gray-700 mb-2 font-light">Message to the Couple</label>
//                             <textarea
//                                 value={formData.message}
//                                 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                                 rows={4}
//                                 className="w-full px-6 py-4 rounded-2xl shadow-neu-inset bg-transparent focus:outline-none text-gray-700 resize-none"
//                                 placeholder="Share your excitement or well wishes..."
//                             />
//                         </div>
//
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full px-8 py-4 rounded-2xl shadow-neu hover:shadow-neu-pressed transition-all duration-200 text-gray-700 font-light text-lg flex items-center justify-center gap-2 disabled:opacity-50"
//                         >
//                             {loading ? 'Submitting...' : 'Submit RSVP'}
//                             <Send className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </section>
//     );
// }
