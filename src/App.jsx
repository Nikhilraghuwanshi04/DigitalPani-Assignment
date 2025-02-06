import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserDetails } from './components/UserDetails';
import { FeaturedUsers } from './components/FeaturedUsers';
import { Github } from 'lucide-react';

// Featured users data
const featuredUsers = [
  { login: 'gaearon', name: 'Dan Abramov', avatar_url: 'https://avatars.githubusercontent.com/u/810438' },
  { login: 'sindresorhus', name: 'Sindre Sorhus', avatar_url: 'https://avatars.githubusercontent.com/u/170270' },
  { login: 'tj', name: 'TJ Holowaychuk', avatar_url: 'https://avatars.githubusercontent.com/u/25254' },
  { login: 'addyosmani', name: 'Addy Osmani', avatar_url: 'https://avatars.githubusercontent.com/u/110953' },
  { login: 'kentcdodds', name: 'Kent C. Dodds', avatar_url: 'https://avatars.githubusercontent.com/u/1500684' },
];

function App() {
  const [searchState, setSearchState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  const searchProfile = async (username) => {
    setSearchState({ loading: true, error: null, data: null });
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': 'Bearer YOUR_TOKEN',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (!response.ok) {
        throw new Error(response.status === 404 
          ? 'Profile not found. Please try another username.'
          : 'An error occurred while fetching the profile.');
      }

      const data = await response.json();
      setSearchState({ loading: false, error: null, data });
    } catch (error) {
      setSearchState({
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        data: null,
      });
    }
  };

  const handleCloseDetails = () => {
    setSearchState(prev => ({ ...prev, data: null }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8 text-gray-900" />
              <h1 className="text-xl font-bold text-gray-900">
                GitHub Profile Search
              </h1>
            </div>
            <SearchBar 
              onSearch={searchProfile}
              isLoading={searchState.loading}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {searchState.error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="text-red-500 bg-red-50 px-4 py-2 rounded-md">
              {searchState.error}
            </div>
          </div>
        )}

        {/* Featured Users */}
        {!searchState.data && (
          <FeaturedUsers users={featuredUsers} onUserClick={searchProfile} />
        )}

        {/* User Details Modal */}
        {searchState.data && (
          <UserDetails 
            profile={searchState.data}
            onClose={handleCloseDetails}
          />
        )}
      </main>
    </div>
  );
}

export default App;
