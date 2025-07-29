import React from 'react';
import { Moon, Sun, Users, GraduationCap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { UserRole } from '../App';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function Header({ userRole, onRoleChange }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Lurnix
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual Learning Assistant
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Role Selector */}
            <div className="flex bg-gray-100 gap-4 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onRoleChange('teacher')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  userRole === 'teacher'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Switch to Teacher view"
              >
                <Users className="w-4 h-4" />
                <span>Teacher</span>
              </button>
              <button
                onClick={() => onRoleChange('student')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  userRole === 'student'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Switch to Student view"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}