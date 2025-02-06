import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MapPin,
  Link2,
  Building2,
  Users,
  Book,
  Twitter,
  Calendar,
  Star,
  GitFork,
} from 'lucide-react';

/**
 * @typedef {Object} GitHubProfile
 * @property {string} login
 * @property {string} avatar_url
 * @property {string|null} name
 * @property {string|null} bio
 * @property {number} public_repos
 * @property {number} followers
 * @property {number} following
 * @property {string} html_url
 * @property {string|null} location
 * @property {string|null} blog
 * @property {string|null} company
 * @property {string} created_at
 * @property {number} public_gists
 * @property {string|null} twitter_username
 */

/**
 * @typedef {Object} GitHubRepo
 * @property {string} name
 * @property {string} html_url
 * @property {string|null} description
 * @property {number} stargazers_count
 * @property {number} forks_count
 * @property {string|null} language
 * @property {string} updated_at
 */

/**
 * Component for displaying detailed information about a GitHub user.
 *
 * @param {Object} props
 * @param {GitHubProfile} props.profile - GitHub user profile data.
 * @param {Function} props.onClose - Function to call when closing the modal.
 */
export function UserDetails({ profile, onClose }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${profile.login}/repos?sort=updated&per_page=6`
        );
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [profile.login]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Profile Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-32 h-32 rounded-full border-4 border-gray-100"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name || profile.login}
              </h1>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg"
              >
                @{profile.login}
              </a>
              {profile.bio && <p className="mt-3 text-gray-600">{profile.bio}</p>}

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>
                    {profile.followers} followers · {profile.following} following
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Book className="w-5 h-5" />
                  <span>{profile.public_repos} repositories</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {profile.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.blog && (
              <div className="flex items-center gap-2 text-gray-600">
                <Link2 className="w-5 h-5" />
                <a
                  href={
                    profile.blog.startsWith('http')
                      ? profile.blog
                      : `https://${profile.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.blog}
                </a>
              </div>
            )}
            {profile.company && (
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="w-5 h-5" />
                <span>{profile.company}</span>
              </div>
            )}
            {profile.twitter_username && (
              <div className="flex items-center gap-2 text-gray-600">
                <Twitter className="w-5 h-5" />
                <a
                  href={`https://twitter.com/${profile.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @{profile.twitter_username}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Recent Repositories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Repositories</h3>
            {loading ? (
              <p>Loading repositories...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-blue-600">{repo.name}</h4>
                    {repo.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {repo.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

UserDetails.propTypes = {
  profile: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string,
    public_repos: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    html_url: PropTypes.string.isRequired,
    location: PropTypes.string,
    blog: PropTypes.string,
    company: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    public_gists: PropTypes.number,
    twitter_username: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
