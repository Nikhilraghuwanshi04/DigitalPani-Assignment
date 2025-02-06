import React from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} FeaturedUser
 * @property {string} login
 * @property {string} avatar_url
 * @property {string} name
 */

/**
 * @param {Object} props
 * @param {FeaturedUser[]} props.users - Array of featured users.
 * @param {function(string):void} props.onUserClick - Function to call when a user is clicked.
 */
export function FeaturedUsers({ users, onUserClick }) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Developers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {users.map((user) => (
          <div
            key={user.login}
            onClick={() => onUserClick(user.login)}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-medium text-gray-900">{user.name}</span>
            <span className="text-sm text-gray-500">@{user.login}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

FeaturedUsers.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUserClick: PropTypes.func.isRequired,
};
