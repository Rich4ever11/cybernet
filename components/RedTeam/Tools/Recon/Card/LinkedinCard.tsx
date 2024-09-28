import React from "react";

type Props = {
  fullName: string;
  headline: string;
  summary: string;
  profilePicture: string;
  location: string;
  profileURL: string;
  username: string;
};

export default function LinkedinCard({
  fullName,
  headline,
  summary,
  profilePicture,
  location,
  profileURL,
  username,
}: Props) {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10 py-4">
          <div className="avatar">
            <div className="ring-error ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img
                src={
                  "https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg"
                }
                alt="Profile Picture"
              />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <div>
            <h1 className="font-extrabold text-2xl">{fullName}</h1>
          </div>
          <div>
            <h1 className="font-extrabold text-2xl">{username}</h1>
          </div>
          <p>{headline}</p>
          <p>{summary}</p>
          <p>{location}</p>
          <p>{profileURL}</p>
        </div>
      </div>
    </div>
  );
}
