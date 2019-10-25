import {RectObj} from './rectObj.js';

export const mapUtils = {

     /**
   * Draw draggable timeline
   */

  drawTimeline : (ctx, tlc, pathWidth, pathColor) => {
    let newRect = new RectObj(tlc.x, tlc.y, tlc.width, tlc.height, pathWidth, pathColor);
    newRect.draw(ctx);

    return newRect;

  },

  /**
   * Draw highlight on course in sync with timeline position
   */
  drawPathHighlight: (ctx, record) => {
    console.log(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(record.x, record.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  },

  /**
 * Draw timline indicator
 */
drawStartIndicator: (ctx, position, tlc) =>{

    position = position || 10;
  
    //startIndicator
    ctx.clearRect(tlc.x, tlc.y, tlc.width, tlc.height);
    
    ctx.beginPath();
  
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    //background
    ctx.fillRect(tlc.x+position, tlc.y+1, 11, tlc.height-2);
  
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666';
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
  
    //top indicator
    ctx.moveTo(tlc.x+6+position, tlc.y+10);
    ctx.lineTo(tlc.x+position, tlc.y+7);
    ctx.lineTo(tlc.x+position, tlc.y+1);
    ctx.lineTo(tlc.x+11+position, tlc.y+1);
    ctx.lineTo(tlc.x+11+position, tlc.y+7);
    ctx.lineTo(tlc.x+6+position, tlc.y+10);
  
    //top indicator
    ctx.moveTo(tlc.x+6+position, tlc.y+tlc.height-10);
    ctx.lineTo(tlc.x+position, tlc.y+tlc.height-7);
    ctx.lineTo(tlc.x+position, tlc.y+tlc.height-1);
    ctx.lineTo(tlc.x+11+position, tlc.y+tlc.height-1);
    ctx.lineTo(tlc.x+11+position, tlc.y+tlc.height-7);
    ctx.lineTo(tlc.x+6+position, tlc.y+tlc.height-10);
  
    ctx.fill();
  
    //time indicator
    ctx.beginPath();
    ctx.strokeStyle= 'red';
    ctx.moveTo(tlc.x+6+position, tlc.y+11);
    ctx.lineTo(tlc.x+6+position, tlc.y+tlc.height-11);
  
    ctx.stroke();
  }
};
