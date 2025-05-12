import React from 'react';
import { Link } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
interface DashboardProps {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
}

const Dashboard: React.FC<DashboardProps> = ({ auth }) => {
  return (
    <AuthLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Admin Dashboard
        </h2>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News Management Card */}
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">News Management</h3>
                <div className="space-y-4">
                  <Link
                    href={route('admin.news.create')}
                    className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Create New Article
                  </Link>
                  <Link
                    href={route('admin.news.index')}
                    className="block w-full text-left px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    View All Articles
                  </Link>
                </div>
              </div>
            </div>

            {/* User Management Card */}
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">User Management</h3>
                <div className="space-y-4">
                  <Link
                    href={route('users.index')}
                    className="block w-full text-left px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    View All Users
                  </Link>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Settings</h3>
                <div className="space-y-4">
                  <Link
                    href={route('settings.profile')}
                    className="block w-full text-left px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Profile Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Dashboard; 