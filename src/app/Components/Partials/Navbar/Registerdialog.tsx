import Link from 'next/link';

const Page: React.FC = () => {
    return (
        <div className="">
            <div className='hidden lg:block'>
                <button type="button" className='text-sm ml-2 bg-purple-600 text-white py-2 px-8 rounded-md nav-btns  font-medium'>
                    <Link href={"/JobPost"}>
                        Post a Job
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default Page;
