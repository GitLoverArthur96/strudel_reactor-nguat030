import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './Components/DJControls';
import PlayButtons from './Components/PlayButtons';
import ProcButtons from './Components/ProcButtons';
import ProcTextArea from './Components/ProcTextArea';
import Editor from './Components/Editor';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};



export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const [songText, setSongText] = useState(stranger_tune)


    const handleProc = () => {
        if (!globalEditor) return;
        globalEditor.setCode(songText);
        
        
    }

     const handleProcAndPlay = () => {
       if (!globalEditor) return;
        globalEditor.setCode(songText);
        setTimeout(() => {
            globalEditor.evaluate();
        }, 100);
        
    };


   
    const [cpm , setCpm] = useState(120);
    

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
       


      
        
        // if (globalEditor.current) {
        //     globalEditor.replace(cpm, ${cpm})
        // }
    }

    globalEditor.setCode(songText);
}, [songText]);


return (
    <div className="page-container">
        
        <h2 className="title">Strudel Demo</h2>
        <main>

            <div className="container-fluid"> 
                <div className="row">
                    
                        <div className="col-md-8" >
                            <div className="section-box">
                                
                                <ProcTextArea Value={songText} onChange={(e) => setSongText(e.target.value)}/>
                            </div>
                        </div>

                    <div className="col-md-4">

                        <div className="section-box">
                            <ProcButtons onProc={handleProc} onProcAndPlay={handleProcAndPlay}/>
                            <br />
                            <PlayButtons onPlay={handlePlay} onStop={handleStop}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                 
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: '' }}>
                          <Editor />
                        </div>
                   
                    <div className="col-md-4">
                        <div className="section-box">
                            <DJControls />
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}