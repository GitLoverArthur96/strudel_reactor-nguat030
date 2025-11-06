function ProcTextArea({ defaultValue, onChange}) {
    return (
        <>
           
            <h4 className="section-title">Text Script</h4>
            <br />
            <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </>
    );



}

export default ProcTextArea