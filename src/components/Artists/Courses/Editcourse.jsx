import React,{useState,useEffect} from 'react'
import Radio from '@mui/material/Radio';
import '../../../styles/AddArtistForm.css';
import LoadingPage from '../../utils/LoadingPage';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios';



const initialState = {

    university: "",
    name: null,
    discipline: [
      { name: null }
    ],
    applicationFees: null,
    programFees: null,
    programLength: null,
    transcriptRequired: false,
    financialDocuRequired: false,
    thirdPartyRequired: false,
    minGpaRequired: null,
    gre: {
      greRequired: null,
      greWaiver: null,
      minVerbal: null,
      minQuant: null,
      minAWA: null,
      minTotal: null,
    },
    toefl: {
      toeflAccepted: false,
      Total: null,
      minReading: null,
      minWriting: null,
      minSpeaking: null,
      minListening: null,
    },
    ielts: {
      ieltsAccepted: false,
      Total: null,
      minReading: null,
      minWriting: null,
      minSpeaking: null,
      minListening: null,
    },
    duolingo: {
      duoLingoAccepted: false,
      Total: null,
      minLiteracy: null,
      minComprehension: null,
      minConversation: null,
      minProduction: null,
    },
    pte: {
      pteAccepted: false,
      minScore: null
    },
    fallDeadline: {
      priority: null,
      final: null,
    },
    springDeadline: {
      priority: null,
      final: null,
    },
    summerDeadline: {
      priority: null,
      final: null,
    },
    nonITAccepted: false,
    preWaiverForNonIT: false,
    last60UnitsConsidered: false,
    programDetails: null,
  
    departmentDetails: {
      address: null,
      number: null,
      email: null
    },
  
    activityStatus: false,
    admissionOffice: {
      address: null,
      number: null,
      email: null
    },
    private: {},
    public: {}
  };
function Editcourse() {
    const [getcoursedata, setgetcoursedata] = useState([])
    const [courseData, setcourseData] = useState(initialState);
    const [showgrebox, setshowgrebox] = useState(0);
    const [loading, setLoading] = useState(false);
  
    //special waiver box
  
    const onbox = (e) => {
      if (showgrebox == 1) {
        setshowgrebox(0);
      } else {
        setshowgrebox(1);
      }
    }
    const nobox = () => {
      setshowgrebox(0);
    }
  
  console.log(getcoursedata.transcriptRequired);
    //useeffects
    const params = useParams();
    const history =useHistory();
  
    useEffect(() => {
        setcourseData({...courseData,university:params.id})
        getdata();
    }, [])


  
      //functions
  
    const getdata=async()=>{
    setLoading(true);
        try {
            const call1 = await axios.get(`https://flywise-admin.herokuapp.com/api/courseById/${params.id}`);
            setgetcoursedata(call1.data.course);
            setcourseData(call1.data.course);
            setLoading(false);

        } catch (error) {
            setLoading(false);   
            console.log(error)
        }
    }


    const handleChange = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, [name]: e.target.value });
    };
  
    const handlegre = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, gre: { ...courseData.gre, [name]: e.target.value } })
    }
  
    const handletoefl = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, toefl: { ...courseData.toefl, [name]: e.target.value } })
    }
  
    const handleielts = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, ielts: { ...courseData.ielts, [name]: e.target.value } })
    }
  
    const handleduolingo = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, duolingo: { ...courseData.duolingo, [name]: e.target.value } })
    }
  
    const handlepte = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, pte: { ...courseData.pte, [name]: e.target.value } })
    }
    const handlefalldeadline = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, fallDeadline: { ...courseData.fallDeadline, [name]: e.target.value } })
    }
    const handlesummerdeadline = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, summerDeadline: { ...courseData.summerDeadline, [name]: e.target.value } })
    }
    const handlespringdeadline = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, springDeadline: { ...courseData.springDeadline, [name]: e.target.value } })
    }
    const handledepartment = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, departmentDetails: { ...courseData.departmentDetails, [name]: e.target.value } })
    }
    const handleadmissionoffice = (e) => {
      const { name } = e.target;
      setcourseData({ ...courseData, admissionOffice: { ...courseData.admissionOffice, [name]: e.target.value } })
    }
  
  
  
  const handlesubmit=async()=>{
      try {
          await axios.post("https://flywise-admin.herokuapp.com/api/createCourse",courseData);
          history.push('/Universities')
  
      } catch (error) {
          console.log(error);
      }
  }
  



//   for display the data in inputs

  return (
    <>  
    <div className='addArtist-container'>
    {loading ? (
      <LoadingPage />
    ) : (
        <div className='addArtist-personalDetails'>

            {/* 1 row */}

            <div className='addArtist-alignRow'>
                
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>Course Name*</label>
                  <input
                    type='text'
                    name='name'
                    onChange={handleChange}
                    placeholder='Course Name'
                    defaultValue={getcoursedata.name}
                    className='addArtist-inputField'
                  />
                </div>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Discipline*
                  </label>
                  <select
                    className='addArtist-selectField'
                    onChange={(e) => { setcourseData({ ...courseData, discipline: { name: e.target.value } }) }}>
                
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information System">Information System</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business Analytics">Business Analytics</option>
                  </select>
                </div>

            </div>



            {/* 2th row */}

            <div className='addArtist-alignRow'>
                
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Application Fee (USD)
                  </label>
                  <input
                    type='number'
                    min="1"
                    max="200"
                    defaultValue={getcoursedata.applicationFees}
                    maxLength="3"
                    name='applicationFees'
                    onChange={handleChange}
                    placeholder='Between 1-200 USD'
                    className='addArtist-inputField'
                  />
                </div>
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Program Fee (USD)
                  </label>
                  <input
                    type='number'
                    min="1k"
                    max="100k"
                    name='programFees'
                    defaultValue={getcoursedata.programFees}
                    onChange={handleChange}
                    placeholder='1k-100k USD'
                    className='addArtist-inputField'
                  />
                </div>

            </div>



            {/* 3th row */}

            <div className='addArtist-alignRow'>
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Physical Transcript requirement
                  </label>
                  <RadioGroup
                    aria-labelledby="demo-row-controlled-radio-buttons-group"
                    name="transcriptRequired"
                    row
                    defaultValue={getcoursedata.transcriptRequired}
                    onChange={handleChange}
                    className='addArtist-inputField'
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </div>
              
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Financial Documents Requirement Review
                  </label>
                  <RadioGroup
                    aria-labelledby="demo-row-controlled-radio-buttons-group"
                    name="financialDocuRequired"
                    defaultValue={getcoursedata.financialDocuRequired}
                    onChange={handleChange}
                    className='addArtist-inputField'
                    row>
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </div>
            </div>


            {/* 4th row */}

            <div className='addArtist-alignRow'>
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Third Party Transcript evaluation
                  </label>
                  <RadioGroup
                    aria-labelledby="demo-row-controlled-radio-buttons-group"
                    name="thirdPartyRequired"
                    row
                    defaultValue={getcoursedata.thirdPartyRequired}
                    onChange={handleChange}
                    className='addArtist-inputField'
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </div>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Minimum GPA Requirement
                  </label>
                  <input
                    type='number'
                    min="0"
                    max="4.0"
                    defaultValue={getcoursedata.minGpaRequired}
                    name='minGpaRequired'
                    onChange={handleChange}
                    placeholder='for ex: 2.5 , 3.0'
                    className='addArtist-inputField'
                  />
                </div>

            </div>



            {/* 5th row */}

            <div className='addArtist-alignRow'>
                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    GRE Test Requirement
                  </label>
                  <RadioGroup
                    aria-labelledby="demo-row-controlled-radio-buttons-group"
                    name="greRequired"
                    row

                    onChange={handlegre}
                    className='addArtist-inputField'
                  >
                    <FormControlLabel value="yes" onClick={nobox} control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" onClick={nobox} control={<Radio />} label="No" />
                    <FormControlLabel onClick={onbox} value="specialwaiver" control={<Radio />} label="Special Waiver" />
                    {showgrebox ? (<input type="text"  onChange={handlegre} name="greWaiver" placeholder='Describe special waiver' className='addArtist-inputField' />
                    ) : ("")}
                  </RadioGroup>
                </div>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    GRE Minimum Score Requirement
                  </label>
                  {
                    (courseData.GREtestrequirement == "no") ? (
                      <input type="text" onChange={handleChange} name="Gremindefault" value="N/A" className='addArtist-inputField' />
                    ) : (
                      <div className='addArtist-inputField'>

                        <div className='Greverbal'>
                          <h3 > Total</h3>
                          <label>Score </label>
                          <input onChange={handlegre} min="140" name="minTotal" max="170" placeholder='140 - 170' type="number" id="" />
                        </div>
                        <div className='Greverbal'>
                          <h3 > Verbal</h3>
                          <label>Score </label>
                          <input name="minVerbal" onChange={handlegre} min="140" max="170" placeholder='140 - 170' type="number" id="" />
                        </div>

                        <div className='Greverbal'>
                          <h3 > Quant</h3>
                          <label>Score </label>
                          <input name="minQuant" onChange={handlegre} min="140" max="170" type="number" placeholder='140 - 170' id="" />
                        </div>

                        <div className='Greverbal'>
                          <h3 > AWA</h3>
                          <label>Score </label>
                          <input name="minAWA" onChange={handlegre} min="0" max="6.0" placeholder=' 0 - 6' type="number" id="" />
                        </div>
                      </div>
                    )
                  }
                </div>
            </div>


            {/* 6th row */}

            <div className='addArtist-alignRow'>

              <div className='addArtist-inputFieldDiv'>
                <label className='addArtist-inputLabel'>
                  Toefl Accepted ?
                </label>
                <RadioGroup
                  aria-labelledby="demo-row-controlled-radio-buttons-group"
                  row
                  onChange={handletoefl}
                  name="toeflAccepted"
                  className='addArtist-inputField'
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </div>

              <div className='addArtist-inputFieldDiv'>
                <label className='addArtist-inputLabel'>
                  TOEFL Minimum Score Requirement
                </label>
                <div className='addArtist-inputField'>

                  <div className='toefl-category-box'>
                    <div className='toefl-category-box-single'>
                      <label >Total Score</label>
                      <input type="number" onChange={handletoefl} name="Total" placeholder="< 120" max="120" min="0" />
                    </div>
                    <div className='toefl-category-box-single'>
                      <label >Reading</label>
                      <input type="number" onChange={handletoefl} name="minReading" placeholder='< 30' min="0" max="30" />
                    </div>
                    <div className='toefl-category-box-single'>
                      <label >Writing</label>
                      <input type="number" onChange={handletoefl} name="minWriting" placeholder='< 30' min="0" max="30" />
                    </div>
                    <div className='toefl-category-box-single'>
                      <label >Speaking</label>
                      <input type="number" onChange={handletoefl} name="minSpeaking" placeholder='< 30' min="0" max="30" />
                    </div>
                    <div className='toefl-category-box-single'>
                      <label >Listening</label>
                      <input type="number" onChange={handletoefl} name="minListening" placeholder='< 30' min="0" max="30" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

                 
                 
              {/* 7th row */}


            <div className='addArtist-alignRow'>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        IELTS Accepted ?
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        row
                        onChange={handleielts}
                        name="ieltsAccepted"
                        className='addArtist-inputField'
                      >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>


                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        IELTS Minimum Score Requirement
                      </label>
                      <div className='addArtist-inputField'>

                        <div className='toefl-category-box'>
                          <div className='toefl-category-box-single'>
                            <label >Total Score</label>
                            <input type="number" onChange={handleielts} name="Total" min="0" max="9" placeholder='< 9' />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Reading</label>
                            <input type="number" onChange={handleielts} name="minReading" placeholder='< 9' min="0" max="9.0" />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Writing</label>
                            <input type="number" onChange={handleielts} name="minWriting" placeholder='< 9' min="0" max="9.0" />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Speaking</label>
                            <input type="number" onChange={handleielts} placeholder='< 9' min="0" max="9.0" name='minSpeaking' />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Listening</label>
                            <input type="number" onChange={handleielts} placeholder='< 9' min="0" max="9.0" name='minListening' />
                          </div>
                        </div>
                      </div>
                  </div>
            </div>

              {/* 8th Row */}


              <div className='addArtist-alignRow'>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Duolingo Accepted ?
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      row
                      onChange={handleduolingo}
                      name="duoLingoAccepted"
                      className='addArtist-inputField'
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Duolingo Score Requirement
                    </label>
                    <div className='addArtist-inputField'>

                      <div className='toefl-category-box'>
                        <div className='toefl-category-box-single'>
                          <label >Total Score</label>
                          <input type="number" onChange={handleduolingo} name="Total" min="0" max="160" placeholder='< 160' />
                        </div>
                        <div className='toefl-category-box-single'>
                          <label >Literacy</label>
                          <input type="number" onChange={handleduolingo} name="minLiteracy" placeholder='< 160' min="0" max="160" />
                        </div>
                        <div className='toefl-category-box-single'>
                          <label >Comprehension</label>
                          <input type="number" onChange={handleduolingo} name="minComprehension" placeholder='< 160' min="0" max="160" />
                        </div>
                        <div className='toefl-category-box-single'>
                          <label >Conversation</label>
                          <input type="number" onChange={handleduolingo} placeholder='< 160' min="0" max="160" name='minConversation' />
                        </div>
                        <div className='toefl-category-box-single'>
                          <label >Production</label>
                          <input type="number" onChange={handleduolingo} placeholder='< 160' min="0" max="160" name='minProduction' />
                        </div>
                      </div>
                    </div>
                   </div>
              
              </div>


                  {/* 9th row */}

              <div className='addArtist-alignRow'>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    PTE Accepted ?
                  </label>
                  <RadioGroup
                    aria-labelledby="demo-row-controlled-radio-buttons-group"
                    row
                    onChange={handlepte}
                    name="pteAccepted"
                    className='addArtist-inputField'
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </div>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>PTE</label>
                  <input
                    type='number'
                    name='minScore'
                    onChange={handlepte}
                    placeholder='< 90'
                    min="0"
                    max="90"
                    className='addArtist-inputField'
                  />
                </div>
              </div>


              {/* 10th row */}

              <div className='addArtist-alignRow'>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Fall Deadline
                  </label>

                  <div className='addArtist-inputField deadline-boxes'>
                    <div className='deadline-boxes-single'>
                      <a href='#'>Priority</a>
                      <input type="date" onChange={handlefalldeadline}
                        name='priority' className='addArtist-inputField'
                      />
                    </div>
                    <div className='deadline-boxes-single'>
                      <a href='#'>Final</a>
                      <input type="date" onChange={handlefalldeadline}
                        name='final' className='addArtist-inputField' />
                    </div>
                  </div>
                </div>


                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Spring Deadline
                  </label>
                  <div className='addArtist-inputField deadline-boxes'>
                    <div className='deadline-boxes-single'>
                      <a href='#'>Priority</a>
                      <input type="date" onChange={handlespringdeadline}
                        name='priority' className='addArtist-inputField' />

                    </div>
                    <div className='deadline-boxes-single'>
                      <a href='#'>Final</a>
                      <input type="date" onChange={handlespringdeadline}
                        name='final' className='addArtist-inputField' />
                    </div>
                  </div>
                </div>
              </div>


              {/* 11th row    */}


              <div className='addArtist-alignRow'>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Summer Deadline
                    </label>
                    <div className='addArtist-inputField deadline-boxes'>
                      <div className='deadline-boxes-single'>
                        <a href='#'>Priority</a>
                        <input type="date" onChange={handlesummerdeadline}
                          name='priority' className='addArtist-inputField' />
                      </div>
                      <div className='deadline-boxes-single'>
                        <a href='#'>Final</a>
                        <input type="date" onChange={handlesummerdeadline}
                          name='final'
                          className='addArtist-inputField' />
                      </div>
                    </div>
                  </div>


                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Non IT Background ?
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="nonITAccepted"
                      onChange={handleChange}
                      className='addArtist-inputField'
                      row
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>

              </div>


              {/* 12th row */}


              <div className='addArtist-alignRow'>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Pre Requisites Waiver for Non IT Background Students
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="preWaiverForNonIT"
                      onChange={handleChange}
                      className='addArtist-inputField'
                      row
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Last 60 Semester Units Consideration
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="last60UnitsConsidered"
                      onChange={handleChange}
                      className='addArtist-inputField'
                      row
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>

              </div>


              {/* 13th row */}
              <div className='addArtist-alignRow'>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Department Details
                    </label>
                    <div className='addArtist-inputField'>
                      <div className='department-details'>

                        <div className='department-details-single'>
                          <label >Email</label>
                          <input type="email" onChange={handledepartment} name="email" id="" />
                        </div>
                        <div className='department-details-single'>
                          <label>Address</label>
                          <input type="text" onChange={handledepartment} name='address' />
                        </div>
                        <div className='department-details-single'>
                          <label>Phone</label>
                          <input type="tel" onChange={handledepartment} name='number' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Activity Status
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="activityStatus"
                      onChange={handleChange}
                      className='addArtist-inputField'
                      row>
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>

            </div>


              {/* 14th row */}


              <div className='addArtist-alignRow'>

                <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Admission Office
                      </label>
                      <div className='addArtist-inputField'>
                        <div className='department-details'>

                          <div className='department-details-single'>
                            <label >Email</label>
                            <input type="email" onChange={handleadmissionoffice} name="email" id="" />
                          </div>
                          <div className='department-details-single'>
                            <label>Address</label>
                            <input type="text" onChange={handleadmissionoffice} name='address' />
                          </div>
                          <div className='department-details-single'>
                            <label>Phone</label>
                            <input type="tel" onChange={handleadmissionoffice} name='number' />
                          </div>
                        </div>
                      </div>
                    </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Program Length  (Months)
                    </label>
                    <input
                      type='number'
                      min="1"
                      max="60"
                      name='programLength'
                      onChange={handleChange}
                      placeholder='Enter a number'
                      className='addArtist-inputField'
                    />
                </div>

              </div>



              <div className='addArtist-submitDetailDiv'>
                <button
                  className='addArtist-submitDetailBtn'
                  onClick={ handlesubmit }
                >
                  Add Courses
                </button>
              </div>
            </div>
        
        )}
      </div></>
  )
}

export default Editcourse