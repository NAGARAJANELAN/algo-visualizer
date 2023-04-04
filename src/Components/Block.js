import './Block.css';

function Block(props){
    var handleClick=function(){
        props.onClick(props.i,props.j);
    }
    return(
        <div className="block" onClick={handleClick}>
            {/* <p>{props.i}{props.j}</p> */}
            {/* <p>{props.bubbles}</p> */}
            {props.bubbles===1 && <img className={`bubble-${props.isBig?"big":"small"}`} src={`${props.isRed?"Red":"Green"}1.png`} alt='1'/>}
            {props.bubbles===2 && <img className={`bubble-${props.isBig?"big":"small"}`} src={`${props.isRed?"Red":"Green"}2.png`} alt='2'/>}
            {props.bubbles===3 && <img className={`bubble-${props.isBig?"big":"small"}`} src={`${props.isRed?"Red":"Green"}3.png`} alt='3'/>}
        </div>
    );
}
export default Block;