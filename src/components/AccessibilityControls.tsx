import React from 'react';
import { Type, Eye, Contrast, Volume2 } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function AccessibilityControls() {
  const { 
    fontSize, 
    setFontSize, 
    isDyslexicFont, 
    setIsDyslexicFont, 
    isHighContrast, 
    setIsHighContrast 
  } = useAccessibility();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-5 transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
        Accessibility
      </h2>

      <div className="space-y-6">
        {/* Font Size */}
        <div className="space-y-3 mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Size
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="p-2 border text-white flex items-center justify-center border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              aria-label="Decrease font size"
              disabled={fontSize <= 12}
            >
              <Type className="w-4 h-4" />
            </button>
            
            <div className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {fontSize}px
              </span>
            </div>
            
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="p-2 text-white flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              aria-label="Increase font size"
              disabled={fontSize >= 24}
            >
              <Type className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dyslexic Font Toggle */}
        <div className="space-y-3 mb-4">
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <Type className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dyslexia-Friendly Font
              </span>
            </div>
            <button
              onClick={() => setIsDyslexicFont(!isDyslexicFont)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus:ring-offset-2 ${
                isDyslexicFont ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label="Toggle dyslexia-friendly font"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isDyslexicFont ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>

        {/* High Contrast Toggle */}
        <div className="space-y-3 mb-4">
          <label className="flex items-center justify-between">
            <div className="flex items-center">
              <Contrast className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                High Contrast Mode
              </span>
            </div>
            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus:ring-offset-2 ${
                isHighContrast ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label="Toggle high contrast mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isHighContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>

        {/* Quick Settings Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="flex items-start">
            <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-xs text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">Accessibility Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Use keyboard navigation with Tab and Enter</li>
                <li>• Enable screen reader for audio descriptions</li>
                <li>• Adjust font settings for comfortable reading</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}