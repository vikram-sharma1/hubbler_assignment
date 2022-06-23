import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from "axios"

function App() {
  const [num,setNum]=useState(0)
  const [actionNum,setActionNum]=useState(0)
  const [conditionNum,setConditionNum]=useState(0)
  const [actionData,setActionData]=useState([])
  const [data,setData]=useState([])
  const [button,setButton]=useState(false)
  const [actionButton,setActionButton]=useState(false)
  const [conditionButton,setConditionButton]=useState(false)
  const [input,setInput]=useState("Abcd")
  const [name,setName]=useState("Default Rule")
  const [toggle,setToggle]=useState(0)
  const [show,setShow]=useState("none")
  const [action,setAction]=useState({
    "action":"START NEW APP"
  })
  const [rule,setRule]=useState({
    "name":name,
  })
  const [rename,setRename]=useState("rename")
  const [time,setTime]=useState("4:35")
  const [date,setDate]=useState("3-8-2022")
  const [disableOnSave,setDisableOnSave]=useState(false)
  const [condition,setCondition]=useState({
    "condition":""
  })
  const [storeCondition,setStoreCondition]=useState([])
  const [ruleId,setRuleId]=useState(0)

  

  // rule part
  const addRule=(e)=>{
    e.preventDefault()
      axios.post("http://localhost:8080/ruleArray",rule).then(()=>{
      setRule({
        "name":name,
      })
    }).then(res=>{
      getData()
    })
  }


  useEffect(()=>{
    getData()
  },[])

    const getData=()=>{
      axios.get("http://localhost:8080/ruleArray").then((res)=>{
      setData(res.data)
      setNum(res.data.length)
      if(res.data.length>=5){
        setButton(true)
      }
      else{
        setButton(false)
      }
     
      // console.log(res.data.length)
    }).catch((err)=>{
      console.log(err)
    })
  }


  // action adding part

  const addAction=()=>{
    // el.preventDefault()
      axios.post("http://localhost:8080/actionArray",action).then(()=>{
      setAction({
        "action":"START NEW APP",
      })
      console.log("action")
    })
    .then(res=>{
      getActionData()
    })
  }

  useEffect(()=>{
    getActionData()
  },[])

  const getActionData=()=>{
    axios.get("http://localhost:8080/actionArray").then((res)=>{
      setActionData(res.data)
      setActionNum(res.data.length)
      // console.log("action")
      if(res.data.length>=5){
        setActionButton(true)
      }
      else{
        setActionButton(false)
      }
      // console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }


  // renaming the rules name

  const handleNameChange=(e)=>{
    setInput(e.target.value)
  }

  const handleRenameById=(rename)=>{
    setRuleId(rename.target.value)
  }

  const handleSubmit=(e)=>{
    const response = axios.patch(`http://localhost:8080/ruleArray/${ruleId}`, { name: input }).then(()=>{
      console.log(response.name)
      console.log(ruleId+"ruleId")
      // getData()
      // setName(res)
    }).then(()=>{
      getData()
    })
  }
  
  

  // condition adding part
  
  const handleCondition=(e)=>{
    setCondition({...condition,[e.target.className]:e.target.value})
  }

  const handleConditionSubmit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/conditionArray",condition).then(()=>{
      setCondition({
        "condition":""
      })
      console.log(condition)
    }).then(()=>{
      getCondition()
    })
  }

  const getCondition=()=>{
    axios.get("http://localhost:8080/conditionArray").then((res)=>{
      setStoreCondition(res.data)
      setNum(res.data.length)
      if(res.data.length>=8){
        setConditionButton(true)
      }
      else{
        setConditionButton(false)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getCondition()
  },[])


  // timestamp 

  let today = new Date();
  let newDate = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
  let newTime= new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

  const NotEditable=()=>{
    setToggle(0)
    setShow("none")
    setDate(newDate)
    setTime(newTime)
    setDisableOnSave(true)
    handleSubmit()
  }

  const Editable=()=>{
    setToggle(1)
    setShow("block")
    setDisableOnSave(false)
  }


  return (
    <div className="App">
      <div id="header">
      <div id="header_items">
        <img src="https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/arcgis-dashboards.png" width="20%" height="60%"></img>
        <div>
        <p>Demo Custom App</p>
        <p>APP NAME</p>
        </div>
        <img src="https://pngroyale.com/wp-content/uploads/2022/03/Right-Arrow-Download-Transparent-PNG-Image.png"></img>
        <div>
        <p>Assessment</p>
        <p>STAGE</p>
        </div>
        <img src="https://pngroyale.com/wp-content/uploads/2022/03/Right-Arrow-Download-Transparent-PNG-Image.png"></img>
        <div>
        <p>Create PO</p>
        <p>BUTTON</p>
        </div>
        <img src="https://pngroyale.com/wp-content/uploads/2022/03/Right-Arrow-Download-Transparent-PNG-Image.png"></img>
        <p>Button Rules</p>
      </div>
      <div id="dataSide">
        <p>App saved on {date} {time}</p>
        {(toggle===0)?
        <button onClick={Editable} id="saveEdit">Edit</button>:
        <button onClick={NotEditable} id="saveEdit">Done</button>
        }
        {/* <button id="saveEdit" onClick={handleSubmit}>Done</button> */}
      </div>
    </div>

    <div id="dashboard">

      {/* left part of the dashboard */}
      <div id="leftDashboard">
        <p style={{textAlign:"left",paddingLeft:"4%"}}>Back to Stages</p>
        <p style={{textAlign:"left",paddingLeft:"4%",marginTop:"25%"}}>RULES</p>
        <div id="rules_list">
          {data.map((e)=> 
             <div key={e.id}>
              <h5 style={{marginTop:"10%",marginLeft:"5px"}}>id: {e.id}</h5>
             <p>{e.name}</p> 
             <img
             style={{display:show}}
             onClick={()=>{
              axios.delete(`http://localhost:8080/ruleArray/${e.id}`).then(res=>{
              getData();
              })
          }}
              src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png" width="17px" height="15px"></img>
          </div>
          )}
         <button  id="newRulebutton" style={{display:show,margin:"auto"}} disabled={button} onClick={addRule}>Add New Rule</button>
        </div>
      </div>

      {/* right part of the dashboard */}
      <div id="rightDashboard">
        {/* add new condition */}
        <p>{name}</p>
        <br/>
        <p>Button Name</p>
        <div style={{display:"flex"}}>
        <input id="rename" type="text"
        placeholder='Change rule name'
        disabled={disableOnSave}
        onChange={handleNameChange} 
        />
        <input id="rename"
        style={{display:show}}
        onChange={handleRenameById}
        type="number" placeholder='Enter id to rename' required></input>
        </div>
        <br/>
        <br/>
        <select>
          <option>If All</option> 
        </select><p>of the following conditions are met</p>
        <br/>
        <select>
          <option>Text</option>
        </select>
        <select>
          <option>Contains</option>
        </select>
        <br/>
        <br/>
        <input className='condition'
        style={{display:show}}
        onChange={handleCondition}
        value={condition.condition}
        type="search" placeholder='type to search and add'></input>
        <div id="conditionSpace">
        {storeCondition.map((con)=>
        <div key={con.id}>
          <p id="conditionName">{con.condition}</p>
          <p id="cross"
          style={{display:show}}
          onClick={()=>{
            axios.delete(`http://localhost:8080/conditionArray/${con.id}`).then(res=>{
            getCondition();
            })
        }}
          >✖</p>
        </div>
        )}
        </div>
          <button
          disabled={conditionButton}
          onClick={handleConditionSubmit}
           style={{display:show}} id="conditionButton">Add New Condition</button>
          <hr></hr>


      {/* add another action */}
      
      <p>Perform the following action</p>
      {actionData.map((index)=>
      <div id="actionPart" style={{display:"flex"}} key={index.id}>  
        <p>{index.action}</p>
        <img id="deleteIcon"
        style={{display:show}}
             onClick={()=>{
              axios.delete(`http://localhost:8080/actionArray/${index.id}`).then(res=>{
              getActionData();
              })
          }}
              src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png" width="17px" height="15px"></img>
      </div>
      )}
      <hr></hr>
      <button style={{display:show,marginBottom:"2%"}} id="actionbutton" disabled={actionButton} onClick={addAction}>Add New Action</button>
        
      </div>
          
    </div>
    </div>
  )
}

export default App
