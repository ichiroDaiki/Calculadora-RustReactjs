import React, {useState} from 'react'
import './css/Nums.css'

const Nums = (props) => {

    let array = [];

    const [op, setOP] = useState(false);

    const changecolor = () =>{
        let x = document.getElementById('ope-color')
        x.className += 'op-color';
    }

    const removeClass = () =>{
        let x = document.getElementById('ope-color')
        x.classList.remove('op-color');
    }

    

    const getNumbers = (numero) =>{

        if(numero !== "AC" && numero !== "⏎" && numero !== "+/-"){
            props.setvalueNum([
                ...props.valueNum,
                numero
            ])
        }
        
        if(numero === "%"){
            props.resultPorcentaje();
        }

        if(numero === "="){
            props.result();
            changecolor();
        }

        if(numero === "AC"){
            props.cleanDisplay();
            removeClass();
        }
        
        if(numero === "⏎"){
            props.borrarNum();
        }

        if(numero === "+/-"){
            props.changeNumber()
        }



    }



    

    
    return(


        
        <div className="Nums" onClick={()=>getNumbers(props.value)}>
        {
            
            parseInt(props.value) ? (
               <span>
                {props.value}
               </span>

            ):(
                props.count <= 3 ? (
                    <span style={{color: "RGB(40, 216, 186)"}}>
                        {props.value}
                    </span>
                ):(
                    parseInt(props.value) === 0 ? (
                        <span style={{color: "#fff"}}>
                            {props.value}
                        </span>
                    ):(
                        <span style={{color: "RGB(207, 97, 101)"}}>
                            {props.value}
                        </span>
                        
                    )
                )
                
            )
            
        }


        </div>

    );

}

export default Nums;