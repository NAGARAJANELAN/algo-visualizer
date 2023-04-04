import Block from "./Block";
import './Board.css';
import React, { useEffect, useState } from "react";

var red=true;


function Board(){
    const [board,setBoard]=useState([]);
    const [winner,setWinner]=useState("");
    var BUBBLE_LIMIT = 3;
    var m=8,n=5; //row columns

    function setUp(){
      var temp=[];
      for(let i=0;i<m;i++){
        temp.push([])
        for(let j=0;j<n;j++){
            temp[i].push({i,j,bubbles:0,isBig:false,isRed:true})
        }
      }
      console.log("setting up...\n Red"+red);
      setBoard(temp);
    }

    useEffect(() => {
      const func = () => {
        setUp();
      };
      func();
    }, []);


    //two queue
    
    const  bfs = async (i, j) => {
      if(board[i][j].bubbles>0 && board[i][j].isRed!==red) return;
      let queueA = [board[i][j]];
      var queueB=[];
      while (true) {

        while(queueA.length>0){
          let temp = queueA.shift();
          if(temp.bubbles>0 && temp.isRed!==red) continue;
          temp.bubbles++;
          temp.isRed=red;
          // setBubble();
          if (temp.bubbles <= BUBBLE_LIMIT){}
          else{
            temp.bubbles = 0;
            // setBubble();
            if (temp.i - 1 >= 0) queueB.push(board[temp.i - 1][temp.j]);
            if (temp.j - 1 >= 0) queueB.push(board[temp.i][temp.j - 1]);
            if (temp.i + 1 < m) queueB.push(board[temp.i + 1][temp.j]);
            if (temp.j + 1 < n) queueB.push(board[temp.i][temp.j + 1]);
          }
        }
        setBubble();
        if(queueB.length>0){
          for(let i=0;i<queueB.length;i++){
             queueB[i].isBig=true;
             queueB[i].isRed=red;
            }
            await new Promise((resolve)=>setTimeout(resolve,125));
            setBubble();
          for(let i=0;i<queueB.length;i++) queueB[i].isBig=false;
          await new Promise((resolve)=>setTimeout(resolve,125));
          setBubble();
        }

        while(queueB.length>0){
          let temp = queueB.shift();
          if(temp.bubbles>0 && temp.isRed===!red) continue;
          temp.bubbles++;
          temp.isRed=red;
          // setBubble();
          if (temp.bubbles <= BUBBLE_LIMIT){}
          else{
            temp.bubbles = 0;
            // setBubble();
            if (temp.i - 1 >= 0) queueA.push(board[temp.i - 1][temp.j]);
            if (temp.j - 1 >= 0) queueA.push(board[temp.i][temp.j - 1]);
            if (temp.i + 1 < m) queueA.push(board[temp.i + 1][temp.j]);
            if (temp.j + 1 < n) queueA.push(board[temp.i][temp.j + 1]);
          }
        }
        setBubble();
        if(queueA.length>0){
          for(let i=0;i<queueA.length;i++){
            queueA[i].isBig=true;
            queueA[i].isRed=red;
           }
          //  await new Promise((resolve)=>setTimeout(resolve,125));
           setBubble();
          for(let i=0;i<queueA.length;i++) queueA[i].isBig=false;
          await new Promise((resolve)=>setTimeout(resolve,125));
          setBubble();
        }
        if(queueA.length===0 && queueB.length===0) break;
      }
      
      if(red) red=false;
      else red=true; 
      hasWon();
    }

    function setBubble(){
      const t=[...board];
      setBoard(t);
    }

    function clicked(row,col){
      console.log(row+","+col);
      bfs(row,col);
      console.log("After changing-> "+red);
    }

    function hasWon(){
      var redCount=0,greenCount=0;
      for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
          var t=board[i][j];
          if(t.bubbles>0 && t.isRed) redCount++;
          if(t.bubbles>0 && !t.isRed) greenCount++;
        }
      }
      if(redCount>=m*n*0.7 && greenCount===0) setWinner("Red");
      else if(greenCount>=m*n*0.7 && redCount===0) setWinner("Green");
    }

    return (
        <div className="board">
          <table className={`table-${red?"red":"green"}`} cellSpacing={0} cellPadding={0}>
            <tbody>
              {board.map((item, index) => {
                return (
                  <tr key={index}>
                    {
                        item.map((block,bindex)=>{
                            return (<td key={bindex}><Block i={block.i} j={block.j} bubbles={block.bubbles} isBig={block.isBig} isRed={block.isRed} onClick={clicked}/></td>)
                        })
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>
          {winner && <h1>{winner} has Won</h1>}
        </div>    
      );
}

export default Board;