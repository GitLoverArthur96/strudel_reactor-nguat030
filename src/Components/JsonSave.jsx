function JsonSave({ onSave, onLoad }) {
    return (
        <div className="btn-group" role="group" aria-label="Save and Load">

            <button id="save" className="btn btn-outline-primary" onClick={onSave} >Save Json</button>
            <button id="load" className="btn btn-outline-primary" onClick={onLoad}>Load Json</button>
        </div>
    );



}

export default JsonSave