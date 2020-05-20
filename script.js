function click(dane,tex){
	
				//d3.selectAll("#"+tex).style("fill",styl*kolorBazowy);
				for(let i=0; i<dane.length; i++){
					if(tex!=dane[i].planeta){
					d3.selectAll("#usun1" +i)
						.style('fill',dane[i].planeta*color)
						.transition()
						.duration(1000)
						.style("fill", "#"+333);
					}
				}

}
function offcilick(dane,tex){
	console.log("da")
	for(let i=0; i<dane.length; i++){
		if(tex!=dane[i].planeta){
			d3.selectAll("#usun1" +i)
				.style('fill',"#"+333)
				.transition()
				.duration(1000)
				.style("fill", "#"+dane[i].planeta*color);		
		}
	}
}
function img(tab, a, t){
			var x = 1400;
			var y = 10;
			if(!t){
				x= 30;
				y = 10;
			}
			d3.select("svg")
			.append("image")
			.attr("id","etykieta")
			.attr("xlink:href", "img/"+tab.id+a+".jpg")
                .attr("x", x)
                .attr("y", y)
                .attr("width", "250")
                .attr("height", "250");
}
function etykieta(tab,x,y){

		if((x+150)>1550)
			x-=270;
		d3.select("svg")
		.append("rect")
		.attr("id","etykieta")
		.attr("height", 130)
		.attr("width", 270)
		.attr("x", 10+x)
		.attr("y", 10+y)
		.style("fill",222);
		
		tex("Nazwa: " +tab.nazwa,1);
		tex("Srednia odl.: "+tab.sr_odleglosc+"tys. km",2);
		tex("Srednica: "+tab.srednica+"km",3);
		tex("Czas obiegu: "+tab.czas_obiegu+"h",4);
		tex("Odkrywca: "+tab.Odkrywca,5);
		tex("Rok odkrycia: "+tab.rok_odkrycia,6);
		tex("Nr. planety: "+tab.planeta,7);
		function tex(n, n1){
			d3.select("svg")//godziny na osi
			.append("text")
			.attr("id","etykieta")
			.attr("font-family", "Comic Sans MS")
			.attr("x", 15+x)
			.attr("y", 10+y+n1 * 17)
			.attr("fill", "darkorange")
			.attr("font-size", 17)
			.text(n);
	}
	var t = true;
	if ((x>1100) && (y < 300))
		t=false;
		console.log(t);
		console.log("x="+x);
		console.log("y="+y);
	img(tab,"k",t);
	}
function etykietaP(tab,x,y){
	if(x+200>1550)
		x-=200;
	
	
		d3.select("svg")
		.append("rect")
		.attr("id","etykieta")
		.attr("height", 75)
		.attr("width", 175)
		.attr("x", 10+x)
		.attr("y", y-10)
		.style("fill",222);
		
		tex("Id: " +tab.id,1);
		tex("Nazwa P.: "+tab.nazwaP,2);
		tex("Promien: "+tab.promienP,3);
		function tex(n, n1){
			d3.select("svg")//godziny na osi
			.append("text")
			.attr("id","etykieta")
			.attr("font-family", "Comic Sans MS")
			.attr("x", 15+x)
			.attr("y", y+n1 * 20-10)
			.attr("fill", "darkorange")
			.attr("font-size", 20)
			.text(n);
	}
	img(tab,"p",true);
	}

var odlY = 35;
var odlX = 35;

var n=66;//srednica
	var nn = 66;
	var color = 142;
function pierwsza(){
	d3.csv("http://127.0.0.1:8887/k.csv",).then(function(tab) {
	d3.csv("http://127.0.0.1:8887/p.csv",).then(function(planety) {
		test(tab,planety);
	var svg = d3.select("svg"),
    margin = {right: 1000, left: 35},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height");

var x = d3.scaleLinear()
    .domain([0, 28])
    .range([0, 1550])
    .clamp(true);
var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");
	
slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
	.attr("y1", 600)
	.attr("y2", 600)
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { hue(x.invert(d3.event.x)); }));
	
slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
  .data(x.ticks(10))
  .enter().append("text")
    .attr("x", x)
	.attr("y", 600)
    .attr("text-anchor", "middle");

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
	.attr("cy", 600)
    .attr("r", 9);

slider.transition()
    .duration(750)
    .tween("hue", function() {
      var i = d3.interpolate(0, 28);
      return function(t) { hue(i(t)); };
    });

function hue(h) {
  handle.attr("cx", x(h));
  //svg.selectAll("text").remove();
	if(h>0)
	ksiezyce(h,tab);
}

	
});
  });	
	
}
function ksiezyce(h,tab){
	var n1 = 1550/h;
	d3.selectAll("#usun").remove();
	for(let i=0; i<tab.length; i++)
		d3.selectAll("#usun1"+i).remove();
	d3.selectAll("#etykieta").remove();
	for(let i=0; i<tab.length; i++){
		var cx = odlX+tab[i].czas_obiegu*n1;
		var cy = 595-(tab[i].sr_odleglosc/(2000/550));
		d3.select("svg")//ksiezyce
			.append("circle")
			.attr("id","usun1" + i)
			.attr("r", 4 + 0.5*tab[i].srednica/nn)//srednica
			.attr("cx", cx)//obieg
			.attr("cy", cy)//odleglosc
			.style("fill",tab[i].planeta*color)
			.on('mouseover',function() {
				etykieta(tab[i],odlX+tab[i].czas_obiegu*n1,595-(tab[i].sr_odleglosc/(2000/580)));})
			.on('mouseout',function () {
				d3.selectAll("#etykieta").remove();})
	
	
	}
	for(let i=0; i<=parseInt(h); i++){
	  if(i<parseInt(h))
			n = i;
		else
			n = i + "h";
		d3.select("svg")//godziny na osi
			.append("text")
			.attr("font-family", "Comic Sans MS")
			.attr("id","usun")
			.attr("x", odlX-7+i*n1)
			.attr("y", 623)
			.attr("fill", "darkorange")
			.attr("font-size", 20)
			.text(n);
	}
}
function test(tab,planety){
	for(let i=0; i<planety.length; i++){//planety
		d3.select("svg")//Planety
			.append("circle")
			.attr("r", Math.sqrt(planety[i].promienP)/15)//srednica
			.attr("cx", odlX*2)//x
			.attr("cy", 640+(i*30))//y
			.style("fill",planety[i].id*color)
			.on('mouseover',function() {
				etykietaP(planety[i],odlX*2,640+(i*30));
				click(tab,planety[i].id);})
			.on('mouseout',function () {
				offcilick(tab,planety[i].id);
				d3.selectAll("#etykieta").remove();})
			
		d3.select("svg")//tekst
			.append("text")
			.attr("font-family", "Comic Sans MS")
			.attr("x", odlX*2 + 15)
			.attr("y", 647+(i*30))
			.attr("fill", "darkorange")
			.attr("font-size", 20)
			.text(planety[i].nazwaP);
	}
	
	for(let i=-1; i<21; i++){
		if(i>=0)
			n = (2000 - i* 100)/1000;
		else
			n = "mil.km";
		d3.select("svg")//odleglosc na osi
			.append("text")
			.attr("font-family", "Comic Sans MS")
			.attr("x", 0)
			.attr("y", odlY+10+i*28)
			.attr("fill", "darkorange")
			.attr("font-size", 20)
			.text(n);
	}	
	function linie(x1,y1,x2,y2){
	d3.select("svg")//os
		.append("line")
		.attr("x1", x1)
		.attr("y1", y1)
		.attr("x2", x2)
		.attr("y2", y2)
		.style("stroke", 222)
		.style("stroke-width", "3px");
	}
	linie(odlX,odlY,odlX,600);
	//linie(odlX,600,1200,600);
	d3.select("svg")
		.append("rect")
		.attr("height", 50)
		.attr("width", 320)
		.attr("x", 900)
		.attr("y", 650)
		.style("fill",222)
		 .on("click", mouseClick);
		 function mouseClick() {
			 d3.selectAll("circle").remove();
			 d3.selectAll("line").remove();
			 d3.selectAll("text").remove();
			 d3.selectAll("rect").remove();
			test2(tab,planety);
		}
		d3.select("svg")//godziny na osi
			.append("text")
			.attr("x", 920)
			.attr("font-family", "Comic Sans MS")
			.attr("y", 680)
			.attr("fill", "darkorange")
			.attr("font-size", 20)
			.text("Przejdz do widoku orbitalnego")
					 .on("click", mouseClick);
		 function mouseClick() {
			 d3.selectAll("circle").remove();
			 d3.selectAll("line").remove();
			 d3.selectAll("text").remove();
			 d3.selectAll("rect").remove();
			test2(tab,planety);
		}
	
	}
function test2(tab,planety){
var odlY = 35;
var odlX = 35;

var odlYs = 0;//y srodka
var odlYa = 240;//y aktorow
var odlYf = 140;//y filmow

var odlXs = 0;//x srodka
var odlXa = 240;//x aktorow
var odlXf = 140;//x filmow

var nn =10;

var xx =0;
var color = 142;
'use strict';
var width = 900;
var height = 400;
var t0 = Date.now();
var svg = d3.select('svg');
	//
	
	var planets = [
  { R: 150, r: 5, speed: 5, phi0: 90 }
];
	var x = 124;
	var x1 = 6;//na ile podzielic kolo
	var i = 1;//ktora to czesc
	/*d3.select("svg")//slonce
			.append("circle")
			.attr("r", 120)//srednica
			.attr("cx", odlXs)//obieg
			.attr("cy", odlYs)//odleglosc
			.style("fill",990);*/
		d3.select("svg")
			.append("image")
			.attr("id","ss")
        .attr("xlink:href", "img/ss.jpg")
                .attr("x", "-150")
                .attr("y", "-150")
                .attr("width", "400")
                .attr("height", "400");	
			
	for(let i=0; i<planety.length; i++){
		odlXs = 80 +(i+1) *240;
		odlYs = 50 + (i+1) * 60;
		d3.select("svg")//Planety
			.append("circle")
			.attr("r", 5+Math.sqrt(planety[i].promienP)/15)//srednica
			.attr("cx", odlXs)//x
			.attr("cy", odlYs)
			.style("fill",planety[i].id*color)
			.on('mouseover',function() {
				etykietaP(planety[i],80 +(i+1) *240,50+ (i+1) * 60);})
			.on('mouseout',function () {
				d3.selectAll("#etykieta").remove();})
				
		for(let j=0; j<tab.length; j++){
			if(tab[j].planeta == planety[i].id){
			 planets = [
  { R: (10+Math.sqrt(tab[j].sr_odleglosc)*3), r: (4 + Math.sqrt(tab[j].srednica)/10), speed: (5/tab[j].czas_obiegu), phi0: 90 }
];

var container = svg.append('g')
  .attr('transform', 'translate(' + odlXs + ',' + odlYs + ')');

container.selectAll('g.planet')
  .data(planets)
  .enter().append('g')
  .attr('class', 'planet')
  .each(function (d, i) {
    d3.select(this).append('circle')
      .attr('r', d.r)
      .attr('cx', d.R)
      .attr('cy', 0)
      .attr('class', 'planet')
	  .style("fill",tab[j].planeta*color + 111)
	  .on('mouseover',function() {
				etykieta(tab[j],1100,0);})
			.on('mouseout',function () {
				d3.selectAll("#etykieta").remove();})
  });

d3.timer(function () {
  var delta = Date.now() - t0;

  svg.selectAll('.planet')
    .attr('transform', function (d) {
    return 'rotate(' + d.phi0 + delta * d.speed / 200 + ')';
  });
});

			}
		}	
	}	
	d3.select("svg")
		.append("rect")
		.attr("height", 50)
		.attr("width", 300)
		.attr("x", 900)
		.attr("y", 650)
		.style("fill",222)
		 .on("click", mouseClick);
		 function mouseClick() {
			 d3.selectAll("circle").remove();
			 d3.selectAll("line").remove();
			 d3.selectAll("text").remove();
			 d3.selectAll("rect").remove();
			 d3.selectAll("#ss").remove();
				pierwsza();
		}
		d3.select("svg")//godziny na osi
			.append("text")
			.attr("font-family", "Comic Sans MS")
			.attr("x", 920)
			.attr("y", 680)
			.attr("fill", "darkorange")
			.attr("font-size", 20)
			.text("Przejdz do widoku wykresu")
			.on("click", mouseClick);
		 function mouseClick() {
			 d3.selectAll("circle").remove();
			 d3.selectAll("line").remove();
			 d3.selectAll("text").remove();
			 d3.selectAll("rect").remove();
			 d3.selectAll("#ss").remove();
				pierwsza();
		}
}