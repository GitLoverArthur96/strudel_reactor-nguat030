import Swal from "sweetalert2";

function Hotkeys({}) {
    return (
         <button 
                className="btn btn-outline-info btn-sm" 
                onClick={() => {
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
                }}
            >Hotkeys Info
        </button>
    );



}

export default Hotkeys;