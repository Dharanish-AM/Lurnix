import React from 'react';
import { HelpCircle, Info, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Lurnix
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Making learning accessible for students with dyslexia through innovative 
              technology and inclusive design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#help" 
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  <Info className="w-4 h-4 mr-2" />
                  About Lurnix
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Accessibility Statement */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Accessibility
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              We're committed to making education accessible for everyone. 
              Our platform follows WCAG 2.1 AA guidelines.
            </p>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>for inclusive learning</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 Lurnix. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}