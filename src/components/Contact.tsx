
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
        
        <div className="max-w-3xl mx-auto">
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
                    <p className="text-gray-400">aryan.saini3001@gmail.com</p>
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
    </section>
  );
};

export default Contact;
