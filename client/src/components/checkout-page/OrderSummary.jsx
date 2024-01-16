import React from 'react'
import CanvasModel from '../../canvas'
import { useSelectionContext } from '../../context/SelectionContext'

const OrderSummary = () => {
    const storedDetails = localStorage.getItem('braceletDetails');
    const braceletDetails = JSON.parse(storedDetails);
    const {setActiveStep, checkoutPrice}= useSelectionContext()
    setActiveStep(5)

    const capitalizeFirstLetter = (str) => {
        return str?.charAt(0).toUpperCase() + str?.slice(1);
      };

    const displayElement = (check, title, set) => {
        return(
            <>
                {check && 
                    <div className='flex gap-2'>
                        <p className='font-medium text-gray-600'>{title}: </p> 
                        {set}
                    </div>
                }
            </>
        )
    }

    const RenderOptions = () => {
        return(
            <div className='ml-8 text-sm text-gray-700 mt-2'>
                <p className='text-base font-medium text-gray-800 mb-1'>Customized Traitlet</p>
                {displayElement(braceletDetails.braceletDetails['base-beads'], 'Base bead', braceletDetails.braceletDetails['base-beads']['name'])}
                {displayElement(braceletDetails.braceletDetails['accessory-beads'], 'Accessory bead', braceletDetails.braceletDetails['accessory-beads'] ? braceletDetails.braceletDetails['accessory-beads']['name'] : 'None')}
                {displayElement(braceletDetails.braceletDetails['centerpiece']['front-side']['design'], 'Front Centrepiece', `${capitalizeFirstLetter(braceletDetails.braceletDetails['centerpiece']['front-side']['type'])} - ${braceletDetails.braceletDetails['centerpiece']['front-side']['design']}`)}
                {displayElement(braceletDetails.braceletDetails['centerpiece']['back-side']['design'], 'Back Centrepiece', `${capitalizeFirstLetter(braceletDetails.braceletDetails['centerpiece']['back-side']['type'])} - ${braceletDetails.braceletDetails['centerpiece']['back-side']['design']}`)}
                {displayElement(braceletDetails.braceletDetails['size'], 'Size', braceletDetails.braceletDetails['size'])}

            </div>
        )
    }
  return (
    <div className='flex flex-col h-full bg-white rounded text-black px-[5%] py-[7%]'>
        <div className='font-semibold text-2xl text-gray-500 mb-6'>
            Order Summary
        </div>
        <div className='flex-col flex lg:flex-row'>
            <div className='h-48 w-60 border-2 rounded-lg bg-gray-50'>
                <CanvasModel/>
            </div>
            <RenderOptions/>
        </div>
        <div className='mt-12 text-lg'>
            <hr className='mb-4 border'/>
            <div className='px-4 flex text-base text-gray-500 justify-between'>
                <p>Standard Traitlet</p>
                <p>+ $22.00</p>
            </div>
            <div className='px-4 flex text-base text-gray-500 justify-between'>
                <p>Shipping</p>
                <p>+ $2.00</p>
            </div>
            <hr className='mt-4'/>
            <div className='py-4 px-4 flex justify-between'>
                <p>Total</p>
                <p>${((checkoutPrice || 0) + 2).toFixed(2)}</p>
            </div>
            <hr className='border'/>
        </div>
    </div>
  )
}

export default OrderSummary