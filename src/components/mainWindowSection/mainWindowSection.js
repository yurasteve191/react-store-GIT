import './mainWindowSection.css'

function MainWindowSection(props){
    const {functions, variables} = props
    const {title, hasTitle, hasBackGroundColor} = variables

    return (
        <section className={`mainWindowSection ${hasBackGroundColor?'bg-true':''}`}>
            {hasTitle && (
                <div className='mainWindowSectionTitle'>
                    <p>{title}</p>
                </div>
            )}
            {props.children}
        </section>
    )
}

export default MainWindowSection