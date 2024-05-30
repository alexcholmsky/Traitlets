// MyContext.js
import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import traitletOptions from '../traitletOptions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define your initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Create the context
const SelectionContext = createContext(initialState);

// Define a provider component
const SelectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [options, setOptions] = useState([])
  const [selectionTitle, setSelectionTitle] = useState('Base Beads')
  const [centerpieceSide, setCenterpieceSide] = useState('front-side')
  const [type, setType] = useState('icon');
  const [engravingText, setEngravingText] = useState('');
  const [backEngravingText, setBackEngravingText] = useState('')
  const [checkoutPrice, setCheckoutPrice] = useState(null);

  const steps = ['base-beads', 'accessory-beads', 'centerpiece', 'size'];
  const [braceletDetails, setBraceletDetails] = useState({
    braceletDetails: {
      'base-beads': null,
      'accessory-beads': null,
      'centerpiece': {
        'front-side': {
          'type': null,
          'design': null,
        },
        'back-side': {
          'type': null,
          'design': null,
        },
      },
      'size': null,
    },
  });

  useEffect(() => {
    renderOptions()
  }, [activeStep])
  
  const addToOrder = (name, side, design) => {
    setBraceletDetails((prevDetails) => {
      const tempBraceletInfo = { ...prevDetails }; // Create a shallow copy
  
      if (activeStep !== 2) {
        const property = steps[activeStep];
        if((activeStep == 3 && name.name)){
          tempBraceletInfo.braceletDetails[property] = name?.name;
        }
        else{
          tempBraceletInfo.braceletDetails[property] = name;
        }
      } 
      else if (side && design && activeStep === 2) {
        // Make sure the centerpiece object exists before updating
        tempBraceletInfo.braceletDetails.centerpiece = tempBraceletInfo.braceletDetails.centerpiece || {};
        tempBraceletInfo.braceletDetails.centerpiece[side] = design;
      } 
      else {
        console.error("Error with addToOrder");
      }
  
      return { ...tempBraceletInfo }; // Return a new object reference
    });
  };
  


  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const renderOptions = () => {
    switch(steps[activeStep]) {
      case 'base-beads':
        setOptions(traitletOptions['base-beads'])
        setSelectionTitle('Base Beads')
      break;
      case 'accessory-beads':
        setOptions(traitletOptions['accessory-beads'])
        setSelectionTitle('Accessory Beads')
      break;
      case 'centerpiece':
        setOptions(traitletOptions['centerpiece']['zodiac-signs'])
        setSelectionTitle('Centrepiece')
      break;
      case 'size':
        setOptions(traitletOptions['size'])
        setSelectionTitle('Size')
      break;
    }
  }

  const handleNext = () => {
    if(stepCompleted()){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if(activeStep == 2 ){
        if(braceletDetails.braceletDetails['centerpiece']['front-side']['type'] == 'text'){
          let frontDetails = {}
          frontDetails.type = 'text'
          frontDetails.design = engravingText
          frontDetails.image = null
          addToOrder('centrepiece', 'front-side', frontDetails)
        }
        if(braceletDetails.braceletDetails['centerpiece']['back-side']['type'] == 'text'){
          let backDetails = {}
          backDetails.type = 'text'
          backDetails.design = backEngravingText
          backDetails.image = ''
          addToOrder('centrepiece', 'back-side', backDetails)
        }
      }
    }
    else{
      toast.warn("Please make a selection to proceed", {
        position: "top-right",
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const stepCompleted = () => {
    if((steps[activeStep] == 'base-beads' && !braceletDetails.braceletDetails['base-beads']) 
      || (steps[activeStep] == 'size' && !braceletDetails.braceletDetails['size'])){
      return false
    }
    return true
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

    const handleEngravingChange = (event) => {
      if(event.target.value.length < 8){
        setEngravingText(event.target.value);
        addCenterpieceToOrder(event.target.value)
      }
      else{
        toast.warn("Max 7 characters", {
          position: "top-right",
          autoClose: 2000, // Close the toast after 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    const handleBackEngravingChange = (event) => {
      if(event.target.value.length < 8){
        setBackEngravingText(event.target.value);
        addCenterpieceToOrder(event.target.value)
      }
      else{
        toast.warn("Max 7 characters", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    const addCenterpieceToOrder = (val) => {

      let details = {
          'type': null,
          'design': null,
          'image': null
      }

      console.log(val, type)

      if(val == 'none'){
          details.type = 'none'
          details.design = 'none'
          details.image = 'none'
      }
      else if(val?.image){
          details.type = 'icon'
          details.design = val.name
          details.image = val.image
      }
      else if(val == 'text'){
          details.type = 'text'
          details.design = (centerpieceSide == 'front-side' ? engravingText : backEngravingText)
          details.image = null
      }
      else{
          console.error('error with centerpiece selection')
      }

      addToOrder(val, centerpieceSide, details)
  }


  return (
    <SelectionContext.Provider value={{ state, dispatch, activeStep, setActiveStep, skipped, setSkipped, isStepOptional, isStepSkipped,  
       handleBack, handleNext, steps, options, setOptions, selectionTitle, addToOrder, braceletDetails, centerpieceSide, setCenterpieceSide, stepCompleted,
       handleEngravingChange, engravingText, setEngravingText, addCenterpieceToOrder, type, setType, backEngravingText, setBackEngravingText, handleBackEngravingChange,
       checkoutPrice, setCheckoutPrice }}>
      {children}
    </SelectionContext.Provider>
  );
};

// Create a custom hook for using the context
const useSelectionContext = () => {
  return useContext(SelectionContext);
};

// Define a reducer function to update the state (optional)
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export { SelectionContextProvider, useSelectionContext, SelectionContext };
