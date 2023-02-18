
function AddScript(props){
    const {scriptSrc, scriptId} = props
    const scriptEl = document.getElementById(scriptId)
    console.log(scriptEl);
    if (scriptEl){
        scriptEl.remove()
    }
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.id = scriptId;
    document.body.appendChild(script);
}

export default AddScript