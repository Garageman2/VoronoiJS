

        var MadeSeed = false;
        var AnimButton = document.getElementById("AnimButton");
        var DrawButton = document.getElementById("DrawButton");
        var DelaunayButton = document.getElementById("DelaunayButton");

        var Canvas = document.getElementById("myCanvas");
        var Context = Canvas.getContext("2d");

        var X = Canvas.width/2;
        var Y = Canvas.height/2;

        let Seeds = [];

        let Colors = [];

        let Locations = [];

        var DistRange = 10;

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


        //when drawing iterate over each, check distance draw distance one, remove from array, etc until length is zero
        class Point 
        {
            X;
            Y;
            Color;
            Distance;


            constructor(x,y,color,distance)
            {
                this.X = x;
                this.Y = y;
                this.Color = color;
                this.Distance = distance;
            }
        }

        function GenerateIndex(x,y)
        {
            return (Canvas.width*y + x);
        }

        Canvas.addEventListener('mousedown', function(e) {
            GetCursorPosition(e)
        })

        function GetCursorPosition(event)
        {
            const RectangleBounds = Canvas.getBoundingClientRect();
            //seems to be off
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

        function Draw()
        {
            Ahmed();
            Daniel();
            DrawSeeds();
        }

        function Animate()
        {
            Ahmed();
            Document.ID = setInterval(Zohaib,100);
        }

        function Ahmed()
        {
            AnimButton.disabled = true;
            DrawButton.disabled = true;
            
            var XIndex = 0;
            var YIndex = 0;
            var ArrIndex = 0;


            //use a for to generate an array of colors
            for(SeedPoint in Seeds)
            {
                Colors.push(Math.floor(Math.random()*16777215).toString(16));
            }

            for(i = 0; i < Canvas.height; i++)
            {
                //tracks y

                for(j = 0; j < Canvas.width;j++)
                {
                    
                    ArrIndex = GenerateIndex(XIndex,YIndex);
                  
                    var Distance = 10000;
                    var SeedIndex = 0;

                    for(k = 0; k < Seeds.length; k++)
                    {
                        SeedPoint = Seeds[k];

                        var NewX = Math.abs((SeedPoint.X - XIndex));
                        var NewY = Math.abs((SeedPoint.Y - YIndex));

                        
                        var NewDistance = Math.sqrt((Math.pow(NewX,2)+Math.pow(NewY,2)));
                        
                        
                        
                       if (Distance > NewDistance) 
                       {
                         Distance = NewDistance;
                         SeedIndex = k;  
                       }


                    }
                  

                    //now create array object
                    var NewPoint = new Point(XIndex,YIndex,Colors[SeedIndex],Distance);
                    Locations.push(NewPoint);

                    //tracks x
                    XIndex++;
                    
                } 
                XIndex = 0
                YIndex++;
            }
            
           
        }

        function Zohaib()
        {
            if (Locations.length > 0)
             {
                
                for(i = 0; i < Locations.length; i++)
                {

                    Pixel = Locations[i];
                    if(Pixel.Distance <= DistRange)
                    {
                        Context.beginPath();
                        Context.strokeStyle = "#" + Pixel.Color;
                        Context.rect(Pixel.X,Pixel.Y,1,1);
                        Context.stroke(); 
                        Locations.splice(i,1);
                        DistRange += .01;
                    }
                }
             }
            else
            {
                clearInterval(Document.ID);
                DrawSeeds();
                return;
            }

        }

        function Daniel()
        {
            for(i = 0; i < Locations.length; i++)
                {
                    Pixel = Locations[i];
                    
                    
                        Context.beginPath();
                        Context.strokeStyle = "#" + Pixel.Color;
                        Context.rect(Pixel.X,Pixel.Y,1,1);
                        Context.stroke(); 
                        Locations.splice(i,1);
                }
        }

        function DrawSeeds()
        {
            for (let i = 0; i < Seeds.length; i++) {
                const element = Seeds [i];
                Context.beginPath();
                Context.arc(element.X, element.Y, 2, 0, 2 * Math.PI);
                 Context.fill();
                
            }
        }

        function Delaunay()
        {
            for (let i = 0; i < Seeds.length; i++) 
            {
                const Element = Seeds[i];
                var Dist1 = 10000;
                var Dist2 = 10000;
                var Dist3 = 10000;
                var Seed1;
                var Seed2;
                var Seed3;

                for (let j = 0; j < Seeds.length; j++) 
                {
                    console.log(j);
                    const JSeed = Seeds[j];
                    if(JSeed == Element)
                    {

                    }
                    else
                    {
                        //distance not calculatin correctly
                        //
                        var TestDistX = Math.abs((JSeed.X - Element.X));
                        var TestDistY = Math.abs((JSeed.Y - Element.Y));
                        var TestDist =  Math.sqrt(Math.pow(TestDistX,2) + Math.pow(TestDistY,2))

                        console.log(TestDist);

                        if(Dist1 == null || Dist1 > TestDist)
                        {
                            

                            if(Dist2 == null || Dist2 > TestDist) 
                            {
                                 if(Dist3 == null || Dist3 > Dist2)
                                 {
                                    Dist3 = Dist2;
                                    Seed3 = Seed2;
                                 }
                            
                                Dist2 =  Dist1;
                                Seed2 = Seed1;

                            }

                            Dist1 = TestDist;
                            Seed1 = JSeed;

                        }
                        else if(Dist2 == null || Dist2 > TestDist) 
                        {
                            
                            if(Dist3 == null || Dist3 > Dist2)
                            {
                                Dist3 = Dist2;
                                Seed3 = Seed2;
                            }

                            Dist2 = TestDist;
                            Seed2 = JSeed;
                        }
                        
                        else if(Dist3 == null || Dist3 > TestDist)
                        {
                            Dist3 = TestDist;
                            Seed3 = JSeed;
                        }
                    }
                    
                }

                Context.lineWidth = 2;
                Context.strokeStyle = "#222222"
                if (Seed1 != null && Seed2 != null)                     
                {
                    Context.beginPath();
                    Context.moveTo(Element.X,Element.Y);
                    Context.lineTo(Seed1.X,Seed1.Y);
                    Context.stroke();
                    Context.beginPath();
                    Context.moveTo(Element.X,Element.Y);
                    Context.lineTo(Seed2.X,Seed2 .Y);
                    Context.stroke();
                     Context.beginPath();
                    Context.moveTo(Element.X,Element.Y);
                    Context.lineTo(Seed2.X,Seed2 .Y);
                    Context.stroke();
                }
            }
        }
