import images from '../assets/images.svg';

function Home() {
  return (
    <main className='flex flex-col'>
      <div className='container flex py-24 p-5'>
        <div className='flex flex-col mr-0 w-full  justify-center items-center md:w-2/4 md:mr-8 md:items-start '>
          <h1 className='h1'>Welcome to PrismaVision!</h1>
          <p className='mb-6 leading-7'>
            Want to leverage the advantages of Machine Learning? Enter
            PrismaVision. This application utilizes the Google Cloud Vision API
            to determine what an image is.
          </p>
          <button className='btn bg-cta-200 hover:bg-cta-100 w-fit'>
            Get Started
          </button>
        </div>
        <div className='hidden md:flex w-full md:w-2/4 justify-end'>
          <img src={images} alt='' className='max-h-72' />
        </div>
      </div>
      <div className='bg-gray-200/50'>
        <div className='flex flex-col px-5 py-10 md:flex-row max-w-6xl mx-auto'>
          <div className='mr-0 mb-16 md:mb-0 md:mr-16 w-full flex items-center md:items-start flex-col'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='text-secondary-200 w-8 h-8 mb-3 md:w-12 md:h-12'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
              />
            </svg>

            <p>
              Want to leverage the advantages of Machine Learning? Enter
              PrismaVision.
            </p>
          </div>
          <div className='mr-0 mb-16 md:mb-0 md:mr-16 w-full flex items-center md:items-start flex-col'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='text-secondary-200 w-8 h-8 mb-3 md:w-12 md:h-12'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
              />
            </svg>

            <p>Stores image recognition results in dedicated MySQL database</p>
          </div>
          <div className='mb-8 md:mb-0 w-full flex items-center md:items-start flex-col h-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='text-secondary-200 w-8 h-8 mb-3 md:w-12 md:h-12'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z'
              />
            </svg>

            <p>
              Cloud-native full-stack application leveraging the Google Cloud
              Vision API
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
