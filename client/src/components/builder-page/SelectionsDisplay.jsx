import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StepNavigation from './StepNavigation'
import { SelectionContext, useSelectionContext, SelectionContextProvider } from '../../context/SelectionContext';
import OptionButton from './OptionButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {useTheme, useMediaQuery} from '@mui/material';
import traitletOptions from '../../traitletOptions';


function SelectionsDisplay() {
    const { activeStep, braceletDetails, options, setOptions, addToOrder, centerpieceSide, 
            setCenterpieceSide, handleEngravingChange, engravingText, addCenterpieceToOrder, type, setType, setEngravingText, backEngravingText, setBackEngravingText, handleBackEngravingChange } = useSelectionContext()
    const [value, setValue] = useState(0);
    const [isOverflow, setIsOverflow] = useState(false);
    const [category, setCategory] = useState('zodiac-signs');


    const handleChange = (event, newValue) => {
        setValue(newValue);
        let side = 'front-side'
        
        switch(newValue){
            case 0:
                side = 'front-side'
                setCenterpieceSide(side)
            break;
            case 1:
                side = 'back-side'
                setCenterpieceSide(side)
            break;
        }
    };

    useEffect(()=> {
        setIsOverflow(false)
    }, [activeStep])

    const beadContainerRef = useRef(null);
    const iconContainerRef = useRef(null);

    useEffect(() => {
        const iconContainer = iconContainerRef.current;
        const beadContainer = beadContainerRef.current;

        if(iconContainer){
            console.log("icon container")
            overflowText({ container: iconContainer });
        }
        else if(beadContainer){
            console.log("bead container")
            overflowText({ container: beadContainer });
        }
        else{
            console.log("no container")
        }
    }, [iconContainerRef.current, options, type, activeStep]); // Include any dependencies that might affect the container's content

    const overflowText = ({ container }) => {
        const handleOverflow = () => {
            if (container.scrollWidth > container.clientWidth && (type == "icon" || activeStep != 2)) {
                // Container overflowed, display alert or take any other action
                setIsOverflow(true);
            }
            else {
                setIsOverflow(false);
            }
        };

        // Call handleOverflow on mount and whenever the content changes
        handleOverflow();   
        }
    
    function formatString(str) {
        // Split the string by dashes
        let words = str.split('-');
        
        // Capitalize the first letter of each word
        let formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        
        // Join the words back together
        let formattedString = formattedWords.join(' ');
        
        return formattedString;
        }
    
    const handleChangeDesign = (event) => {
        setType(event.target.value);
        addCenterpieceToOrder(event.target.value)
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
        let value = event.target.value
        setOptions(traitletOptions['centerpiece'][value])
        console.log(braceletDetails)

    }
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
   
  return (
    <div className='bg-white absolute bottom-0 w-full min-h-[50%] lg:h-[42%]'>
        <div className='w-full flex justify-center'>
            <StepNavigation/>
        </div>
        <div className="flex justify-center mb-10 w-full">
            
            <div ref={beadContainerRef} className={`overflow-container ${activeStep == 2 && 'w-full'} ${activeStep != 2 && 'overflow-auto '} flex gap-8`}>
                {activeStep != 2 ? 
                    options.map((optionObj) => {
                        return(
                            <div className='flex-shrink-0 border-transparent border-opacity-50 border-8' onClick={(event) => {event.stopPropagation(); addToOrder(optionObj)}}>
                                <OptionButton opt={optionObj} step={activeStep}/>
                            </div>
                        )
                    })
                : 
                    <div className='w-full flex flex-col'>
                        <div className='w-full '>
                            <Tabs value={value} onChange={handleChange} centered >
                                <Tab label="front-side" sx={{ width: isSmallScreen ? '150px' : '420px'}}/>
                                <Tab label="back-side" sx={{ width: isSmallScreen ? '150px' : '420px'}}/>
                            </Tabs>
                        </div>
                        {/* {isOverflow && (
                        <Typography
                        sx={{ mt: 2, mb: 1, fontSize: '12pt' }}
                        className='text-gray-500 overflow-hidden text-center text-lg transition-all duration-300 ease-in-out'
                        >
                        {"Scroll for more"}
                        </Typography>
                        )} */}
                        <div className='flex justify-center pt-8 gap-16'>
                            <button 
                                className={`w-fit py-1.5 rounded-full border-2 bg-white text-gray-600  hover:border-blue-700 ${type =='icon' ? 'border-blue-400' : 'border-gray-200'}`}
                                value='icon'
                                onClick={handleChangeDesign}>
                                Icon
                            </button>
                            <button 
                                className={`w-fit py-1.5 rounded-full border-2 bg-white text-gray-600  hover:border-blue-700 ${type =='text' ? 'border-blue-400' : 'border-gray-200'}`}
                                value = 'text'
                                onClick={handleChangeDesign}>
                                Text
                            </button>
                            <button 
                                className={`w-fit py-1.5 rounded-full border-2 bg-white text-gray-600  hover:border-blue-700 ${type =='none' ? 'border-blue-400' : 'border-gray-200'}`}
                                value = 'none'
                                onClick={handleChangeDesign}>
                                None
                            </button>
                        </div>
                        <div className='flex justify-center md:flex-row flex-col '>
                            {/* change this to be the different categories */}
                            {type == 'icon' &&
                                <Box className="flex justify-center md:w-1/6 mt-10 mr-0 lg:mr-4 px-2">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        label="Categories"
                                        onChange = {handleCategoryChange}
                                        >
                                            {Object.keys(traitletOptions['centerpiece']).map((category) => {
                                                return <MenuItem value={category}>{formatString(category)}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            } 
                            {type == 'text' && <div className='ml-8 mt-4'>
                                <Box
                                    component="form"
                                    sx={{
                                       
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {value == 0 ?
                                        <TextField id="standard-basic" label="Engraving Text " variant="standard" value={engravingText} onChange={(event) => {handleEngravingChange(event, value)}}/>
                                        :
                                        <TextField id="standard-basic" label="Engraving Text " variant="standard" value={backEngravingText} onChange={(event) => {handleBackEngravingChange(event, value)}}/>
                                    }
                                </Box>
                        </div>}
                        
                        {/* fix this */}    
                        {type == 'icon' && 
                            <div ref={iconContainerRef} className={`flex gap-8 mt-12 overflow-auto ${ !isSmallScreen && 'max-w-[60%]'}`}>
                                {options.map((optionObj) => {
                                    return(
                                        <div onClick={(event) => {event.stopPropagation(); addCenterpieceToOrder(optionObj);}}>
                                            <OptionButton opt={optionObj} side={value}/>
                                        </div>
                                    )
                                })}

                            </div>}
                    </div>
                    </div>
                    
                }
            </div>
        </div>
        
    </div>
  )
}

export default SelectionsDisplay