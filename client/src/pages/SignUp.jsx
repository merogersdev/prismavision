export default function SignUp() {
  return (
    <main className='container flex flex-col'>
      <form className='card flex flex-col items-center'>
        <h1 className='h1'>Sign Up</h1>
        <label className='flex flex-col relative w-full mt-6'>
          <span className='labelspan'>Name</span>
          <input className='input' />
        </label>
        <label className='flex flex-col relative w-full mt-6'>
          <span className='labelspan'>Email</span>
          <input className='input' />
        </label>
        <label className='flex flex-col relative w-full mt-6'>
          <span className='labelspan'>Password</span>
          <input className='input' />
        </label>
        <label className='flex flex-col relative w-full mt-6'>
          <span className='labelspan'>Confirm Password</span>
          <input className='input' />
        </label>
        <button className='btn bg-cta-200 hover:bg-cta-100 w-full mt-6'>
          Sign Up
        </button>
      </form>
    </main>
  );
}
