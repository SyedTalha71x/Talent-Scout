"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Profile = () => {
  const [data, setData] = useState<any>(null); // Initialize as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');

        // Only fetch data if token exists
        if (token) {
          const response = await fetch('/api/Profile/showProfile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Render nothing if there's no token or no data
  if (!localStorage.getItem('Token') || !data) {
    return null;
  }

  return (
    <div className='hidden lg:block'>
      {data && (
        <div className="flex items-center gap-2 ml-2">
          <Link href={"/Profile"}>
            <Image
              height={600}
              width={600}
              className="w-10 h-10 rounded-full"
              src={data.profileUrl || 'https://images.pexels.com/photos/4069292/pexels-photo-4069292.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt={data.name || 'Profile Picture'}
            />
          </Link>
          <div className="font-medium">
            <div>{data.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in {new Date(data.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
