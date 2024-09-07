import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Profile = () => {
    return (
        <div className='hidden lg:block'>
            <div className="flex items-center gap-2 ml-2 ">
                <Link href={"/Profile"}>
                    <Image height={600} width={600} className="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/4069292/pexels-photo-4069292.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </Link>
                <div className="font-medium">
                    <div>Talha Hussain</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                </div>
            </div>
        </div>

    )
}

export default Profile