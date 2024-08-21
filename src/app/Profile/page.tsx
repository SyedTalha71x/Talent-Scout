import Image from 'next/image';

export default function Profile() {
    return (
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center pb-10">
            <div className="grid mt-10 grid-cols-1 md:grid-cols-3 gap-6 w-[90%] mx-auto ">

                {/* Profile Card */}
                <div className="bg-white p-6 rounded-lg flex justify-center items-center flex-col shadow-md text-center">
                    <Image
                        src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="John Smith"
                        className="rounded-full h-20 object-top object-cover w-20 mx-auto"
                        width={100}
                        height={100}
                    />
                    <h2 className="mt-4 text-xl font-bold">John Smith</h2>
                    <p className="text-gray-600">Full Stack Developer</p>
                    <p className="text-gray-600">Bay Area, San Francisco, CA</p>
                    <div className="mt-4">
                        <button className="bg-blue-500 text-white text-sm px-8 py-2 rounded-lg mr-2">Follow</button>
                        <button className="bg-black text-white border text-sm  px-8  py-2 rounded-lg">Github</button>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">Full Name</h3>
                    <p className="text-gray-700 mb-2">Johnatan Smith</p>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-gray-700 mb-2">example@example.com</p>
                    <h3 className="text-lg font-semibold mb-2">Phone</h3>
                    <p className="text-gray-700 mb-2">(097) 234-5678</p>
                    <h3 className="text-lg font-semibold mb-2">Mobile</h3>
                    <p className="text-gray-700 mb-2">(098) 765-4321</p>
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <p className="text-gray-700">Bay Area, San Francisco, CA</p>
                </div>

                {/* Social Links */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-2">
                            <Image height={1000} width={1000} src="/images/globe.png" alt="Website" className="w-5 h-5" />
                            <div className="text-gray-700">www.johnsmith.com</div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Image height={1000} width={1000} src="/images/facebook.webp" alt="GitHub" className="w-5 rounded-full h-5" />
                            <div className="text-gray-700">John Smith</div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Image height={1000} width={1000} src="/images/twitter.png" alt="Twitter" className="w-5 h-5" />
                            <div className="text-gray-700">john_smith67x</div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Image height={1000} width={1000} src="/images/github.png" alt="Instagram" className="w-5 h-5" />
                            <div className="text-gray-700">johnsmith71x</div>
                        </li>
                    </ul>
                </div>

                {/* Experience Section */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Experience</h3>
                    <ul className="space-y-2">
                        <li className="flex flex-col">
                            <span className="font-semibold text-gray-700">Senior Developer</span>
                            <span className="text-gray-600 text-sm">ABC Corp | 2018 - Present</span>
                            <span className="text-gray-500 text-sm">Working on full-stack development and leading a team of developers.</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="font-semibold text-gray-700">Software Engineer</span>
                            <span className="text-gray-600 text-sm">XYZ Ltd | 2015 - 2018</span>
                            <span className="text-gray-500 text-sm">Developed multiple web applications with a focus on backend services.</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="font-semibold text-gray-700">Junior Developer</span>
                            <span className="text-gray-600 text-sm">123 Tech | 2013 - 2015</span>
                            <span className="text-gray-500 text-sm">Started as a junior developer, focusing on frontend technologies.</span>
                        </li>
                    </ul>
                </div>

                {/* Certifications Section */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                    <ul className="space-y-2">
                        <li className="flex flex-col">
                            <span className="font-semibold text-gray-700">AWS Certified Solutions Architect</span>
                            <span className="text-gray-600 text-sm">Issued: 2021</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="font-semibold text-gray-700">Certified Kubernetes Administrator (CKA)</span>
                            <span className="text-gray-600 text-sm">Issued: 2020</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="font-semibold text-gray-700">Google Professional Cloud Architect</span>
                            <span className="text-gray-600 text-sm">Issued: 2019</span>
                        </li>
                    </ul>
                </div>

                {/* Project Status */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-3">
                    <h3 className="text-lg font-semibold mb-4">Academic Skills</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between items-center">
                            <span className="text-gray-700">RestFul API&apos;s</span>
                            <div className="w-1/2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-700">Web Scrapping</span>
                            <div className="w-1/2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-700">Backend Development</span>
                            <div className="w-1/2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-700">DevOps Training Master</span>
                            <div className="w-1/2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-700">Cloud Hosting</span>
                            <div className="w-1/2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
