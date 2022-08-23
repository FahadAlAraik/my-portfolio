

function SkillItem(props) {


    return(

        <div className = 'row'>
            <div className = 'skill-item col text-center'>
                <img className ='skill-item-img' src= {`../images/Skills/${props.img}.png`}   />
                <p className = 'skill-item-text'>{props.skillName}</p>
            </div>
            <div className="col-8 align-self-center align-items-center">
                <div className = 'text-center outer-progress-bar'>
                    
                    <div className = 'text-center inner-progress-bar' style = {{width: `${props.progress}%`}}> 
                        <span>{props.progress}%</span>                  
                    </div>
                </div>
            </div>
        </div>

    )






}


export default SkillItem;