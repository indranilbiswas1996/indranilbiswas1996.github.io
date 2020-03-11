/*Master variable*/
var width;
var height;
var paddingx;
var paddingy;
var x_division_no;//"" means Number of data
var y_division_no;//"" means Number of data

var data;
var main_data;
var instruction;
var path_details;
var paper = null;
var elems = {};
var max = 0;
var max_value = 0;
var min_value = 0;
var popup_point_x = [];
var popup_point_y = [];
var max_point_value = 0;
var min_point_value = 0;

/*Sub variable*/
var circle_radius = 0;
var circle_radius_zoom = 0;
var line_area_stroke = 0;
var round_area_stroke = 0;
var line_path_stroke = 0;
var round_path_stroke = 0;
var stepline_path_stroke = 0;
var stepline_area_stroke = 0;

/*Function Flag*/
/*var main_title_flag = 0;
var x_axis_title_flag = 0;
var y_axis_title_flag = 0;
var x_axis_flag = 0;
var y_axis_flag = 0;
var x_axis_division_flag = 0;
var x_axis_label_flag = 0;
var y_axis_division_flag = 0;
var y_axis_label_flag = 0;
var draw_line_path_flag = 0;
var draw_round_path_flag = 0;
var draw_stepline_path_flag = 0;
var draw_stepline_area_flag = 0;
var draw_circle_flag = 0;
var draw_line_area_flag = 0;
var draw_round_area_flag = 0;
var label_flag = 0;
var popup_design_flag = 0;
var x_axis_hover_design_flag = 0;
var y_axis_hover_design_flag = 0;
var popup_footer_design_flag = 0;*/

var flag = 0;
function check(data, instruction, path_details){
	if(data.length > 2){
		if(parseInt(instruction.path_no)==path_details.length){
			for(var i = 0 ; i<data.length; i++){
				if(Object.keys(data[i].value).length == path_details.length){
					flag = 1;
				}else{
					flag = 0;
				}
			}
			if(flag == 0){
				alert("Check the data values");
			}
		}else{
			alert("Check the path no and path details");
		}
	}else{
		alert("Give atleast 3 data");
	}
}
var main_data_flag = 0;
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
	y_division_no = parseInt(instruction.y_division_no) > 12 ? 12 : (parseInt(instruction.y_division_no) < 2 ? 2 : parseInt(instruction.y_division_no) ) || 12;
	//max for division of y axis
	max_value = Math.max(...(Object.values(data[0].value)));
	for(var i = 0; i<data.length; i++){
		if((Math.max(...(Object.values(data[i].value))))>max_value){
			max_value = Math.max(...(Object.values(data[i].value)));
		}
	}
	min_value = 0;
	for(var i = 0; i<data.length; i++){
		if((Math.min(...(Object.values(data[i].value))))< min_value){
			min_value = Math.min(...(Object.values(data[i].value)));
		}
	}
	min_value = min_value + (Math.ceil((min_value)/(y_division_no-1)));
	//max = ((Math.ceil(max_value/(y_division_no-1)))*(y_division_no-1))+(1*(y_division_no-1));
	max = ((Math.ceil((max_value-min_value)/(y_division_no-1)))*(y_division_no-1))+(1*(y_division_no-1));
	
	//For main value
	if(main_data_flag == 0){
		main_data = data;
		//Max point
		max_point_value = Math.max(...(Object.values(main_data[0].value)));
		for(var i = 0; i<main_data.length; i++){
			if((Math.max(...(Object.values(main_data[i].value))))>max_point_value){
				max_point_value = Math.max(...(Object.values(main_data[i].value)));
			}
		}
		//Min point value
		min_point_value = Math.min(...(Object.values(data[0].value)));
		for(var i = 0; i<data.length; i++){
			if((Math.min(...(Object.values(data[i].value))))< min_point_value){
				min_point_value = Math.min(...(Object.values(data[i].value)));
			}
		}
	}
	main_data_flag = 1;
}
//Paper set
function create_paper(){	
	paper = new Raphael(document.getElementById("cntnr1"), width, height);	
}

//All title
var main_title_flag = 0;
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
var x_axis_title_flag = 0;
function x_axis_title(){
	paper.text(width/2, height-paddingy, instruction.x_axis_name);
	x_axis_title_flag = 1;
}

//y axis title
var y_axis_title_flag = 0;
function y_axis_title(){
	paper.text(paddingx, height/2, instruction.y_axis_name).attr({
		transform : "r270",
	});
	y_axis_title_flag = 1;
}

//Draw x axis
var x_axis_flag = 0;
function x_axis(){
	paper.path("M " + (2*paddingx) + " " + ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0 - min_value))/max) + "l "+ (width - (4*paddingx)) + " 0").attr({
		stroke : instruction.axis_color || "#9d9d9d",
	});
	x_axis_flag = 1;
}

//Draw y axis
var y_axis_flag = 0;
function y_axis(){
	paper.path("M " + (2*paddingx) + " " + (2*paddingy) +" l  0 " + (height-(4*paddingy)) ).attr({
		stroke : instruction.axis_color || "#9d9d9d",
	});
	y_axis_flag = 1;
}

/* x */
/* x axis division */
var x_axis_division_flag = 0;
function x_axis_division(){
	var j = 0;
	for(var i = 0; j< data.length; i++){	
		paper.path("M " + ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j) + " "+ (height - (2*paddingy)) + " l 0 " + (-(height-(4*paddingy))) ).attr({
			stroke : "#ececec",
			opacity : .8,
		});
		j = j + (Math.ceil(data.length/(x_division_no)));
	}
	x_axis_division_flag = 1;
}
/* x axis label */
var x_axis_label_flag = 0;
function x_axis_label(){
	var j = 0;		
	for(var i = 0; j< data.length; i++){		
		paper.path( "M " + ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j) + " "+ (height - (2*paddingy)) + " l 0 3" ).attr({
			stroke : instruction.axis_color || "#9d9d9d",
		});
		if(x_division_no>15){
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
var y_axis_division_flag = 0;
function y_axis_division(){
				
	for(var i = 0 ; i<y_division_no ; i++){		
		paper.path( "M "+ 2*paddingx +" " + ( (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i ) + " l "+  (width-(4*paddingx)) +" 0").attr({
			stroke : "#ececec",
			opacity : .8,
		});
	}
	y_axis_division_flag = 1;
}
/* y axis label */
var y_axis_label_flag = 0;
function y_axis_label(){
	for(var i = 0 ; i<y_division_no ; i++){
		paper.path( "M "+ 2*paddingx +" " + ( (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i ) + " l -3 0").attr({
			stroke : instruction.axis_color || "#9d9d9d",
		});
		paper.text(2*paddingx - 5, (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i, ((max/(y_division_no-1))*i)+min_value).attr({
			fill : instruction.axis_color || "#9d9d9d",
			'text-anchor' : "end",
		});		
	}
	y_axis_label_flag = 1;
}
//Draw path
var draw_line_path_flag = 0;
function draw_line_path(stroke_width){
	line_path_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0 - min_value))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*0)/max + "";
		}
		var path1 = paper.path(p).attr({
			'stroke-width' : stroke_width,
			stroke : path_details[i].color,
			opacity : 1,
		});
		elems['path'+i] = path1;
	}
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i] - min_value))/max) + " ";
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
var draw_round_path_flag = 0;
function draw_round_path(stroke_width){
	round_path_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((0   - min_value)*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0 - min_value)*((height-(4*paddingy))/max))) + " ";
		}
		var path1 = paper.path(p).attr({
			'stroke-width' : stroke_width,
			stroke : path_details[i].color,
			opacity : 1,
		});
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((Object.values(data[0].value)[i]   - min_value)*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((Object.values(data[j].value)[i]  - min_value)*((height-(4*paddingy))/max))) + " ";
		}
		path1.animate({
			path : p,
		}, 400 + (150*i), "<>" );
	}
	draw_round_path_flag = 1;
}

//Draw stepline path
var draw_stepline_path_flag = 0;
function draw_stepline_path(stroke_width){
	stepline_path_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0  - min_value))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
			p += " l "+ 0 + " "+ ((height-(4*paddingy))*0)/max + "";
		}
		var path1 = paper.path(p).attr({
			'stroke-width' : stroke_width,
			stroke : path_details[i].color,
			opacity : 1,
		});
		elems['path'+i] = path1;
	}
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i]  - min_value))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
			p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
		}
		elems['path'+i].animate({
			path : p,
		}, 400 + (150*i), "backOut" );
	}
	draw_stepline_path_flag = 1;
}
//Draw circle on path
var draw_circle_flag = 0;
function draw_circle(radius, radius_zoom){
	circle_radius = radius;
	circle_radius_zoom = radius_zoom;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		for(var j = 0; j < data.length ; j++){
			var circle1 = paper.circle( ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max)) ,radius).attr({
				opacity : 1,
				fill : path_details[i].color,
				stroke : path_details[i].color,
			});
			circle1.animate({
				cx : ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))),
				cy : (height - (2*paddingy)) - ((Object.values(data[j].value)[i] - min_value)*((height-(4*paddingy))/max)),
				
			}, 400 + (150*i), "<>" );			
			elems["c"+i+""+j] = circle1;
		}
	}
	draw_circle_flag = 1;
}
//Draw line area
var draw_line_area_flag = 0;
function draw_line_area(stroke_width){
	line_area_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0 - min_value))/max) + " ";
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
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i] - min_value))/max) + " ";
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
var draw_round_area_flag = 0;
function draw_round_area(stroke_width){
	round_area_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max))) + " ";
		}
		p+= ", "+ ((2*paddingx)+(data.length-1)*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max))) + " z";
		var path1 = paper.path(p).attr({
			'stroke-width' : stroke_width,
			stroke : path_details[i].color,
			opacity : .3,
			fill : "270-"+path_details[i].color+"-#fff",
		});
		p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((Object.values(data[0].value)[i]  - min_value)*((height-(4*paddingy))/max))) + " R ";
		for(var j = 1; j < data.length ; j++){
			p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((Object.values(data[j].value)[i]  - min_value)*((height-(4*paddingy))/max))) + " ";
		}
		p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
		path1.animate({
			path : p,
		}, 400 + (150*i), "<>" );
	}
	draw_round_area_flag = 1;
}

//Draw stepline area
var draw_stepline_area_flag = 0;
function draw_stepline_area(stroke_width){
	stepline_area_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0  - min_value))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
			p += " l "+ 0 + " "+ ((height-(4*paddingy))*0)/max + "";
		}
		p += " l "+ 0 + " "+ ((height-(4*paddingy))*(0 - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
		var path1 = paper.path(p).attr({
			fill : "270-"+path_details[i].color+"-#fff",
			stroke : path_details[i].color,
			'stroke-width' : stroke_width,
			opacity : .3,
		});
		p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i]  - min_value))/max) + " ";
		for(var j = 1; j < data.length ; j++){
			p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
			p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
		}
		p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
		path1.animate({
			path : p,
		}, 400 + (150*i), "backOut");
	}
	draw_stepline_area_flag = 1;
}

//Draw label on path
var label_flag = 0;
function label(){
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		var j = 0;		
		for(var k = 0; j< data.length; k++){
			var rect1 = paper.rect( ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((((Object.values(data[j].value)[i]+"").length*7) + 10)/2) ,(height - (2*paddingy))- ((0  - min_value)*((height-(4*paddingy))/max)), ((Object.values(data[j].value)[i]+"").length*7) + 10 , 16, 2).attr({
				//opacity : 0,
				fill : path_details[i].color,		
				stroke : "#fff",		
			});
			rect1.animate({
				opacity : 1,
				y : (height - (2*paddingy)) - ((Object.values(data[j].value)[i]  - min_value)*((height-(4*paddingy))/max)) - 8,
			}, 400 + (150*i), "<>" );
			
			var text1 = paper.text( ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max)) ,Object.values(data[j].value)[i]).attr({
				//opacity : 0,
				fill : "#fff",//path_details[i].color,
			});
			text1.animate({
				opacity : 1,
				x : ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))),
				y : (height - (2*paddingy)) - ((Object.values(data[j].value)[i]  - min_value)*((height-(4*paddingy))/max)),
				
			}, 400 + (150*i), "<>" );
			j = j + (Math.ceil(data.length/(x_division_no)));		
		}
	}
	label_flag = 1;
}

//Draw annotations
var draw_annotations_flag = 0;
function draw_annotations(){
	if(instruction.annotations){
		//y axis annotations
		if(instruction.annotations.yaxis){
			if(instruction.annotations.yaxis.length > 0){
				for(var i = 0; i< instruction.annotations.yaxis.length; i++){
					//Path annotations
					if(instruction.annotations.yaxis[i].y || instruction.annotations.yaxis[i].y == 0){
						if(instruction.annotations.yaxis[i].y < max_value && instruction.annotations.yaxis[i].y > min_value){
							paper.path("M "+ 2*paddingx +" " + ( (height-(2*paddingy)) - ((height-(4*paddingy))*(instruction.annotations.yaxis[i].y - min_value))/max) + " l "+  (width-(4*paddingx)) +" 0").attr({
								stroke : instruction.annotations.yaxis[i].borderColor,
							});
							if((instruction.annotations.yaxis[i].y - min_value) > max/2){
								paper.rect((2*paddingx) + (i*50+50), (( (height-(2*paddingy)) - ((height-(4*paddingy))*(instruction.annotations.yaxis[i].y - min_value))/max)), (instruction.annotations.yaxis[i].label.text.length*7)+20, 20).attr({
									fill : instruction.annotations.yaxis[i].label.style.background,
									stroke : instruction.annotations.yaxis[i].label.borderColor,
								});
								paper.text((2*paddingx) + (i*50+50) + ((instruction.annotations.yaxis[i].label.text.length*7)+20)/2, (( (height-(2*paddingy)) - ((height-(4*paddingy))*(instruction.annotations.yaxis[i].y - min_value))/max))+10, (instruction.annotations.yaxis[i].label.text)).attr({
									fill : instruction.annotations.yaxis[i].label.style.color,
								});
							}else{
								paper.rect((2*paddingx) + (i*50+50), (( (height-(2*paddingy)) - ((height-(4*paddingy))*(instruction.annotations.yaxis[i].y - min_value))/max))-20, (instruction.annotations.yaxis[i].label.text.length*7)+20, 20).attr({
									fill : instruction.annotations.yaxis[i].label.style.background,
									stroke : instruction.annotations.yaxis[i].label.borderColor,
								});
								paper.text((2*paddingx) + (i*50+50) + ((instruction.annotations.yaxis[i].label.text.length*7)+20)/2, (( (height-(2*paddingy)) - ((height-(4*paddingy))*(instruction.annotations.yaxis[i].y - min_value))/max))+10-20, (instruction.annotations.yaxis[i].label.text)).attr({
									fill : instruction.annotations.yaxis[i].label.style.color,
								});
							}
						}
					}
					//Area annotations
					if((instruction.annotations.yaxis[i].y1 && instruction.annotations.yaxis[i].y2) || (instruction.annotations.yaxis[i].y1 == 0 || instruction.annotations.yaxis[i].y2 == 0)){
						var y1 = instruction.annotations.yaxis[i].y1;
						var y2 = instruction.annotations.yaxis[i].y2;
						if(y1 > y2){
							var a = y1;
							y1 = y2;
							y2 = a;
						}
						if(y1 < min_value){
							y1=min_value;
						}
						if(y2 > (max+min_value)){
							y2 = max+min_value;
						}
						paper.rect((2*paddingx),  (( (height-(2*paddingy)) - ((height-(4*paddingy))*(y2 - min_value))/max)), width - (4*paddingx) , ((height-(4*paddingy))*(y2 -y1))/max).attr({
							stroke : instruction.annotations.yaxis[i].borderColor,
							fill : instruction.annotations.yaxis[i].fillColor,
							opacity : instruction.annotations.yaxis[i].opacity,
						});
						if((y2-min_value) > max/2){
							paper.rect((2*paddingx) + (i*50+50), (( (height-(2*paddingy)) - ((height-(4*paddingy))*(y2 - min_value))/max)), (instruction.annotations.yaxis[i].label.text.length*7)+20, 20).attr({
								fill : instruction.annotations.yaxis[i].label.style.background,
								stroke : instruction.annotations.yaxis[i].label.borderColor,
							});
							paper.text((2*paddingx) + (i*50+50) + ((instruction.annotations.yaxis[i].label.text.length*7)+20)/2, (( (height-(2*paddingy)) - ((height-(4*paddingy))*(y2 - min_value))/max))+10, (instruction.annotations.yaxis[i].label.text)).attr({
								fill : instruction.annotations.yaxis[i].label.style.color,
							});
							
						}else{
							paper.rect((2*paddingx) + (i*50+50), (( (height-(2*paddingy)) - ((height-(4*paddingy))*(y2 - min_value))/max))-20, (instruction.annotations.yaxis[i].label.text.length*7)+20, 20).attr({
								fill : instruction.annotations.yaxis[i].label.style.background,
								stroke : instruction.annotations.yaxis[i].label.borderColor,
							});
							paper.text((2*paddingx) + (i*50+50) + ((instruction.annotations.yaxis[i].label.text.length*7)+20)/2, ( (height-(2*paddingy)) - ((height-(4*paddingy))*(y2 - min_value))/max)-10, (instruction.annotations.yaxis[i].label.text)).attr({
								fill : instruction.annotations.yaxis[i].label.style.color,
							});
						}
					}
				}
			}
		}
		//Point annotations
		if(instruction.annotations.points){
			try{
				if(instruction.annotations.points.length > 0){
					for(var i = 0; i<instruction.annotations.points.length; i++){
						for(var j = 0; j < data.length ; j ++){
							if(data[j].month == instruction.annotations.points[i].x){
								if(instruction.annotations.points[i].y <= max_value && instruction.annotations.points[i].y >= min_value){
									//alert(max_value+ " "+ min_value+" "+max);								
									paper.circle(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - ((parseInt(instruction.annotations.points[i].y) - min_value)*((height-(4*paddingy))/max)), instruction.annotations.points[i].marker.radius).attr({
										fill : instruction.annotations.points[i].marker.fillColor,
										'stroke-width' : instruction.annotations.points[i].marker.strokeWidth,
										stroke : instruction.annotations.points[i].marker.strokeColor,
									});
									var rect_x = 0, rect_y = 0, text_x = 0, text_y = 0;
									if(parseInt(instruction.annotations.points[i].y - min_value) > max/2){
										if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) < 1*((width-(4*paddingx))/4)){
											rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1)))  + (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max))- 10;
											text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.points[i].label.text.length*7)+20)/2 + (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max)) ;
										}
										else if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) > 3*((width-(4*paddingx))/4)){
											rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.points[i].label.text.length*7)+20) - (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max)) - 10;
											text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.points[i].label.text.length*7)+20)/2 - ((instruction.annotations.points[i].label.text.length*7)+20) - (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max));
										}else {
											rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.points[i].label.text.length*7)+20)/2;
											rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max)) + (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.points[i].label.text.length*7)+20)/2 - ((instruction.annotations.points[i].label.text.length*7)+20)/2;
											text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max))+10 + (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
										}
									}else{
										if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) < 1*((width-(4*paddingx))/4)){
											rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1)))  + (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max))- 10;
											text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.points[i].label.text.length*7)+20)/2 + (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max)) ;
										}
										else if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) > 3*((width-(4*paddingx))/4)){
											rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.points[i].label.text.length*7)+20) - (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max)) - 10;
											text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.points[i].label.text.length*7)+20)/2 - ((instruction.annotations.points[i].label.text.length*7)+20) - (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max));
										}else {
											rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.points[i].label.text.length*7)+20)/2;
											rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max)) - 20 - (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
											text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.points[i].label.text.length*7)+20)/2 - ((instruction.annotations.points[i].label.text.length*7)+20)/2;
											text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(instruction.annotations.points[i].y - min_value))/max)) - 10 - (instruction.annotations.points[i].marker.radius + instruction.annotations.points[i].marker.strokeWidth + 3);
										}
									}
									paper.rect(rect_x, rect_y, (instruction.annotations.points[i].label.text.length*7)+20, 20).attr({
										fill : instruction.annotations.points[i].label.style.background,
										stroke : instruction.annotations.points[i].label.borderColor,
									});
									paper.text(text_x, text_y, (instruction.annotations.points[i].label.text)).attr({
										fill : instruction.annotations.points[i].label.style.color,
									});	
								}
							}
						}
					}
				}
			}catch(err){}
		}
		
		//Max point annotations
		if(instruction.annotations.max){
			if(instruction.annotations.max.length > 0){	
				if(max_point_value <= max_value && max_point_value >= min_value){
					var j = 0;
					for(var i = 0; i<data.length; i++){
						if((Math.max(...(Object.values(data[i].value)))) == max_point_value){
							j = i;
						}
					}
					paper.circle(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - ((parseInt(max_point_value) - min_value)*((height-(4*paddingy))/max)), instruction.annotations.max[0].marker.radius).attr({
						fill : instruction.annotations.max[0].marker.fillColor,
						'stroke-width' : instruction.annotations.max[0].marker.strokeWidth,
						stroke : instruction.annotations.max[0].marker.strokeColor,
					});
					var rect_x = 0, rect_y = 0, text_x = 0, text_y = 0;
					if(parseInt(max_point_value - min_value) > max/2){
						if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) < 1*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1)))  + (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max))- 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.max[0].label.text.length*7)+20)/2 + (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max)) ;
						}
						else if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) > 3*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.max[0].label.text.length*7)+20) - (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max)) - 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.max[0].label.text.length*7)+20)/2 - ((instruction.annotations.max[0].label.text.length*7)+20) - (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max));
						}else {
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.max[0].label.text.length*7)+20)/2;
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max)) + (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.max[0].label.text.length*7)+20)/2 - ((instruction.annotations.max[0].label.text.length*7)+20)/2;
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max))+10 + (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
						}
					}else{
						if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) < 1*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1)))  + (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max))- 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.max[0].label.text.length*7)+20)/2 + (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max)) ;
						}
						else if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) > 3*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.max[0].label.text.length*7)+20) - (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max)) - 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.max[0].label.text.length*7)+20)/2 - ((instruction.annotations.max[0].label.text.length*7)+20) - (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max));
						}else {
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.max[0].label.text.length*7)+20)/2;
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max)) - 20 - (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.max[0].label.text.length*7)+20)/2 - ((instruction.annotations.max[0].label.text.length*7)+20)/2;
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(max_point_value - min_value))/max)) - 10 - (instruction.annotations.max[0].marker.radius + instruction.annotations.max[0].marker.strokeWidth + 3);
						}
					}
					paper.rect(rect_x, rect_y, (instruction.annotations.max[0].label.text.length*7)+20, 20).attr({
						fill : instruction.annotations.max[0].label.style.background,
						stroke : instruction.annotations.max[0].label.borderColor,
					});
					paper.text(text_x, text_y, (instruction.annotations.max[0].label.text)).attr({
						fill : instruction.annotations.max[0].label.style.color,
					});
				}
			}
		}
		//Min point annotations
		if(instruction.annotations.min){
			if(instruction.annotations.min.length > 0){	
				if(min_point_value <= max_value && min_point_value >= min_value){
					var j = 0;
					for(var i = 0; i<data.length; i++){
						if((Math.min(...(Object.values(data[i].value)))) == min_point_value){
							j = i;
						}
					}
					paper.circle(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - ((parseInt(min_point_value) - min_value)*((height-(4*paddingy))/max)), instruction.annotations.min[0].marker.radius).attr({
						fill : instruction.annotations.min[0].marker.fillColor,
						'stroke-width' : instruction.annotations.min[0].marker.strokeWidth,
						stroke : instruction.annotations.min[0].marker.strokeColor,
					});
					var rect_x = 0, rect_y = 0, text_x = 0, text_y = 0;
					if(parseInt(min_point_value - min_value) > max/2){
						if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) < 1*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1)))  + (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max))- 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.min[0].label.text.length*7)+20)/2 + (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max)) ;
						}
						else if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) > 3*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.min[0].label.text.length*7)+20) - (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max)) - 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.min[0].label.text.length*7)+20)/2 - ((instruction.annotations.min[0].label.text.length*7)+20) - (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max));
						}else {
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.min[0].label.text.length*7)+20)/2;
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max)) + (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.min[0].label.text.length*7)+20)/2 - ((instruction.annotations.min[0].label.text.length*7)+20)/2;
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max))+10 + (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
						}
					}else{
						if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) < 1*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1)))  + (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max))- 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.min[0].label.text.length*7)+20)/2 + (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max)) ;
						}
						else if(((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) > 3*((width-(4*paddingx))/4)){
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.min[0].label.text.length*7)+20) - (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max)) - 10;
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.min[0].label.text.length*7)+20)/2 - ((instruction.annotations.min[0].label.text.length*7)+20) - (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max));
						}else {
							rect_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) - ((instruction.annotations.min[0].label.text.length*7)+20)/2;
							rect_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max)) - 20 - (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
							text_x = ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ((instruction.annotations.min[0].label.text.length*7)+20)/2 - ((instruction.annotations.min[0].label.text.length*7)+20)/2;
							text_y = ( (height-(2*paddingy)) - ((height-(4*paddingy))*(parseInt(min_point_value - min_value))/max)) - 10 - (instruction.annotations.min[0].marker.radius + instruction.annotations.min[0].marker.strokeWidth + 3);
						}
					}
					paper.rect(rect_x, rect_y, (instruction.annotations.min[0].label.text.length*7)+20, 20).attr({
						fill : instruction.annotations.min[0].label.style.background,
						stroke : instruction.annotations.min[0].label.borderColor,
					});
					paper.text(text_x, text_y, (instruction.annotations.min[0].label.text)).attr({
						fill : instruction.annotations.min[0].label.style.color,
					});
				}
			}
		}
	}
	draw_annotations_flag = 1;
}




/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// For x axis hover -----------------------------
var x_axis_hover_design_flag = 0;
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
var y_axis_hover_design_flag = 0;
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
var popup_design_flag = 0;
function popup_design(){
	
	var pop_rect = paper.rect(0, 0, 120, instruction.path_no*30, 3).attr({
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
	popup_design_flag = 1;
}

//Draw popup footer design
var popup_footer_design_flag = 0;
function popup_footer_design(){
	//for rect
	var rect1 = paper.rect(2*paddingx, height - (2*paddingy), 0, 40, 5).attr({
		fill : '#f1f1f1',
		stroke : '#b6b6b6',
		opacity : 0,
	});
	elems["pfd_r"] = rect1;
	//for text
	var text1 = paper.text(2*paddingx, height - (1.5*paddingy), "2019").attr({
		'font-size' : '13px',
			'font-weight' : 'bold',
		opacity : 0,
	});
	elems["pfd_t"] = text1;
	popup_footer_design_flag = 1;
}
//Collect max data on every point for view popup on that point
function collect_popup_point(){
	popup_point_x = [];
	popup_point_y = [];
	for(var i = 0; i < data.length; i++){
		popup_point_x.push(((2*paddingx)+i*((width-(4*paddingx))/(data.length-1))));
		popup_point_y.push((height - (2*paddingy)) - ((Math.max(...Object.values(data[i].value))  - min_value)*((height-(4*paddingy))/max)));
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
	if(popup_design_flag == 1){
		popup_hover(id);
	}
	if(popup_footer_design_flag == 1){
		popup_footer_hover(id);
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
	if(popup_design_flag == 1){
		popup_hover_out(id);
	}
	if(popup_footer_design_flag == 1){
		popup_footer_hover_out(id);
	}
}
//Popup hover
function popup_hover(id){
	if(id<data.length/2){
		if(Math.max(...(Object.values(data[id].value)))>(max/2)){
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] ,
				y : popup_point_y[id] + 15,
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
					y : popup_point_y[id] + (15 + (30*i) + 15),
				}, 150);
			}
		}else{
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] ,
				y : popup_point_y[id] - (instruction.path_no*30) - 15,
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
					y : popup_point_y[id] + (15 + (30*i)) - (instruction.path_no*30) - 15,
				}, 150);
			}
		}
	}else{
		if(Math.max(...(Object.values(data[id].value)))>(max/2)){
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] - 100,
				y : popup_point_y[id] + 15,
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
					y : popup_point_y[id] + (15 + (30*i))  + 15,
				}, 150);
			}
		}else{
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] - 100,
				y : popup_point_y[id] - (instruction.path_no*30) - 15,
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
					y : popup_point_y[id] + (15 + (30*i)) - (instruction.path_no*30) - 15,
				}, 150);
			}
		}
	}
}
//Popup hover out
function popup_hover_out(id){
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

//Popup footer hover
function popup_footer_hover(id){
	//for rect
	elems["pfd_r"].animate({
		opacity : 1,
		x : popup_point_x[id] - (((data[id].month.length*7)+20)/2),
		width : (data[id].month.length*7) + 20,
	},150);
	//for text change
	elems["pfd_t"].attr({
		text : data[id].month,
	});
	//for text
	elems["pfd_t"].animate({
		opacity : 1,
		x : popup_point_x[id] ,
	}, 150);
}
//Popup footer hover out
function popup_footer_hover_out(id){
	//for rect
	elems["pfd_r"].animate({
		opacity : 0,
	},150);
	//for text
	elems["pfd_t"].animate({
		opacity : 0,
	}, 150);
}
//Circle effect on popup
function circle_popup(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		elems["c"+i+""+id].animate({
			opacity : 1,
			r : circle_radius_zoom,
		},25);
	}
}
//Circle effect on popdown
function circle_popdown(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		elems["c"+i+""+id].animate({
			//opacity : 0,
			r : circle_radius,
		},25);
	}
}
//X axis hover
function x_axis_hover(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		var  p  = "M "+ 2*paddingx +" " + ( (height - (2*paddingy)) - ((Object.values(data[id].value)[i] - min_value)*((height-(4*paddingy))/max)) ) + " l "+  (width-(4*paddingx)) +" 0";
		elems["py"+i].animate({
			opacity : 1,
			path : p,
		}, 150);
	}
}
//Y axis hover
function y_axis_hover(id){
	for(var i = 0; i<1; i++){
		var  p  = "M "+ ((2*paddingx)+id*((width-(4*paddingx))/(data.length-1))) +" " + (2*paddingy) + " l 0 "+  ( (height - (4*paddingy)) ) ;
		elems["px"+i].animate({
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
		if(x_axis_flag == 1){
			x_axis();
		}
		if(x_axis_division_flag == 1){
			x_axis_division();
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
		if(y_axis_division_flag == 1){
			y_axis_division();
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
		if(draw_stepline_area_flag == 1){
			draw_stepline_area(stepline_area_stroke);
		}
		if(draw_line_path_flag == 1){
			draw_line_path(line_path_stroke);
		}
		if(draw_round_path_flag == 1){
			draw_round_path(round_path_stroke);
		}
		if(draw_stepline_path_flag == 1){
			draw_stepline_path(stepline_path_stroke);
		}
		//Draw circle
		if(draw_circle_flag == 1){
			draw_circle(circle_radius, circle_radius_zoom);//Pass radius value
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
						
		//Draw annotations
		if(draw_annotations_flag == 1){
			draw_annotations();
		}
		

		//Draw label
		if(label_flag == 1){
			label();
		}
		
		//Draw popup
		if(popup_design_flag == 1){
			popup_design();
		}
		
		//Draw popup footer
		if(popup_footer_design_flag == 1){
				popup_footer_design();
		}
		
		
		//Draw select area
		select_area();
		
		
		//*****Draw rectangle for popup
		draw_popup_rect();
	}
}
