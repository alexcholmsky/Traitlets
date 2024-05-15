import React from 'react'
function HomeGetStartedButton() {
  return (
    <div className="mt-7 flex items-center justify-center gap-x-6">
        <a
            href="/builder"
            className="rounded-md bg-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Get started
        </a>
    </div>
    )
}

export default HomeGetStartedButton