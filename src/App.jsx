
import { useState,useCallback,useEffect,useRef} from "react";


function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setnumberAllowed] = useState(false);
  const[charAllowed,setcharAllowed] = useState(false);
  const[password,setPassword] = useState("");
  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"

    for(let i=1;i<=length;i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)

  }
  setPassword(pass)
  
},[length,charAllowed,numberAllowed,setPassword])


const passwordCopyToClipboard=useCallback(()=>{
  passwordRef.current.select(); //Selecting the password from the clipboard
  passwordRef.current.setSelectionRange(0, password.length); //Selecting the password from the clipboard
  window.navigator.clipboard.writeText(password)
},[password])
//Calling the overall function with the useEffect hook


useEffect(()=>{passwordGenerator()},[length,charAllowed,numberAllowed,passwordGenerator])
  return (

    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
     <h1 className="text-2xl text-center font-bold text-center my-3">Password Generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
     <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly
      ref={passwordRef}
     />
     <button onClick={passwordCopyToClipboard}className="">Copy</button>
     </div>
     <div className="flex text-sm gap-x-2">
 
      <div className="flex items-center gap-x-1">
        <input 
        type="range" 
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>setLength(e.target.value)}
        />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>setnumberAllowed((prev)=>!prev)}
        />
        <label htmlFor="numberInput">Numbers</label>
        
      </div>
      <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id="charInput"
        onChange={()=>setcharAllowed((prev)=>!prev)}
        />
        <label htmlFor="charInput">Characters</label>
        
     </div>
     </div>
    </>
  )
}

export default App
