import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Section */}
        <section className="relative flex items-end bg-gray-900 lg:col-span-5 xl:col-span-6">
          <img
            alt="AI Background"
            src="https://source.unsplash.com/870x1240/?technology,ai"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="relative p-8 sm:p-12 lg:p-16">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-10 w-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 ..."
                  fill="currentColor"
                />
              </svg>
            </a>
            <h2 className="mt-8 text-4xl font-extrabold text-white sm:text-5xl">
            🚀
              Your AI-Interview Awaits 
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Get ready for the most seamless AI-driven interview experience. Your journey starts here.
            </p>
          </div>
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-16 sm:px-16 lg:col-span-7 xl:col-span-6 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Welcome 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in to continue exploring the future of AI-powered interviews.
            </p>
            <div className="mt-8">
              <SignIn />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up now
              </a>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
}
