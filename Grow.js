

        var AnimButton = document.getElementById("AnimButton");
        var DrawButton = document.getElementById("DrawButton");
        var DelaunayButton = document.getElementById("DelaunayButton");

        var FileButton = document.getElementById("file");

        
        var Canvas = document.getElementById("myCanvas");
        var Context = Canvas.getContext("2d");

        let Seeds = [];
        let Colors = [];

        var MadeSeed = false;

        class Seed
        {
            X;
            Y;

            constructor(x,y)
            {
                this.X = x;
                this.Y = y;
            }
        }

        Canvas.addEventListener('mousedown', function(e) {
            GetCursorPosition(e)
        })

        function GetCursorPosition(event)
        {
            const RectangleBounds = Canvas.getBoundingClientRect();
            X = event.clientX - RectangleBounds.left;
            Y = event.clientY - RectangleBounds.top;

            var NewSeed = new Seed(X,Y);

            Seeds.push(NewSeed);

            Context.beginPath();
            Context.arc(X, Y, 2, 0, 2 * Math.PI);
            Context.fill();
            UnlockButtons();
            if(Seeds.length == 3)
            {
                DelaunayButton.disabled = false;
            }
        }

        function UnlockButtons()
        {
            if(!MadeSeed && Seeds.length > 0)
            {
                MadeSeed = true;
                AnimButton.disabled = false;
                DrawButton.disabled = false;

            }
        }

        function Animate()
        {
                
            for (let i = 0; i < Seeds.length; i++)
             {
                Colors.push(Math.floor(Math.random()*16777215).toString(16));
             }
            Context.clearRect(0, 0, Canvas.width, Canvas.height)
            Context.globalCompositeOperation = "destination-over";
            document.ID = setInterval(DrawGrowth,15);
        }
        var Rad = 10;
        function DrawGrowth()
        {
            console.log("amged");
            
            for (let i = 0; i < Seeds.length; i++) {
                const Seed = Seeds[i];
                Context.beginPath();
                Context.fillStyle = "#" + Colors[i];
                Context.arc(Seed.X,Seed.Y,Rad,0,Math.PI*2);
                Context.fill();
                
            }
            Rad+=1;//set the draw over feature to the new one being behind and just overdraw from each seed for like 50 frames or something.
            if (Rad == Canvas.width/2) 
            {
             clearInterval(document.ID);   
            }
        }