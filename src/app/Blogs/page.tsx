import React from 'react'
import Image from 'next/image'
import Blog from '../Blog/page'

const Page = () => {
    return (
        <div>
            <div className='relative bg-cover bg-center' style={{ backgroundImage: "url('/bg-jobpost.jpg')" }}>
                <div className='absolute inset-0 bg-slate-600 opacity-75'></div>
                <div className='relative flex justify-center items-center text-center flex-col lg:p-36 md:p-26 sm:p-20 p-16'>
                    <h1 className='text-white lg:text-5xl md:text-4xl sm:text-2xl w-full text-2xl font-bold'>Blogs</h1>
                    <p className='text-gray-300 mt-1 text-lg w-full'>Checkout our latest blogs!</p>
                </div>
            </div>
            <div className='lg:w-[1280px] md:w-[90%] sm:w-[90%] w-[90%] mx-auto'>
                <div>
                    <h1 className='text-3xl text-gray-800 font-extrabold mt-10 flex justify-start items-start'>Latest Blogs</h1>
                    <p className='text-gray-500 mt-1 w-full font-semibold'>See our latest blogs which will blow your mind!</p>
                </div>
                {/* latest Blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-md:max-w-lg mx-auto">
                    <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                        <Image height={1000} width={1000} src="https://readymadeui.com/Imagination.webp" alt="Blog Post 1" className="w-full h-60 object-cover" />
                        <div className="p-6">
                            <span className="text-sm block text-gray-400 mb-2">10 FEB 2023 | BY JOHN DOE</span>
                            <h3 className="text-xl font-bold text-[#333]">A Guide to Igniting Your Imagination</h3>
                            <hr className="my-6" />
                            <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        </div>
                    </div>
                    <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                        <Image height={1000} width={1000} src="https://readymadeui.com/hacks-watch.webp" alt="Blog Post 2" className="w-full h-60 object-cover" />
                        <div className="p-6">
                            <span className="text-sm block text-gray-400 mb-2">7 JUN 2023 | BY MARK ADAIR</span>
                            <h3 className="text-xl font-bold text-[#333]">Hacks to Supercharge Your Day</h3>
                            <hr className="my-6" />
                            <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        </div>
                    </div>
                    <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                        <Image height={1000} width={1000} src="https://readymadeui.com/prediction.webp" alt="Blog Post 3" className="w-full h-60 object-cover" />
                        <div className="p-6">
                            <span className="text-sm block text-gray-400 mb-2">5 OCT 2023 | BY SIMON KONECKI</span>
                            <h3 className="text-xl font-bold text-[#333]">Trends and Predictions</h3>
                            <hr className="my-6" />
                            <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page