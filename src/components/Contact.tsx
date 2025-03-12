
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Get in</span> Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions about EvolveX or interested in collaborating? We'd love to hear from you!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-30"></div>
              <div className="glass-card rounded-xl p-6 relative">
                <h3 className="text-2xl font-semibold mb-6 text-white">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="button-glow px-6 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-500 transition-all w-full md:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-xl blur opacity-30"></div>
              <div className="glass-card rounded-xl p-6 relative h-full">
                <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Address</h4>
                      <p className="text-gray-400">
                        RNSIT Campus, Channasandra, <br />
                        Bengaluru, Karnataka 560098
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-400">evolvex@rnsit.ac.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-400">+91 80 2843 5723</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-700/50 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5 text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-700/50 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5 text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-700/50 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
