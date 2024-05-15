import React from 'react'
import HomeGetStartedButton from './HomeGetStartedButton'
export default function HomeWelcome() {
  return (
    <div className="lg:justify-left w-full bg-white" style={{ marginTop: '33%' }}>
        <div className=" border-solid border-transparent border-[2rem]">
            <div className="text-center">
                <p className="lg:text-3xl leading-8 text-gray-600">
                    Welcome To The
                </p>
                <h1 className="mt-2 lg:text-8xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Traitlet 
                </h1>
                <h1 className="mt-2 lg:text-8xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Builder 
                </h1>
                <p className="mt-2 lg:text-3xl leading-8 text-gray-600">
                    Create unique & customized pieces
                </p>
                <HomeGetStartedButton/>
            </div>
        </div>
    </div>

  )
}