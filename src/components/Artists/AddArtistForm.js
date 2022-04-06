import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import '../../styles/AddArtistForm.css';
import AlertTitle from '@mui/material/AlertTitle';
import LoadingPage from '../utils/LoadingPage';
import { Country, State, City }  from 'country-state-city';

const initialState = {
  name: "",
  uniPic:"",
  country: "",
  state: "",
  level:"",
  remarks:"",
  private:{},
  public:{},
};



const AddArtistForm = () => {
  const [universityData, setuniversityData] = useState(initialState);
  const [countryState, setcountryState] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
    useEffect(() => {
      setcountryState(State.getStatesOfCountry(`${universityData.country}`));
    }, [universityData.country])



  const handleChange = (e) => {
    const { name } = e.target;
    setuniversityData({ ...universityData, [name]: e.target.value });
  };

  const handleinput2 = (e)=>{        
    setuniversityData({...universityData, uniPic: e.target.files[0]});
   }
  
  const handlesubmit = async(e)=>{
    e.preventDefault();  
    const formData = new FormData();
    formData.append('name', universityData.name);
    formData.append('uniPic', universityData.uniPic);
    formData.append('level', universityData.level);
    formData.append('country', universityData.country);
    formData.append('state', universityData.state);
    formData.append('remarks', universityData.remarks);    
    formData.append('private[key]', universityData.private["key"]);    
    formData.append('public[key2]', universityData.public["key2"]);    
        
    try{
           await axios.post("https://flywise-admin.herokuapp.com/api/createUniversity",formData);
          history.push('/Universities')
          
        }catch(err){
          console.log(err);
        }

   }

  return (
    <div className='addArtist-container'>
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          {page === 1 && (
            <div className='addArtist-personalDetails'>
              {/* first row */}
        <form onSubmit={handlesubmit} method="POST" enctype="multipart/form-data">
        
              <div className='addArtist-alignRow'>
                <div className='addArtist-inputFieldDiv'>

                  <label className='addArtist-inputLabel'>University Name*</label>
                  <input
                    type='text'
                    name='name'
                    onChange={handleChange}
                    placeholder='University Name'
                    className='addArtist-inputField'
                  />
                </div>
                
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>University Image*</label>
                  <input
                    type='file'
                    name='uniPic'
                    onChange={handleinput2}
                    placeholder='Upload A Image'
                    className='addArtist-inputField'
                  />
                </div>
              </div>


              {/* 2nd row */}
              <div className='addArtist-alignRow'>
              <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                  Country*
                  </label>
            
                  <select
                    className='addArtist-selectField'
                    name='country'
                    defaultValue="Select A Country"
                    onChange={handleChange}>
                    <option value="">None</option>
                    <option value="US">USA</option>
                    <option value="GB">UK</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              
              <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                  States*
                  </label>
            
                  <select
                    className='addArtist-selectField'
                    name='state'
                    placeholder='Select A State'
                    onChange={handleChange}>
                    {
                      countryState.length>0?(countryState.map((states,index)=>{
                        return <option value={states.name} key={index}>{states.name}</option>
                      }) ):(<option  style={{color:"red"}} value="">Please Select A country</option>)
                    }
                  </select>
                </div>
              </div>


                      {/* 3rd row */}
            <div className='addArtist-alignRow'>

            
            <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Remarks
                  </label>       
                  <input
                    type='text'
                    name='remarks'
                    onChange={handleChange}
                    placeholder='1-4 Sentences'
                    className='addArtist-inputField'
                  />     
                </div>
                
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    University Level
                  </label>     
                  <select
                    className='addArtist-selectField'
                    name='level'
                    onChange={handleChange}>
                    <option value="">Select One</option>
                    <option value="1">Tier 1</option>
                    <option value="2">Tier 2</option>
                    <option value="3">Tier 3</option>
                  </select>
                </div>
              </div>
                  

              <div className='addArtist-submitDetailDiv'>
                <button
                  className='addArtist-submitDetailBtn'
                  onClick={handlesubmit}
                >
                Add University    
                </button>
              </div>
        </form>
            </div>
          )}
          
        </Fragment>
      )}
    </div>
  );
};

export default AddArtistForm;
