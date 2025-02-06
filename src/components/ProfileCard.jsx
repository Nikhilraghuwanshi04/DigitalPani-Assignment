import React from 'react';
import { MapPin, Link2, Building2, Users, Book } from 'lucide-react';

export function ProfileCard({ profile }) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={profile.avatar_url}
            alt={`${profile.login}'s avatar`}
            className="w-32 h-32 rounded-full border-4 border-gray-100"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              {profile.name || profile.login}
            </h2>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @{profile.login}
            </a>
            {profile.bio && (
              <p className="mt-2 text-gray-600">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>{profile.followers} followers · {profile.following} following</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Book className="w-5 h-5" />
            <span>{profile.public_repos} repositories</span>
          </div>
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
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate"
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
        </div>
      </div>
    </div>
  );
}
