import React, {useEffect, useState} from 'react'
import './css/body.css'
import Display from './Display'
import Nums from './Nums'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'


const Body = () => {
    
    useEffect(() => {
        document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
        document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());
    }, [])

    const [valueNum, setvalueNum] = useState([]);

    const [final_result, setFinalResult] = useState("");

    const [updateDisplay, setUpdateDisplay] = useState('');

    const cleanDisplay = () =>{
        setvalueNum([]);
        setFinalResult("");
    }

    const changeNumber = () =>{
        let lastItem = valueNum.pop();

        let itemNew = "";

        if(parseFloat(lastItem) > 0){
            itemNew = lastItem * -1;
        }

        if(parseFloat(lastItem) < 0){
            itemNew = lastItem * -1;
        }

        setvalueNum([
            ...valueNum,
            itemNew
        ])
    }

    const borrarNum = () =>{
        valueNum.pop();
        setvalueNum([
            ...valueNum,

        ])
    } 

    
    const resultclick = () =>{
        let valores = "";
        valores = valueNum.toString().replaceAll(',','');
        valores = valores.replaceAll('=','');
        invoke('calculator', { invokeMessage: valores}).then((message) => setFinalResult(message));
    }


    const resultPorcentaje = () =>{
        let valores = "";
        valores = final_result;

        if(final_result !== ""){
            invoke('porcentaje', { invokeMessage2: valores}).then((message) => setFinalResult(message));
        }

    }





    let num = ['AC', '+/-', '%', '÷',
     '7', '8', '9', 'x', 
     '4', '5', '6', '-',
     '1', '2', '3', '+',
     '⏎', '0', '.', '='
    ];

    let contador = 0;


    return(
        
        <div className="body">

            <div className="d-body">
                <div data-tauri-drag-region  className="menu-title">

                    <i id="titlebar-minimize" class="fas fa-minus"></i>
                    <i id="titlebar-close" class="fas fa-times-circle"></i>
                   
                </div>
                <Display value={valueNum} updateDisplay={updateDisplay} 
                        final_result={final_result}/>
            </div>
        
            <div className="buttons">
                
                {
                    num.map((item, index) => {
                        contador += 1
                        return <Nums key={index} borrarNum={borrarNum} 
                                value={item} count={contador} changeNumber={changeNumber} 
                                setvalueNum={setvalueNum}
                                valueNum={valueNum} resultPorcentaje={resultPorcentaje}
                                cleanDisplay={cleanDisplay} result={resultclick}
                        />
                    }) 
                }

            </div>

        

        </div>
    );

}

export default Body
