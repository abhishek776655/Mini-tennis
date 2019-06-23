   var Canvascontext;
   var canvas;
            var BallX= 50;
            var BallspeedX =9;
             var BallY =50;
            var BallspeedY =4;
            var PaddleY =250;
            var Paddle2Y =250;
            const paddleHeight =100;
            var plr1score=0;
            var plr2score=0;
           const winningScore=5;
            var reset=false;
            var colorchange="white";
            
             function gameNet()
            {
                 for(var i=0;i<canvas.height;i+=40)
                 {
                     colorRect((canvas.width)/2-1,i,2,20,'white');
                 }
}
         window.onload= function (){
                canvas=document.getElementById("myCanvas");
                Canvascontext=canvas.getContext("2d");
               var framesPerSecond=50;
               setInterval(function(){moveEverything();drawEverything();},1000/framesPerSecond); 
              canvas.addEventListener('mousedown', function(evt){
                 if(reset){
                 plr1score=0
                 plr2score=0;
                 reset=false;}
             });
                canvas.addEventListener('mousemove',function(evt){ var mousepos=mousePosition(evt);
                PaddleY=mousepos-(paddleHeight/2); });        
         }
           function drawEverything(){
               Canvascontext.fillStyle="green";
               Canvascontext.fillRect(0,0,canvas.width,canvas.height);
             
               if(reset)
               {
                   if(plr1score>=winningScore)
                   {
                       Canvascontext.fillStyle="white";
                        Canvascontext.fillText("You WON",470,280);
                   }
                   else if(plr2score>=winningScore)
                   {
                       Canvascontext.fillStyle="white";
     Canvascontext.fillText("Computer WON!!",470,280);
    
                    }   
                   Canvascontext.fillStyle="white";
                   Canvascontext.fillText("Click TO Start",470,50);
                   return;
               }
               gameNet();
               Canvascontext.fillStyle="white";
               Canvascontext.fillRect(0,PaddleY,10,paddleHeight);
              Canvascontext.fillStyle="black";
               Canvascontext.fillRect(canvas.width-10,Paddle2Y,10,paddleHeight);
               colorCircle(BallX,BallY,10,colorchange);  
               Canvascontext.fillText(plr1score,50,50);
               Canvascontext.fillText(plr2score,canvas.width-50,50);      
}
            function moveEverything()
            {
                if(reset)
                {
                    return;
                }
                 computerMovement();
                    BallX=BallX+BallspeedX;
                BallY=BallY+BallspeedY;
                if(BallX>canvas.width)
                {
                    if(BallY>Paddle2Y&&BallY<Paddle2Y+paddleHeight)
                    {
                          BallspeedX=-BallspeedX;
                         var temp=BallY-(Paddle2Y+paddleHeight/2);
                         BallspeedY=temp*0.25;
                        colorchange="black";      
                    }
                    else
                    {
                    plr1score++;
                    ballReset();            
                    }
                }
                if(BallX<0){
                    if(BallY>PaddleY&&BallY<PaddleY+paddleHeight){
                      BallspeedX=-BallspeedX;  
                         var temp2=BallY-(PaddleY+paddleHeight/2);
                         BallspeedY=temp2*0.25;
                       colorchange="white";
                    }
                    else
                    {
                    plr2score++;
                    ballReset();  
                    } 
                }
                   if(BallY>canvas.height)
               {
                    BallspeedY=-BallspeedY;
                }
                if(BallY<0)
                {
                    BallspeedY=-BallspeedY;
                }
            }
            function colorCircle(centreX,centreY,radius,color){
                Canvascontext.fillStyle=color;
                Canvascontext.beginPath();
                Canvascontext.arc(centreX,centreY,radius,0,Math.PI*2,true);
                Canvascontext.fill();
            }
            function mousePosition(evt)
            {
                var rect=canvas.getBoundingClientRect();
                var root=document.documentElement;
                var mouseY=evt.clientY-rect.top -root.scrollTop;
           
                return mouseY;
            }
            function ballReset()
        {
              if(plr1score>=winningScore||plr2score>=winningScore)
              {
                  reset=true;                  
              }           
                BallX=(canvas.width)/2;
                BallY=(canvas.height)/2;
                BallspeedX=-BallspeedX;
        }
           function computerMovement()
{
              var paddle2YCenter = Paddle2Y + (paddleHeight/2);
	if(paddle2YCenter < BallY - 35) {
		Paddle2Y = Paddle2Y + 6;
}
               else if(paddle2YCenter > BallY + 35)
      {
		Paddle2Y = Paddle2Y - 6;
	  }
 }
            function colorRect(leftX,topY, width,height, drawColor)
  {
	Canvascontext.fillStyle = drawColor;
	Canvascontext.fillRect(leftX,topY, width,height);	
  }           