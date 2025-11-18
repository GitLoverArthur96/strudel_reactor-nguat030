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
import PlayButtons from './Components/PlayButtons';
import ProcTextArea from './Components/ProcTextArea';
import SetCpm from './Components/SetCpm';
import VolumeSlider from './Components/VolumeSlider';
import Hotkeys from './Components/HotKeys';
import Editor from './Components/Editor';
import Graph from './Components/Graph';
import { Preprocess } from './Util/PreprocessLog';
import JsonSave from './Components/JsonSave';
import Swal from "sweetalert2";


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};



export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        let outputText = Preprocess({ inputText: songText, volume: volume, cpm: cpm })
        globalEditor.setCode(outputText)
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const [songText, setSongText] = useState(stranger_tune)

    const [volume, setVolume] = useState(1);

    const [state, setState] = useState("stop");

    const [cpm, setCpm] = useState(120);

    const saveJson = () => {
        const projectData = {
            cpm,
            volume,
            globalEditor: songText,
        };

        const jsonString = JSON.stringify(projectData, null, 2);

        localStorage.setItem("projectData", jsonString);

        Swal.fire({
            title: "Saved",
            text: "preset saved",
            icon: "success"
        })

    }


    const loadJson = () => {
        const jsonString = localStorage.getItem("projectData");
        if (jsonString) {
            const data = JSON.parse(jsonString);

            if (data.cpm !== undefined) setCpm(data.cpm);
            if (data.volume !== undefined) setVolume(Number(data.volume));
            if (data.globalEditor !== undefined) setSongText(data.globalEditor);


            Swal.fire({
                title: "Loaded",
                text: "Preset loaded successfully",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "No Data",
                text: "No saved preset found",
                icon: "warning"
            });

        }


    }



    useEffect(() => {
        if (state == "play") {
            handlePlay();
        }

    }, [volume, cpm])


    useEffect(() => {
        const handleKeyPress = (event) => {
            // Ignore if user is typing in an input or text as well as editor
            const isTyping = ['INPUT', 'TEXTAREA'].includes(event.target.tagName) ||
                event.target.closest('.cm-editor') !== null ||
                event.target.closest('#editor') !== null;;
            if (isTyping) return;

            // Check for letters
            const key = event.key.toLowerCase();

            switch (key) {
                case ' ': // Spacebar - Play/Pause
                    event.preventDefault(); // Prevent page scroll
                    if (state === "play") {
                        setState("stop");
                        handleStop();
                    } else {
                        setState("play");
                        handlePlay();
                    }
                    break;


                case 'r': // R - Reset/Reload
                    loadJson();
                    break;

                case 's': // S - Save
                    saveJson();

                    break;

                case 'arrowup': // Volume Up
                    event.preventDefault();
                    setVolume(prev => Math.min(1, parseFloat(prev) + 0.1));
                    break;

                case 'arrowdown': // Volume Down
                    event.preventDefault();
                    setVolume(prev => Math.max(0, parseFloat(prev) - 0.1));
                    break;

                case 'arrowright': //  Increase CPM
                    event.preventDefault();
                    setCpm(prev => parseInt(prev) + 10);
                    break;

                case 'arrowleft': //  Decrease CPM
                    event.preventDefault();
                    setCpm(prev => Math.max(0, parseInt(prev) - 10));
                    break;

                case '?': // help info for hotkeys
                    Swal.fire({
                        title: 'Keyboard Shortcuts',
                        html: `
                        <div style="text-align: left;">
                            <strong>Spacebar</strong> - Play/Pause<br/>               
                            <strong>R</strong> - Reload saved preset<br/>
                            <strong>S</strong> - Save preset<br/>
                            <strong>↑/↓</strong> - Volume Up/Down<br/>
                            <strong>←/→</strong> - CPM Down/Up<br/>
                            <strong>?</strong> - Show this help
                        </div>
                    `,
                        icon: 'info'
                    });
                    break;


                default:
                    break;
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyPress);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [state, handlePlay, handleStop, saveJson, loadJson]);







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






        }

        globalEditor.setCode(songText);
    }, [songText]);


    return (
        <div className="page-container">

            <h2 className="title">Strudel Demo</h2>
            <main>
                <Graph />

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-8" >

                            <div className="section-box">

                                <ProcTextArea Value={songText} onChange={(e) => setSongText(e.target.value)} />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <br />
                            <div className="section-box">
                                <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />


                            </div>
                            <div className="section-box">
                                <JsonSave onSave={saveJson} onLoad={loadJson} />
                            </div>

                            <canvas id="roll"></canvas>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-8" >

                            <Editor />
                        </div>

                        <div className="col-md-4">
                            <div className="section-box">
                                <h4 className="section-title">DJ Controls</h4>

                                <SetCpm cpm={cpm} onCpmChange={(e) => setCpm(e.target.value)} />
                                <br />
                                <VolumeSlider volume={volume} onVolumeChange={(e) => setVolume(e.target.value)} />
                                <br />
                                <Hotkeys />

                            </div>
                        </div>
                    </div>
                </div>

            </main >
        </div >
    );


}