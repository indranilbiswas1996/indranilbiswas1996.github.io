/*Master variable*/
var width;
var height;
var paddingx;
var paddingy;
var x_division_no;//"" means Number of data
var y_division_no;//"" means Number of data

var data;
var instruction;
var path_details;
var paper = null;
var elems = {};
var max = 0;
var popup_point_x = [];
var popup_point_y = [];

/*Sub variable*/
var circle_redius = 0;
var circle_redius_zoom = 0;
var line_area_stroke = 0;
var round_area_stroke = 0;
var line_path_stroke = 0;
var round_path_stroke = 0;

/*Function Flag*/
var main_title_flag = 0;
var x_axis_title_flag = 0;
var y_axis_title_flag = 0;
var axis_flag = 0;
var x_axis_flag = 0;
var x_axis_label_flag = 0;
var y_axis_flag = 0;
var y_axis_label_flag = 0;
var draw_line_path_flag = 0;
var draw_round_path_flag = 0;
var draw_circle_flag = 0;
var draw_line_area_flag = 0;
var draw_round_area_flag = 0;
var x_axis_hover_design_flag = 0;
var y_axis_hover_design_flag = 0;

//Load instruction
function load_all_data(data,  instruction, path_details){//data_min_point = 1st array index & data_min_point = last array index
	this.data = data;
	
	this.instruction = instruction;
	this.path_details = path_details;
	//Default paper width, height
	//Max width : 950, Max-height : 510
	//Min width : 780,  Min-height : 400
	//Max padding : 40
	//Min padding : 25
	width = parseInt(instruction.width) > 950 ? 950 : parseInt(instruction.width) < 780 ? 780 : parseInt(instruction.width) || 950;
	height = parseInt(instruction.height) > 510 ? 510 : parseInt(instruction.height) < 420 ? 420 : parseInt(instruction.height) || 510;
	paddingx = parseInt(instruction.paddingx) > 40 ? 40 : parseInt(instruction.paddingx) < 25 ? 25 : parseInt(instruction.paddingx) || 40;
	paddingy = parseInt(instruction.paddingy) > 40 ? 40 : parseInt(instruction.paddingy) < 25 ? 25 : parseInt(instruction.paddingy) || 40;
	//x_division_no = parseInt(instruction.x_division_no) > (data.length/2) ? parseInt(instruction.x_division_no) == data.length ? data.length : (data.length/2) : instruction.x_division_no || data.length;
	x_division_no = parseInt(instruction.x_division_no) > data.length ? (data.length > 18 ? 18 : data.length) : (parseInt(instruction.x_division_no) > 18 ? 18 : parseInt(instruction.x_division_no)) || (data.length > 18 ? 18 : data.length );
	y_division_no = parseInt(instruction.y_division_no) || data.length;
	//max for division of y axis
	max = 0;
	for(var i = 0; i<data.length; i++){
		if((Math.max(...(Object.values(data[i].value))))>max){
			max = Math.max(...(Object.values(data[i].value)));
		}
	}
	max = ((Math.ceil(max/(y_division_no-1)))*(y_division_no-1))+(10*(y_division_no-1));
}
//Paper set
function create_paper(){	
	paper = new Raphael(document.getElementById("cntnr1"), width, height);	
}
//All title
function main_title(){
	//alert(data.length);
	paper.text((2*paddingx), paddingy, instruction.title).attr({
		'font-weight' : 'bold',
		'text-anchor': 'start',
		'font-size' : '15px',
	});
	var x = (2*paddingx);
	for(var i = 0; i < path_details.length; i++){
		x += (7*path_details[(path_details.length-1)-i].name.length);
		paper.text(width - x, paddingy, path_details[(path_details.length-1)-i].name).attr({
		'font-weight' : 'bold',
		'text-anchor': 'start',
		'font-size' : '13px',
		fill : path_details[(path_details.length-1)-i].color,
		});
		paper.circle(width- x - (.3*paddingx) , paddingy, 5).attr({
			fill : path_details[(path_details.length-1)-i].color,
			stroke : path_details[(path_details.length-1)-i].color,
		});
		x += .75*paddingx;
	}
	main_title_flag = 1;
}
//x axis title
function x_axis_title(){
	paper.text(width/2, height-paddingy, instruction.x_axis_name);
	x_axis_title_flag = 1;
}
//y axis title
function y_axis_title(){
	paper.text(paddingx, height/2, instruction.y_axis_name).attr({
		transform : "r270",
	});
	y_axis_title_flag = 1;
}
//Draw axis
function axis(){
	paper.path("M " + (2*paddingx) + " " + (2*paddingy) +" l  0 " + (height-(4*paddingy)) + "l "+ (width - (4*paddingx)) + " 0").attr({
		stroke : instruction.axis_color || "#9d9d9d",
	});
	axis_flag = 1;
}

/* x */
function x_axis(){
	var j = 0;
	for(var i = 0; j< data.length; i++){	
		paper.path("M " + ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j) + " "+ (height - (2*paddingy)) + " l 0 " + (-(height-(4*paddingy))) ).attr({
			stroke : "#ececec",
			opacity : .8,
		});
		j = j + (Math.ceil(data.length/(x_division_no)));
	}
	x_axis_flag = 1;
}
/* x axis label */
function x_axis_label(){
	var j = 0;		
	for(var i = 0; j< data.length; i++){		
		paper.path( "M " + ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j) + " "+ (height - (2*paddingy)) + " l 0 3" ).attr({
			stroke : instruction.axis_color || "#9d9d9d",
		});
		if(data.length>15){
			paper.text(((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j) , (height - (1.5*paddingy)), data[j].month).attr({
				fill : instruction.axis_color || "#9d9d9d",
				transform : "r325",
			});
		}else{
			paper.text(((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j) , (height - (1.5*paddingy)), data[j].month).attr({
				fill : instruction.axis_color || "#9d9d9d",
			});
		}
		j = j + (Math.ceil(data.length/(x_division_no)));		
	}
	x_axis_label_flag = 1;
}

/* y */
function y_axis(){
				
	for(var i = 0 ; i<y_division_no ; i++){		
		paper.path( "M "+ 2*paddingx +" " + ( (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i ) + " l "+  (width-(4*paddingx)) +" 0").attr({
			stroke : "#ececec",
			opacity : .8,
		});
	}
	y_axis_flag = 1;
}
/* y axis label */
function y_axis_label(){
	for(var i = 0 ; i<y_division_no ; i++){
		paper.path( "M "+ 2*paddingx +" " + ( (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i ) + " l -3 0").attr({
			stroke : instruction.axis_color || "#9d9d9d",
		});
		paper.text(2*paddingx - 5, (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i, (max/(y_division_no-1))*i).attr({
			fill : instruction.axis_color || "#9d9d9d",
			'text-anchor' : "end",
		});		
	}
	y_axis_label_flag = 1;
}
//Draw path
function draw_line_path(stroke_width){
	line_path_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*0)/max + "";
		}
		var path1 = paper.path(p).attr({
			'stroke-width' : stroke_width,
			stroke : path_details[i].color,
			opacity : .6,
		});
		elems['path'+i] = path1;
	}
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i]))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
		}
		elems['path'+i].animate({
			path : p,
		}, 400 + (150*i), "<>" );
	}
	draw_line_path_flag = 1;
}
//Draw round path
function draw_round_path(stroke_width){
	round_path_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((0)*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0)*((height-(4*paddingy))/max))) + " ";
		}
		var path1 = paper.path(p).attr({
			'stroke-width' : stroke_width,
			stroke : path_details[i].color,
			opacity : .6,
		});
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((Object.values(data[0].value)[i])*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((Object.values(data[j].value)[i])*((height-(4*paddingy))/max))) + " ";
		}
		path1.animate({
			path : p,
		}, 400 + (150*i), "<>" );
	}
	draw_round_path_flag = 1;
}
//Draw circle on path
function draw_circle(redius, redius_zoom){
	circle_redius = redius;
	circle_redius_zoom = redius_zoom;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		for(var j = 0; j < data.length ; j++){
			var circle1 = paper.circle( ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - (0*((height-(4*paddingy))/max)) ,redius).attr({
				opacity : .6,
				fill : path_details[i].color,
				stroke : path_details[i].color,
			});
			circle1.animate({
				cx : ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))),
				cy : (height - (2*paddingy)) - ((Object.values(data[j].value)[i])*((height-(4*paddingy))/max)),
				
			}, 400 + (150*i), "<>" );			
			elems["c"+i+""+j] = circle1;
		}
	}
	draw_circle_flag = 1;
}
//Draw line area
function draw_line_area(stroke_width){
	line_area_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*0)/max + "";
		}
		p += " l "+ 0 + " "+ ((height-(4*paddingy))*(0 - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
		var path1 = paper.path(p).attr({
			fill : "270-"+path_details[i].color+"-#fff",
			stroke : path_details[i].color,
			'stroke-width' : stroke_width,
			opacity : .3,
		});
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i]))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
		}
		p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
		path1.animate({
			path : p,
		}, 400 + (150*i), "<>");
	}
	draw_line_area_flag = 1;
}

//Draw round area
function draw_round_area(stroke_width){
	round_area_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((0)*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0)*((height-(4*paddingy))/max))) + " ";
		}
		p+= ", "+ ((2*paddingx)+(data.length-1)*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0)*((height-(4*paddingy))/max))) + " z";
		var path1 = paper.path(p).attr({
			'stroke-width' : stroke_width,
			stroke : path_details[i].color,
			opacity : .3,
			fill : "270-"+path_details[i].color+"-#fff",
		});
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((Object.values(data[0].value)[i])*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((Object.values(data[j].value)[i])*((height-(4*paddingy))/max))) + " ";
		}
		p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
		path1.animate({
			path : p,
		}, 400 + (150*i), "<>" );
	}
	draw_round_area_flag = 1;
}








/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// For x axis hover -----------------------------
function x_axis_hover_design(){
	for(var i=0; i<1; i++){
		var  p = "M "+ 2*paddingx +" " + 2*paddingy + " l 0 "+  (height-(4*paddingy)) +" 0";
		var path1 = paper.path(p).attr({
			stroke : 'blue',
			'stroke-width' : .5,
			//"stroke-dasharray": "-",
			stroke : '#949494',
			opacity : 0,
		});
		elems["px"+i] = path1;
	}
	x_axis_hover_design_flag = 1;
}
// For y axis hover -----------------------------
function y_axis_hover_design(){
	for(var i=0; i<instruction.path_no; i++){
		var  p = "M "+ 2*paddingx +" " + ( (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i ) + " l "+  (width-(4*paddingx)) +" 0";
		var path1 = paper.path(p).attr({
			stroke : 'blue',
			'stroke-width' : .5,
			//"stroke-dasharray": " - ",
			stroke : '#949494',
			opacity : 0,
		});
		elems["py"+i] = path1;
	}
	y_axis_hover_design_flag =1;
}
//Draw popup
function popup_design(){
	
	var pop_rect = paper.rect(0, 0, 100, instruction.path_no*30, 7).attr({
		fill : '#f2f4ff',
		stroke : '#90a3ff',
		opacity : 0,
	});
	elems["pop_rect"] = pop_rect;
	for(var i=0; i<instruction.path_no; i++){
		var text1 = paper.text(20, (15 + (30*i)), "").attr({
			fill : path_details[i].color,
			'font-size' : '13px',
			'text-anchor' : 'start',
			'font-weight' : 'bold',
			opacity : 0,
		});
		elems["tt"+i] = text1;
	}
	
}

//Collect max data on every point for view popup on that point
function collect_popup_point(){
	popup_point_x = [];
	popup_point_y = [];
	for(var i = 0; i < data.length; i++){
		popup_point_x.push(((2*paddingx)+i*((width-(4*paddingx))/(data.length-1))));
		popup_point_y.push((height - (2*paddingy)) - ((Math.max(...Object.values(data[i].value)))*((height-(4*paddingy))/max)));
	}
}

//*****Draw rectangle for popup
function draw_popup_rect(){
	for(var i = 0; i< data.length; i++){
		var rect = paper.rect((((2*paddingx)-(((width-(4*paddingx))/(data.length-1))/2))+i*((width-(4*paddingx))/(data.length-1))),2*paddingy,((width-(4*paddingx))/(data.length-1)),(height - (4*paddingy)));
		rect.attr({
			fill : "transparent",
			opacity : 0,
		});
		rect.node.id = "r"+i;
		rect.node.addEventListener('mouseover', popup);
		rect.node.addEventListener('mouseout', popdown);
		rect.node.addEventListener('mouseup', mouseup);
		rect.node.addEventListener('mousemove', mousemove);
		rect.node.addEventListener('mousedown', mousedown);
	}
}


//////////////////////////////////////////////////PopUp////////////////////////////////////////////////////
function popup(){
	var id = parseInt(this.id.replace('r',''));
	if(draw_circle_flag == 1){
		circle_popup(id);
	}
	if(x_axis_hover_design_flag == 1){
		x_axis_hover(id);
	}
	if(y_axis_hover_design_flag == 1){
		y_axis_hover(id);
	}
	if(id<data.length/2){
		if(Math.max(...(Object.values(data[id].value)))>(max/2)){
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] ,
				y : popup_point_y[id],
			},150);
			//for text change
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].attr({
					text : path_details[i].name+" : "+Object.values(data[id].value)[i],
				});
			}
			//for text animation
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].animate({
					opacity : 1,
					x : popup_point_x[id] + 20,
					y : popup_point_y[id] + (15 + (30*i)),
				}, 150);
			}
		}else{
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] ,
				y : popup_point_y[id] - (instruction.path_no*30),
			},150);
			//for text change
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].attr({
					text : path_details[i].name+" : "+Object.values(data[id].value)[i],
				});
			}
			//for text animation
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].animate({
					opacity : 1,
					x : popup_point_x[id] + 20,
					y : popup_point_y[id] + (15 + (30*i)) - (instruction.path_no*30),
				}, 150);
			}
		}
	}else{
		if(Math.max(...(Object.values(data[id].value)))>(max/2)){
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] - 100,
				y : popup_point_y[id],
			},150);
			//for text change
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].attr({
					text : path_details[i].name+" : "+Object.values(data[id].value)[i],
				});
			}
			//for text animation
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].animate({
					opacity : 1,
					x : popup_point_x[id] + 20 - 100,
					y : popup_point_y[id] + (15 + (30*i)),
				}, 150);
			}
		}else{
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] - 100,
				y : popup_point_y[id] - (instruction.path_no*30),
			},150);
			//for text change
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].attr({
					text : path_details[i].name+" : "+Object.values(data[id].value)[i],
				});
			}
			//for text animation
			for(var i = 0; i<parseInt(instruction.path_no); i++){
				elems["tt"+i].animate({
					opacity : 1,
					x : popup_point_x[id] + 20 - 100,
					y : popup_point_y[id] + (15 + (30*i)) - (instruction.path_no*30),
				}, 150);
			}
		}
	}
}
function popdown(){
	var id = parseInt(this.id.replace('r',''));
	if(draw_circle_flag == 1){
		circle_popdown(id);
	}
	if(x_axis_hover_design_flag == 1){
		x_axis_hover_out(id);
	}
	if(y_axis_hover_design_flag == 1){
		y_axis_hover_out(id);
	}
	//for rect
	elems["pop_rect"].animate({
		opacity : 0,
	}, 150);
	//for text
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		elems["tt"+i].animate({
			opacity : 0,
		}, 150);
	}
}

//Circle effect on popup
function circle_popup(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		elems["c"+i+""+id].animate({
			opacity : 1,
			r : circle_redius_zoom,
		},25);
	}
}
//Circle effect on popdown
function circle_popdown(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		elems["c"+i+""+id].animate({
			//opacity : 0,
			r : circle_redius,
		},25);
	}
}
//X axis hover
function x_axis_hover(id){
	for(var i = 0; i<1; i++){
		var  p  = "M "+ ((2*paddingx)+id*((width-(4*paddingx))/(data.length-1))) +" " + (2*paddingy) + " l 0 "+  ( (height - (4*paddingy)) ) ;
		elems["px"+i].animate({
			opacity : 1,
			path : p,
		}, 150);
	}
}
//Y axis hover
function y_axis_hover(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		var  p  = "M "+ 2*paddingx +" " + ( (height - (2*paddingy)) - ((Object.values(data[id].value)[i])*((height-(4*paddingy))/max)) ) + " l "+  (width-(4*paddingx)) +" 0";
		elems["py"+i].animate({
			opacity : 1,
			path : p,
		}, 150);
	}
}
//X axis hover out
function x_axis_hover_out(id){
	for(var i = 0; i<1; i++){
		elems["px"+i].animate({
			opacity : 0,
		}, 150);
	}
}
//Y axis hover out
function y_axis_hover_out(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		elems["py"+i].animate({
			opacity : 0,
		}, 150);
	}
}

//////////////////////////////////////////////////SELECT AREA//////////////////////////////////////////////////////
//Draw select area
function select_area(){
	var rect1 = paper.rect(((2*paddingx)), 2*paddingy , 0, (height-(4*paddingy))).attr({
		opacity : 0,
	});
	elems['zoom_rect'] = rect1;
}
var clicked_position = 0;
var val1 = 0;
var clicked_id = 0, unclicked_id = 0;

function mousedown(e){
	var id = parseInt(this.id.replace('r',''));
	clicked_id = id;
	elems['zoom_rect'].attr({
		x : ((2*paddingx)+id*((width-(4*paddingx))/(data.length-1))),
		y :  2*paddingy,
		'stroke-width' : 2,
		stroke : '#00376e',
		fill : '#0068d0',
		opacity : .1,
		width : 0,
	});
	
	clicked_position = e.clientX;
	val1 = ((2*paddingx)+id*((width-(4*paddingx))/(data.length-1)));
	
}
function mousemove(e){
	//console.log(clicked_position+" "+ e.clientX + " : "+ (e.clientX - clicked_position) + " : "+ (clicked_position - e.clientX));
	try{
		if(e.clientX  >= clicked_position){
			elems['zoom_rect'].attr({
				width : e.clientX - clicked_position,
			});
		}else{		
			elems['zoom_rect'].attr({
				x : val1 - (clicked_position - e.clientX),
				width : (clicked_position - e.clientX),
			});	
		}
	}catch(err){
		//console.log(err);
	}
}
function mouseup(){
	var id = parseInt(this.id.replace('r',''));	
	unclicked_id = id;
	//console.log(clicked_id + "  :  "+ unclicked_id );
	elems['zoom_rect'].attr({
		opacity : 0,
	});
	if(clicked_id>unclicked_id){
		var a = clicked_id;
		clicked_id = unclicked_id;
		unclicked_id = a;
	}
	if(clicked_id != unclicked_id && unclicked_id > (clicked_id + 1)){
			
		paper.clear();
		//Load instruction
		load_all_data(data.slice(clicked_id, unclicked_id+1), instruction, path_details);
		
		if(main_title_flag == 1){
			main_title();
		}	
		if(axis_flag == 1){
			axis();
		}
		if(x_axis_flag == 1){
			x_axis();
		}
		if(x_axis_title_flag == 1){
			x_axis_title();
		}
		if(x_axis_label_flag == 1){
			x_axis_label();
		}
		if(y_axis_flag == 1){
			y_axis();
		}
		if(y_axis_title_flag == 1){
			y_axis_title();
		}
		if(y_axis_label_flag == 1){
			y_axis_label();
		}
		if(draw_line_area_flag == 1){
			draw_line_area(line_area_stroke);//Pass stroke width value
		}
		if(draw_round_area_flag == 1){
			draw_round_area(round_area_stroke);//Pass stroke width value
		}
		if(draw_line_path_flag == 1){
			draw_line_path(line_path_stroke);
		}
		if(draw_round_path_flag == 1){
			draw_round_path(round_path_stroke);
		}
		
		//Draw circle
		if(draw_circle_flag == 1){
			draw_circle(circle_redius, circle_redius_zoom);//Pass redius value
		}
						
		
		
		//////////////////////            POPUP            //////////////////////
		
		//Collect max data on every point for view popup on that point
		collect_popup_point();
		if(x_axis_hover_design_flag == 1){
			x_axis_hover_design();
		}
		if(y_axis_hover_design_flag == 1){
			y_axis_hover_design();
		}
		
		//Draw popup
		popup_design();
		
		//Draw select area
		select_area();
		
		
		//*****Draw rectangle for popup
		draw_popup_rect();
	}
}
