import React, {useRef, useState} from "react";

import {eraserTool, pencilTool} from "./Tool/Pen";
import {circleTool, squareTool} from "./Tool/Figure";
import {clearCanvas, getCursorPosition, saveImg} from "./Tool/Canvas";

import "./Paint.scss";


let Paint = () => {
    let [tool, setTool] = useState("pencil");
    let [toolPosition, setToolPosition] = useState({});
    let [isDrawing, setIsDrawing] = useState(false);
    let [color, setColor] = useState('#000000');
    let [clear, setClear] = useState(false);
    let [weight, setWeight] = useState(10);
    let [canvasSize, setCanvasSize] = useState({width: 70, height: 70});


    const canvasRefMain = useRef(null);
    const canvasRefTemp = useRef(null);


    let resetButton = () => {
        setColor("#000000");
        setWeight(10);
        setCanvasSize({width: 70, height: 70});
        setTool("pencil");
        setClear(true);
    }

    let draw = () => {
        if (canvasRefMain.current || canvasRefTemp.current) {
            const mainCtx = canvasRefMain.current.getContext('2d');
            const tempCtx = canvasRefTemp.current.getContext('2d');
            if (clear) {
                clearCanvas(canvasRefTemp.current, tempCtx);
                clearCanvas(canvasRefMain.current, mainCtx);
                setClear(false);
            }

            switch (tool) {
                case "pencil": {
                    pencilTool(mainCtx, tempCtx, weight, color, toolPosition.xC, toolPosition.yC, toolPosition.x1, toolPosition.y1, toolPosition.x2, toolPosition.y2, toolPosition.xF, toolPosition.yF);
                    break;
                }
                case "eraser": {
                    eraserTool(mainCtx, tempCtx, weight, color, toolPosition.xC, toolPosition.yC, toolPosition.x1, toolPosition.y1, toolPosition.x2, toolPosition.y2, toolPosition.xF, toolPosition.yF);
                    break;
                }
                case "circle": {
                    circleTool(mainCtx, tempCtx, weight, color, toolPosition.xC, toolPosition.yC, toolPosition.x1, toolPosition.y1, toolPosition.x2, toolPosition.y2, toolPosition.xF, toolPosition.yF);
                    break;
                }
                case "square": {
                    squareTool(mainCtx, tempCtx, weight, color, toolPosition.xC, toolPosition.yC, toolPosition.x1, toolPosition.y1, toolPosition.x2, toolPosition.y2, toolPosition.xF, toolPosition.yF);
                    break;
                }
            }
        }
    }

    draw();

    return (
        <div className='wrapper'>
            <div className='box'>
                <form className='panel'>
                    <h2>Panel control</h2>
                    <div className='panel_box'>
                        <p>Canvas</p>
                        <p>Width</p>
                        <div className='weight'>
                            <input id="result" type='range' min="30" step="10" max="100" onChange={(e) => {
                                setCanvasSize({...canvasSize, width: parseInt(e.target.value)})
                            }}/>
                            <p>{canvasSize.width} vw</p>
                        </div>
                        <p>Height</p>
                        <div className='weight'>
                            <input id="result" type='range' min="30" step="10" max="100" onChange={(e) => {
                                setCanvasSize({...canvasSize, height: parseInt(e.target.value)})
                            }}/>
                            <p>{canvasSize.height} vh</p>
                        </div>

                    </div>
                    <div className='panel_box'>
                        <p>Change color</p>
                        <br/>
                        <input id="result" type="color" value={color} onChange={(e) => {
                            setColor(e.target.value)
                            if (tool === "eraser") {
                                setTool("pencil");
                            }
                        }}/>
                        <p>Line width</p>
                        <div className='weight'>
                            <input id="result" type='range' min="1" step="1" max="100" onChange={(e) => {
                                setWeight(parseInt(e.target.value))
                            }}/>
                            <p>{weight}</p>
                        </div>
                        <p onClick={() => {
                            setTool("eraser");
                        }}>Eraser </p>
                        <p onClick={() => {
                            setTool("pencil");
                        }}>Pen</p>
                        <p onClick={() => {
                            setTool("circle");
                        }}>Circle</p>
                        <p onClick={()=> {
                            setTool("square");
                        }}>Square</p>
                    </div>
                    <div className='panel_box_button'>
                        <button type="reset" onClick={() => {
                            resetButton();
                        }}>Reset
                        </button>
                        <button onClick={() => {
                            if (canvasRefMain.current) {
                                saveImg(canvasRefMain.current);
                            }
                        }} type="submit">Save
                        </button>
                    </div>
                </form>
                <div className='draw'>
                    <p>Canvas</p>
                    <div className='invisible'>
                        <canvas ref={canvasRefTemp} className='canvas2'
                                style={{"width": `${canvasSize.width}vw`, "height": `${canvasSize.height}vh`}}
                                height={500} width={1000}

                                onMouseUp={(e) => {
                                    let position = getCursorPosition(e.target, e);
                                    setToolPosition({...toolPosition, xF: position.x, yF: position.y,})
                                    setIsDrawing(false)
                                }}
                                onMouseDown={(e) => {
                                    let position = getCursorPosition(e.target, e);
                                    setToolPosition({xC: position.x, yC: position.y})
                                    setIsDrawing(true)
                                }}

                                onMouseMove={(e) => {
                                    let position = getCursorPosition(e.target, e);
                                    if (isDrawing) {
                                        setToolPosition({
                                            ...toolPosition,
                                            x1: toolPosition.x2,
                                            y1: toolPosition.y2,
                                            x2: position.x,
                                            y2: position.y
                                        })
                                    } else {
                                        setToolPosition({});
                                    }
                                }}>

                        </canvas>
                        <canvas ref={canvasRefMain}
                                style={{"width": `${canvasSize.width}vw`, "height": `${canvasSize.height}vh`}}
                                height={500} width={1000}>
                        </canvas>
                    </div>

                </div>
            </div>

        </div>

    )
}

export  {Paint};
