/**
 * @typedef {Object} GitHubProfile
 * @property {string} login
 * @property {string} avatar_url
 * @property {(string|null)} name
 * @property {(string|null)} bio
 * @property {number} public_repos
 * @property {number} followers
 * @property {number} following
 * @property {string} html_url
 * @property {(string|null)} location
 * @property {(string|null)} blog
 * @property {(string|null)} company
 * @property {string} created_at
 * @property {number} public_gists
 * @property {(string|null)} twitter_username
 */

/**
 * @typedef {Object} GitHubRepo
 * @property {string} name
 * @property {string} html_url
 * @property {(string|null)} description
 * @property {number} stargazers_count
 * @property {number} forks_count
 * @property {(string|null)} language
 * @property {string} updated_at
 */

/**
 * @typedef {Object} SearchState
 * @property {boolean} loading
 * @property {(string|null)} error
 * @property {(GitHubProfile|null)} data
 */

/**
 * @typedef {Object} FeaturedUser
 * @property {string} login
 * @property {string} avatar_url
 * @property {string} name
 */
