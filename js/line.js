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
var line_path_icon_effect_status_array = [];
var round_path_icon_effect_status_array = [];
var stepline_path_icon_effect_status_array = [];
var line_area_icon_effect_status_array = [];
var round_area_icon_effect_status_array = [];
var stepline_area_icon_effect_status_array = [];
var label_icon_effect_status_array = [];
var circle_icon_effect_status_array = [];



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
	//min_value = min_value + (Math.ceil((min_value)/(y_division_no-1)));
	//max = ((Math.ceil(max_value/(y_division_no-1)))*(y_division_no-1))+(1*(y_division_no-1));
	max = ((Math.ceil((max_value-min_value)/(y_division_no-1)))*(y_division_no-1))+(1*(y_division_no-1));
	
	//For main value
	if(main_data_flag == 0){		
		create_paper();
		main_data = data;
		//Max point
		max_point_value = Math.max(...(Object.values(main_data[0].value)));
		for(var i = 0; i<main_data.length; i++){
			if((Math.max(...(Object.values(main_data[i].value))))>max_point_value){
				max_point_value = Math.max(...(Object.values(main_data[i].value)));
			}
		}
		//Min point value
		min_point_value = Math.min(...(Object.values(main_data[0].value)));
		for(var i = 0; i<main_data.length; i++){
			if((Math.min(...(Object.values(main_data[i].value))))< min_point_value){
				min_point_value = Math.min(...(Object.values(main_data[i].value)));
			}
		}
	}
	//console.log(max_point_value+ " "+ min_point_value);
	//console.log(max_value+ " "+ min_value);
	main_data_flag = 1;
}
//Paper set
function create_paper(){	
	paper = new Raphael(document.getElementById("cntnr1"), width, height);	
}
//All function
function all_function(){
	if(instruction.main_title == true){
		main_title();
	}
	if(instruction.icon == true){
		icon_design();
	}
	if(instruction.x_axis == true){
		x_axis();
	}
	if(instruction.x_axis_division == true){
		x_axis_division();
	}
	if(instruction.x_axis_title == true){
		x_axis_title();
	}
	if(instruction.x_axis_label == true){
		x_axis_label();
	}
	if(instruction.y_axis == true){
		y_axis();
	}
	if(instruction.y_axis_division == true){
		y_axis_division();
	}
	if(instruction.y_axis_title == true){
		y_axis_title();
	}
	if(instruction.y_axis_label == true){
		y_axis_label();
	}
	draw_line_area();
	draw_round_area();
	draw_stepline_area();
	draw_line_path();	
	draw_round_path();	
	draw_stepline_path();
	draw_circle();
	//Collect max data on every point for view popup on that point
	collect_popup_point();
	if(instruction.x_axis_hover_design == true){
		x_axis_hover_design();
	}
	if(instruction.y_axis_hover_design == true){
		y_axis_hover_design();
	}
	label();
	draw_annotations();
	if(instruction.popup_design == true){
		popup_design();
	}
	if(instruction.popup_footer_design == true){
		popup_footer_design();
	}
	if(instruction.select_area == true){
		select_area();
	}
	//*****Draw rectangle for popup
	draw_popup_rect();
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
	main_title_flag = 1;
}
//Icon design
var icon_design_flag = 0;
function icon_design(){
	var x = (2*paddingx);
	for(var i = 0; i < path_details.length; i++){
		x += (7*path_details[(path_details.length-1)-i].name.length);
		var text = paper.text(width - x, paddingy, path_details[(path_details.length-1)-i].name).attr({
			'font-weight' : 'bold',
			'text-anchor': 'start',
			'font-size' : '13px',
			fill : path_details[(path_details.length-1)-i].color,
		});
		var circle = paper.circle(width- x - (.3*paddingx) , paddingy, 5).attr({
			fill : path_details[(path_details.length-1)-i].color,
			stroke : path_details[(path_details.length-1)-i].color,
		});
		var rect = paper.rect(width- x - (.3*paddingx) - 5, paddingy - 7.5, (path_details[(path_details.length-1)-i].name).toString().length*7 + 25 , 15).attr({
			fill : 'transparent',
			opacity : 0,
			cursor : 'pointer',
			//stroke : 'transparent',
		});
		rect.node.id = "icon"+i;
		rect.node.addEventListener('click', icon_effect_click);
		rect.node.addEventListener('mouseover', icon_effect_mouseover);
		rect.node.addEventListener('mouseout', icon_effect_mouseout);
		x += .75*paddingx;
		
	}
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		line_path_icon_effect_status_array.push(0);
		round_path_icon_effect_status_array.push(0);
		stepline_path_icon_effect_status_array.push(0);
		line_area_icon_effect_status_array.push(0);
		round_area_icon_effect_status_array.push(0);
		stepline_area_icon_effect_status_array.push(0);
		label_icon_effect_status_array.push(0);
		circle_icon_effect_status_array.push(0);
	}
	icon_design_flag = 1;
}

//Icon click effect
function icon_effect_click(){
	var id = this.id.replace('icon', '');
	id = (path_details.length-1) - id;
	//For Line path
	if(draw_line_path_flag == 1){
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(line_path_icon_effect_status_array[id] == 0){
					line_path_icon_effect_status_array[id] = 1;
					if(elems['line_path'+i]){
						elems['line_path'+i].animate({
							opacity: 0.1,
						});
					}
					for(var i = 0; i < parseInt(instruction.path_no); i++){
						if(i != id && line_path_icon_effect_status_array[i] == 0){
							if(elems['line_path'+i]){
								elems['line_path'+i].animate({
									opacity: 1,
								});
							}
						}
					}
				}
				else{
					line_path_icon_effect_status_array[id] = 0;
					if(elems['line_path'+i]){
						elems['line_path'+i].animate({
							opacity: 1,
						});
					}
				}
			}
		}
	}
	//For Round path
	if(draw_round_path_flag == 1){
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(round_path_icon_effect_status_array[id] == 0){
					round_path_icon_effect_status_array[id] = 1;
					if(elems['round_path'+i]){
						elems['round_path'+i].animate({
							opacity: 0.1,
						});
					}
					for(var i = 0; i < parseInt(instruction.path_no); i++){
						if(i != id && round_path_icon_effect_status_array[i] == 0){
							if(elems['round_path'+i]){
								elems['round_path'+i].animate({
									opacity: 1,
								});
							}
						}
					}
				}
				else{
					round_path_icon_effect_status_array[id] = 0;
					if(elems['round_path'+i]){
						elems['round_path'+i].animate({
							opacity: 1,
						});
					}
				}
			}
		}
	}
	//For stepline path
	if(draw_stepline_path_flag == 1){
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(stepline_path_icon_effect_status_array[id] == 0){
					stepline_path_icon_effect_status_array[id] = 1;
					if(elems['stepline_path'+i]){
						elems['stepline_path'+i].animate({
							opacity: 0.1,
						});
					}
					for(var i = 0; i < parseInt(instruction.path_no); i++){
						if(i != id && stepline_path_icon_effect_status_array[i] == 0){
							if(elems['stepline_path'+i]){
								elems['stepline_path'+i].animate({
									opacity: 1,
								});
							}
						}
					}
				}
				else{
					stepline_path_icon_effect_status_array[id] = 0;
					if(elems['stepline_path'+i]){
						elems['stepline_path'+i].animate({
							opacity: 1,
						});
					}
				}
			}
		}
	}
	//For Line area
	if(draw_line_area_flag == 1){
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(line_area_icon_effect_status_array[id] == 0){
					line_area_icon_effect_status_array[id] = 1;
					if(elems['line_area'+i]){
						elems['line_area'+i].attr({
							fill : "#fff",
							opacity: .1,
						});
					}
					for(var j = 0; j < parseInt(instruction.path_no); j++){
						if(j != id && line_area_icon_effect_status_array[j] == 0){
							if(elems['line_area'+j]){
								elems['line_area'+j].attr({
									fill : "270-"+path_details[j].color+"-#fff",
									opacity: .1,
								});
							}
						}
					}
				}
				else{
					line_area_icon_effect_status_array[id] = 0;
					if(elems['line_area'+i]){
						elems['line_area'+i].attr({
							fill : "270-"+path_details[i].color+"-#fff",
							opacity: .1,
						});
					}
				}
			}
		}
	}
	//For Round area
	if(draw_round_area_flag == 1){
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(round_area_icon_effect_status_array[id] == 0){
					round_area_icon_effect_status_array[id] = 1;
					if(elems['round_area'+i]){
						elems['round_area'+i].attr({
							fill : "#fff",
							opacity: .1,
						});
					}
					for(var j = 0; j < parseInt(instruction.path_no); j++){
						if(j != id && round_area_icon_effect_status_array[j] == 0){
							if(elems['round_area'+j]){
								elems['round_area'+j].attr({
									fill : "270-"+path_details[j].color+"-#fff",
									opacity: .1,
								});
							}
						}
					}
				}
				else{
					round_area_icon_effect_status_array[id] = 0;
					if(elems['round_area'+i]){
						elems['round_area'+i].attr({
							fill : "270-"+path_details[i].color+"-#fff",
							opacity: .1,
						});
					}
				}
			}
		}
	}
	//For Stepline area
	if(draw_stepline_area_flag  == 1){
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(stepline_area_icon_effect_status_array[id] == 0){
					stepline_area_icon_effect_status_array[id] = 1;
					if(elems['stepline_area'+i]){
						elems['stepline_area'+i].attr({
							fill : "#fff",
							opacity: .1,
						});
					}
					for(var j = 0; j < parseInt(instruction.path_no); j++){
						if(j != id && stepline_area_icon_effect_status_array[j] == 0){
							if(elems['stepline_area'+j]){
								elems['stepline_area'+j].attr({
									fill : "270-"+path_details[j].color+"-#fff",
									opacity: .1,
								});
							}
						}
					}
				}
				else{
					stepline_area_icon_effect_status_array[id] = 0;
					if(elems['stepline_area'+i]){
						elems['stepline_area'+i].attr({
							fill : "270-"+path_details[i].color+"-#fff",
							opacity: .1,
						});
					}
				}
			}
		}
	}
	//For Circle
	if(draw_circle_flag  == 1){
		//console.log(circle_icon_effect_status_array);
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(circle_icon_effect_status_array[id] == 0){
					circle_icon_effect_status_array[id] = 1;					
					for(var k =0;k< data.length ; k++){
						if(elems["c"+i+""+k]){
							elems["c"+i+""+k].attr({
								fill : "#fff",
								opacity: .1,
							});
						}
						for(var j = 0; j < parseInt(instruction.path_no); j++){
							if(j != id && circle_icon_effect_status_array[j] == 0){
								if(elems["c"+j+""+k]){
									elems["c"+j+""+k].attr({
										fill : path_details[j].color,
										opacity: 1,
									});
								}
							}
						}
					}
				}
				else{
					circle_icon_effect_status_array[id] = 0;
					for(var k =0;k< data.length; k++){
						if(elems["c"+i+""+k]){
							elems["c"+i+""+k].attr({
								fill : path_details[i].color,
								opacity: 1,
							});
						}
					}
				}
			}
		}		
		//console.log(circle_icon_effect_status_array);
	}
	//For Label
	if(label_flag == 1){
		for(var i = 0; i < parseInt(instruction.path_no); i++){
			if(i == id){
				if(label_icon_effect_status_array[id] == 0){
					label_icon_effect_status_array[id] = 1;
					var m = 0;
					for(var k =0;m< data.length ; k++){
						if(elems["label_rect"+i+""+k]){
							elems["label_rect"+i+""+k].attr({
								fill : "#fff",
								opacity: .1,
							});
						}
						for(var j = 0; j < parseInt(instruction.path_no); j++){
							if(j != id && label_icon_effect_status_array[j] == 0){
								if(elems["label_rect"+j+""+k]){
									elems["label_rect"+j+""+k].attr({
										fill : path_details[j].color,
										opacity: 1,
									});
								}
							}
						}
						m = m + (Math.ceil(data.length/(x_division_no)));
					}
				}
				else{
					label_icon_effect_status_array[id] = 0;
					var m = 0;
					for(var k =0;m< data.length; k++){
						if(elems["label_rect"+i+""+k]){
							elems["label_rect"+i+""+k].attr({
								fill : path_details[i].color,
								opacity: 1,
							});
						}
						m = m + (Math.ceil(data.length/(x_division_no)));
					}
				}
			}
		}
	}
}
//Icon mouseover effect
function icon_effect_mouseover(){
	var id = this.id.replace('icon', '');
	id = (path_details.length-1) - id;
	var c = 0;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		if(line_path_icon_effect_status_array[i] == 1){
			c++;
		}
		if(round_path_icon_effect_status_array[i] == 1){
			c++;
		}
		if(stepline_path_icon_effect_status_array[i] == 1){
			c++;
		}
		if(line_area_icon_effect_status_array == 1){
			c++;
		}
		if(round_area_icon_effect_status_array[i] == 1){
			c++;
		}
		if(stepline_area_icon_effect_status_array[i] == 1){
			c++;
		}
		if(circle_icon_effect_status_array[i] == 1){
			c++;
		}
		if(label_icon_effect_status_array[i] == 1){
			c++;
		}
	}
	if(c == 0){
		//For line path
		if(draw_line_path_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(id != i){
					if(elems['line_path'+i]){
						elems['line_path'+i].animate({
							opacity: 0.1,
						});
					}
				}
			}
		}
		//For round path
		if(draw_round_path_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(id != i){
					if(elems['round_path'+i]){
						elems['round_path'+i].animate({
							opacity: 0.1,
						});
					}
				}
			}
		}
		//For stepline path
		if(draw_stepline_path_flag  == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(id != i){
					if(elems['stepline_path'+i]){
						elems['stepline_path'+i].animate({
							opacity: 0.1,
						});
					}
				}
			}
		}
		//For line area
		if(draw_line_area_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(id != i){
					if(elems['line_area'+i]){
						elems['line_area'+i].animate({
							fill : "#fff",
							opacity: 0.1,
						});
					}
				}
			}
		}
		//For round area
		if(draw_round_area_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(id != i){
					if(elems['round_area'+i]){
						elems['round_area'+i].attr({
							fill : "#fff",
							opacity: .1,
						});
					}
				}
			}
		}
		//For stepline area
		if(draw_stepline_area_flag  == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(id != i){
					if(elems['stepline_area'+i]){
						elems['stepline_area'+i].attr({
							fill : "#fff",
							opacity: .1,
						});
					}
				}
			}
		}
		//For Circle
		if(draw_circle_flag  == 1){
			for(var i = 0; i < parseInt(instruction.path_no); i++){
				if(id != i){					
					for(var k =0;k< data.length ; k++){
						if(elems["c"+i+""+k]){
							elems["c"+i+""+k].animate({
								fill : path_details[i].color,
								opacity: .1,
							});
						}
					}
				}
			}
		}
		//For Label
		if(label_flag == 1){
			for(var i = 0; i < parseInt(instruction.path_no); i++){
				if(id != i){
					var m = 0;
					for(var k =0;m< data.length ; k++){
						if(elems["label_rect"+i+""+k]){
							elems["label_rect"+i+""+k].animate({
								fill : path_details[i].color,
								opacity: .1,
							});
						}
						m = m + (Math.ceil(data.length/(x_division_no)));
					}
				}
			}
		}
	}
}
//Icon mouseout effect
function icon_effect_mouseout(){
	var c = 0;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		if(line_path_icon_effect_status_array[i] == 1){
			c++;
		}
		if(round_path_icon_effect_status_array[i] == 1){
			c++;
		}
		if(stepline_path_icon_effect_status_array[i] == 1){
			c++;
		}
		if(line_area_icon_effect_status_array == 1){
			c++;
		}
		if(round_area_icon_effect_status_array[i] == 1){
			c++;
		}
		if(stepline_area_icon_effect_status_array[i] == 1){
			c++;
		}
		if(circle_icon_effect_status_array[i] == 1){
			c++;
		}
		if(label_icon_effect_status_array[i] == 1){
			c++;
		}
	}
	if(c == 0){
		//For line path
		if(draw_line_path_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(elems['line_path'+i]){
					elems['line_path'+i].animate({
						opacity: 1,
					});
				}
			}
		}
		//For round path
		if(draw_round_path_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(elems['round_path'+i]){
					elems['round_path'+i].animate({
						opacity: 1,
					});
				}
			}
		}
		//For stepline path
		if(draw_stepline_path_flag  == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(elems['stepline_path'+i]){
					elems['stepline_path'+i].animate({
						opacity: 1,
					});
				}
			}
		}
		//For line area
		if(draw_line_area_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(elems['line_area'+i]){
					elems['line_area'+i].animate({
						opacity: 0.1,
						fill : "270-"+path_details[i].color+"-#fff",
					});
				}
			}
		}
		//For round area
		if(draw_round_area_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(elems['round_area'+i]){
					elems['round_area'+i].animate({
						opacity: 0.1,
						fill : "270-"+path_details[i].color+"-#fff",
					});
				}
			}
		}
		//For round area
		if(draw_stepline_area_flag == 1){
			for(var i = 0; i< parseInt(instruction.path_no); i++){
				if(elems['stepline_area'+i]){
					elems['stepline_area'+i].animate({
						opacity: 0.1,
						fill : "270-"+path_details[i].color+"-#fff",
					});
				}
			}
		}
		//For circle
		if(label_flag == 1){
			for(var i = 0; i < parseInt(instruction.path_no); i++){
				for(var k =0;k< data.length ; k++){
					if(elems["c"+i+""+k]){
						elems["c"+i+""+k].animate({
							fill : path_details[i].color,
							opacity: 1,
						});
					}
				}
			}
		}
		//For Label
		if(label_flag == 1){
			for(var i = 0; i < parseInt(instruction.path_no); i++){
				var m = 0;
				for(var k =0;m< data.length ; k++){
					if(elems["label_rect"+i+""+k]){
						elems["label_rect"+i+""+k].animate({
							fill : path_details[i].color,
							opacity: 1,
						});
					}
					m = m + (Math.ceil(data.length/(x_division_no)));
				}
			}
		}
	}
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
	if(0 <= max_value && 0 >= min_value){
		paper.path("M " + (2*paddingx) + " " + ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0 - min_value))/max) + "l "+ (width - (4*paddingx)) + " 0").attr({
			stroke : instruction.axis_color || "#9d9d9d",
		});
	}else{
		paper.path("M " + (2*paddingx) + " " + ( (height-(2*paddingy)) ) + "l "+ (width - (4*paddingx)) + " 0").attr({
			stroke : instruction.axis_color || "#9d9d9d",
		});
	}
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
function draw_line_path(){
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		for(var x = 0; x<path_details[i].type.length; x++){
			if(path_details[i].type[x] == "line_path"){
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0 - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*0)/max + "";
				}
				var path1 = paper.path(p).attr({
					'stroke-width' : path_details[i].stroke[x],
					stroke : path_details[i].color,
					opacity : 1,
				});
				elems['line_path'+i] = path1;
				
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i] - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
				}
				elems['line_path'+i].animate({
					path : p,
				}, 400 + (150*i), "<>" );
			}
		}
	}
draw_line_path_flag = 1;
}
//Draw round path
var draw_round_path_flag = 0;
function draw_round_path(){
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		for(var x = 0; x<path_details[i].type.length; x++){
			if(path_details[i].type[x] == "round_path"){
				p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((0   - min_value)*((height-(4*paddingy))/max))) + " R ";
				for(var j = 1; j < data.length ; j++){
					p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0 - min_value)*((height-(4*paddingy))/max))) + " ";
				}
				var path1 = paper.path(p).attr({
					'stroke-width' : path_details[i].stroke[x],
					stroke : path_details[i].color,
					opacity : 1,
				});
				elems['round_path'+i] = path1;
				p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((Object.values(data[0].value)[i]   - min_value)*((height-(4*paddingy))/max))) + " R ";
				for(var j = 1; j < data.length ; j++){
					p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((Object.values(data[j].value)[i]  - min_value)*((height-(4*paddingy))/max))) + " ";
				}
				elems['round_path'+i].animate({
					path : p,
				}, 400 + (150*i), "<>" );
			}
		}
	}
	draw_round_path_flag = 1;
}

//Draw stepline path
var draw_stepline_path_flag = 0;
function draw_stepline_path(){
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		for(var x = 0; x<path_details[i].type.length; x++){
			if(path_details[i].type[x] == "stepline_path"){
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0  - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
					p += " l "+ 0 + " "+ ((height-(4*paddingy))*0)/max + "";
				}
				var path1 = paper.path(p).attr({
					'stroke-width' : path_details[i].stroke[x],
					stroke : path_details[i].color,
					opacity : 1,
				});
				elems['stepline_path'+i] = path1;
			
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i]  - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
					p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
				}
				elems['stepline_path'+i].animate({
					path : p,
				}, 400 + (150*i), "backOut" );
			}
		}
	}
	draw_stepline_path_flag = 1;
}
//Draw circle on path
var draw_circle_flag = 0;
function draw_circle(){
	/*circle_radius = radius;
	circle_radius_zoom = radius_zoom;*/
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		if(path_details[i].circle == true){
			for(var j = 0; j < data.length ; j++){
				var circle1 = paper.circle( ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max)) ,path_details[i].circle_zoom_out).attr({
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
	}
	draw_circle_flag = 1;
}
//Draw line area
var draw_line_area_flag = 0;
function draw_line_area(){
	//line_area_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		for(var x = 0; x<path_details[i].type.length; x++){
			if(path_details[i].type[x] == "line_area"){
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0 - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*0)/max + "";
				}
				p += " l "+ 0 + " "+ ((height-(4*paddingy))*(0 - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
				var path1 = paper.path(p).attr({
					fill : "270-"+path_details[i].color+"-#fff",
					stroke : path_details[i].color,
					'stroke-width' : path_details[i].stroke[x],
					opacity : .1,
				});
				elems['line_area'+i] = path1;
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i] - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
				}
				p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
				elems['line_area'+i].animate({
					path : p,
				}, 400 + (150*i), "<>");
			}
		}
	}
	draw_line_area_flag = 1;
}

//Draw round area
var draw_round_area_flag = 0;
function draw_round_area(){
	for(var i = 0; i < parseInt(instruction.path_no); i++){	
		for(var x = 0; x<path_details[i].type.length; x++){	
			if(path_details[i].type[x] == "round_area"){
				p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max))) + " R ";
				for(var j = 1; j < data.length ; j++){
					p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max))) + " ";
				}
				p+= ", "+ ((2*paddingx)+(data.length-1)*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max))) + " z";
				var path1 = paper.path(p).attr({
					'stroke-width' : path_details[i].stroke[x],
					stroke : path_details[i].color,
					opacity : .1,
					fill : "270-"+path_details[i].color+"-#ffffff",
				});
				elems['round_area'+i] = path1;
				p = "M "+ (2*paddingx) + " "+ ((height - (2*paddingy)) - ((Object.values(data[0].value)[i]  - min_value)*((height-(4*paddingy))/max))) + " R ";
				for(var j = 1; j < data.length ; j++){
					p += ", "+ ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))) + ", "+ ((height - (2*paddingy)) - ((Object.values(data[j].value)[i]  - min_value)*((height-(4*paddingy))/max))) + " ";
				}
				p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
				elems['round_area'+i].animate({
					path : p,
				}, 400 + (150*i), "<>" );
			}
		}
	}
	draw_round_area_flag = 1;
}

//Draw stepline area
var draw_stepline_area_flag = 0;
function draw_stepline_area(){
	//stepline_area_stroke = stroke_width;
	for(var i = 0; i < parseInt(instruction.path_no); i++){	
		for(var x = 0; x<path_details[i].type.length; x++){
			if(path_details[i].type[x] == "stepline_area"){
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(0  - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
					p += " l "+ 0 + " "+ ((height-(4*paddingy))*0)/max + "";
				}
				p += " l "+ 0 + " "+ ((height-(4*paddingy))*(0 - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
				var path1 = paper.path(p).attr({
					fill : "270-"+path_details[i].color+"-#fff",
					stroke : path_details[i].color,
					'stroke-width' : path_details[i].stroke[x],
					opacity : .1,
				});
				elems['stepline_area'+i] = path1;
				p = "M "+ (2*paddingx) + " "+ ( (height-(2*paddingy)) - ((height-(4*paddingy))*(Object.values(data[0].value)[i]  - min_value))/max) + " ";
				for(var j = 1; j < data.length ; j++){
					p += " l "+ (width-(4*paddingx))/(data.length-1) + " "+ 0 + "";
					p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - Object.values(data[j].value)[i]))/max + "";
				}
				p += " l "+ 0 + " "+ ((height-(4*paddingy))*(Object.values(data[j-1].value)[i] - 0))/max + "l -" + (width - (4*paddingx)) + " 0z";
				elems['stepline_area'+i].animate({
					path : p,
				}, 400 + (150*i), "backOut");
			}
		}
	}
	draw_stepline_area_flag = 1;
}

//Draw label on path
var label_flag = 0;
function label(){
	for(var i = 0; i < parseInt(instruction.path_no); i++){
		if(path_details[i].label == true){
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
				elems["label_rect"+i+""+k] = rect1;
				var text1 = paper.text( ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))), (height - (2*paddingy)) - ((0  - min_value)*((height-(4*paddingy))/max)) ,Object.values(data[j].value)[i]).attr({
					//opacity : 0,
					fill : "#fff",//path_details[i].color,
				});
				text1.animate({
					opacity : 1,
					x : ((2*paddingx)+j*((width-(4*paddingx))/(data.length-1))),
					y : (height - (2*paddingy)) - ((Object.values(data[j].value)[i]  - min_value)*((height-(4*paddingy))/max)),
					
				}, 400 + (150*i), "<>" );			
				elems["label_text"+i+""+k] = text1;
				j = j + (Math.ceil(data.length/(x_division_no)));		
			}
		}
	}
	label_flag = 1;
}

//Draw annotations
var draw_annotations_flag = 0;
function draw_annotations(){
	if(instruction.annotations){
		//x axis annotations
		if(instruction.annotations.xaxis){
			if(instruction.annotations.xaxis.length > 0){
				
var x_area_annotation_count = 0;
				for(var i = 0; i< instruction.annotations.xaxis.length; i++){
					//Path annotations
					if(instruction.annotations.xaxis[i].x){
						for(var j = 0; j < data.length; j++){
							if(data[j].month == instruction.annotations.xaxis[i].x){
								paper.path("M " + ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j) + " "+ (height - (2*paddingy)) + " l 0 " + (-(height-(4*paddingy))) ).attr({
									stroke : instruction.annotations.xaxis[i].borderColor,
								}).toBack();
								var rect_x, rect_y, text_x, text_y;
								if(j < data.length/2){
									rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j);
									rect_y = 2*paddingy +10;//+ (j*5);
									text_x = rect_x + 10;
									text_y = rect_y + ((instruction.annotations.xaxis[i].label.text.length*7)+20)/2;
								}else{
									rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*j)-20;
									rect_y = 2*paddingy +10;//+ (j*5);
									text_x = rect_x + 10;
									text_y = rect_y + ((instruction.annotations.xaxis[i].label.text.length*7)+20)/2;
								}
								paper.rect(rect_x, rect_y, 20, (instruction.annotations.xaxis[i].label.text.length*7)+20).attr({
									fill : instruction.annotations.xaxis[i].label.style.background,
									stroke : instruction.annotations.xaxis[i].label.borderColor,
								});
								paper.text(text_x,text_y,(instruction.annotations.xaxis[i].label.text)).attr({
									fill : instruction.annotations.xaxis[i].label.style.color,
									transform : "r270",
								});
							}
							
						}
					}
					//Area annotations
					if(instruction.annotations.xaxis[i].x1){
						if(instruction.annotations.xaxis[i].x2){							
							var main_x1, main_x2;
							var x1 = -1, x2 =-1;
							for(var j = 0; j < main_data.length; j++){
								if(main_data[j].month == instruction.annotations.xaxis[i].x1){
									main_x1 = j;
								}
								if(main_data[j].month == instruction.annotations.xaxis[i].x2){
									main_x2 = j;
								}
							}
							if(main_x1 > main_x2){
								var a = main_x1;
								main_x1 = main_x2;
								main_x2 = a;
							}
							for(var j = 0; j < data.length; j++){
								if(data[j].month == instruction.annotations.xaxis[i].x1){
									x1 = j;
								}
								if(data[j].month == instruction.annotations.xaxis[i].x2){
									x2 = j;
								}
							}
							var inner_flag = 0;
							for(var k = main_x1; k <= main_x2; k++){
								if(data[0].month == main_data[k].month){
									inner_flag++;
								}
								
								if(data[data.length-1].month == main_data[k].month){
									inner_flag++;
								}
							}
							var area_rect_x, area_rect_y,area_rect_width, area_rect_height;
							//var rect_x, rect_y, text_x, text_y;
							var rect_x = -5000, rect_y = -5000, text_x = -5000, text_y = -5000;
							//alert(x_area_annotation_count);
							if(x1 >=0 && x2 >= 0){
								if(x1 > x2){
									var a = x1;
									x1= x2;
									x2= a;
								}
								area_rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*x1);
								area_rect_y = (2*paddingy);
								area_rect_width = ((width-(4*paddingx))/(data.length-1))*(x2-x1);
								area_rect_height = (height-(4*paddingy));
								rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*x1);
								rect_y = height - (4*paddingy) -30 - (x_area_annotation_count*30);
								text_x = rect_x + 10;
								text_y = rect_y + ((instruction.annotations.xaxis[i].label.text.length*7)+20)/2;
							}
							if(x1 == -1 && x2 >=0){
								area_rect_x = (2*paddingx);
								area_rect_y = (2*paddingy);
								area_rect_width = ((width-(4*paddingx))/(data.length-1))*x2;
								area_rect_height = (height-(4*paddingy));
								if(x2==0){
									rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*0) - 5000;
								}else{
									rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*0);
								}
								rect_y = height - (4*paddingy) -30 - (x_area_annotation_count*30);
								text_x = rect_x + 10;
								text_y = rect_y + ((instruction.annotations.xaxis[i].label.text.length*7)+20)/2;
							}
							if(x1 >=0 && x2 == -1){
								area_rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*x1);
								area_rect_y = (2*paddingy);
								area_rect_width = (width-(4*paddingx)) - ((width-(4*paddingx))/(data.length-1))*x1;
								area_rect_height = (height-(4*paddingy));								
								if(data.length == x1+1){
									rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*x1) +5000;									
								}else{
									rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*x1);
								}
								rect_y = height - (4*paddingy) -30 - (x_area_annotation_count*30);
								text_x = rect_x + 10;
								text_y = rect_y + ((instruction.annotations.xaxis[i].label.text.length*7)+20)/2;
							}
							if(inner_flag == 2){
								area_rect_x = ((2*paddingx));
								area_rect_y = (2*paddingy);
								area_rect_width = (width-(4*paddingx));
								area_rect_height = (height-(4*paddingy));
								rect_x = ((2*paddingx) + ((width-(4*paddingx))/(data.length-1))*0);
								rect_y = height - (4*paddingy) -30 - (x_area_annotation_count*30);
								text_x = rect_x + 10;
								text_y = rect_y + ((instruction.annotations.xaxis[i].label.text.length*7)+20)/2;
							}
							console.log(x1+" "+x2);
							paper.rect(area_rect_x, area_rect_y, area_rect_width, area_rect_height).attr({
								stroke : instruction.annotations.xaxis[i].borderColor,
								fill : instruction.annotations.xaxis[i].fillColor,
								opacity : instruction.annotations.xaxis[i].opacity,
							}).toBack();
							paper.rect(rect_x, rect_y, 20, (instruction.annotations.xaxis[i].label.text.length*7)+20).attr({
								fill : instruction.annotations.xaxis[i].label.style.background,
								stroke : instruction.annotations.xaxis[i].label.borderColor,
							});
							paper.text(text_x,text_y,(instruction.annotations.xaxis[i].label.text)).attr({
								fill : instruction.annotations.xaxis[i].label.style.color,
								transform : "r270",
							});
							x_area_annotation_count++;
						}
					}
				}
			}
		}
		//y axis annotations
		if(instruction.annotations.yaxis){
			if(instruction.annotations.yaxis.length > 0){
				for(var i = 0; i< instruction.annotations.yaxis.length; i++){
					//Path annotations
					if(instruction.annotations.yaxis[i].y || instruction.annotations.yaxis[i].y == 0){
						if(instruction.annotations.yaxis[i].y < max_value && instruction.annotations.yaxis[i].y > min_value){
							paper.path("M "+ 2*paddingx +" " + ( (height-(2*paddingy)) - ((height-(4*paddingy))*(instruction.annotations.yaxis[i].y - min_value))/max) + " l "+  (width-(4*paddingx)) +" 0").attr({
								stroke : instruction.annotations.yaxis[i].borderColor,
							}).toBack();
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
						}).toBack();
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
	if(instruction.x_axis_hover_design == true){
		for(var i=0; i<1; i++){
			var  p = "M "+ 2*paddingx +" " + 2*paddingy + " l 0 "+  (height-(4*paddingy)) +" 0";
			var path1 = paper.path(p).attr({
				'stroke-width' : .5,
				//"stroke-dasharray": " - ",
				stroke : '#949494',
				opacity : 0,
			});
			elems["px"+i] = path1;
		}
		x_axis_hover_design_flag = 1;
	}
}
// For y axis hover -----------------------------
var y_axis_hover_design_flag = 0;
function y_axis_hover_design(){
	if(instruction.y_axis_hover_design == true){
		for(var i=0; i<instruction.path_no; i++){
			var  p = "M "+ 2*paddingx +" " + ( (height-(2*paddingy))-((height-(4*paddingy))/(y_division_no-1))*i ) + " l "+  (width-(4*paddingx)) +" 0";
			var path1 = paper.path(p).attr({
				'stroke-width' : .5,
				//"stroke-dasharray": " - ",
				stroke : '#949494',
				opacity : 0,
			});
			elems["py"+i] = path1;
		}
		y_axis_hover_design_flag =1;
	}
}
//Draw popup
var popup_design_flag = 0;
function popup_design(){	
	var pop_rect = paper.rect(0, (height - (4*paddingy)), 0, instruction.path_no*30, 2).attr({
		fill : '#fcfcfc',//'#f2f4ff',
		stroke : '#b8b8b8',//'#666666','#90a3ff',
		opacity : 0,
	});	
	pop_rect.blur(1);
	elems["pop_rect"] = pop_rect;
	for(var i=0; i<instruction.path_no; i++){
		var text1 = paper.text(20, /*(15 + (30*i))*/(height - (4*paddingy)), "").attr({
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
	var a = 0, b = 0;
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		if(Object.values(data[id].value)[i].toString().length > a){
			a = (path_details[i].name+" : "+Object.values(data[id].value)[i]).toString().length;
		}
	} 
	a = (a*7)+40;
	//console.log(a);
	if(id<data.length/2){
		if(Math.max(...(Object.values(data[id].value)))>(max/2)){
			//for rect			
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] ,
				y : popup_point_y[id] + 15,
				width : a,
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
					x : popup_point_x[id]+20,
					y : popup_point_y[id] + (15 + (30*i) + 15),
				}, 150);
			}
		}else{
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] ,
				y : popup_point_y[id] - (instruction.path_no*30) - 15,
				width : a,
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
				x : popup_point_x[id] - a,
				y : popup_point_y[id] + 15,
				width : a,
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
					x : popup_point_x[id] + 20 - a,
					y : popup_point_y[id] + (15 + (30*i))  + 15,
				}, 150);
			}
		}else{
			//for rect
			elems["pop_rect"].animate({
				opacity : 1,
				x : popup_point_x[id] - a,
				y : popup_point_y[id] - (instruction.path_no*30) - 15,
				width : a,
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
					x : popup_point_x[id] + 20 - a,
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
		if(elems["c"+i+""+id]){
			elems["c"+i+""+id].animate({
				opacity : 1,
				r : path_details[i].circle_zoom_in,
			},25);
		}
	}
}
//Circle effect on popdown
function circle_popdown(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		if(elems["c"+i+""+id]){
			elems["c"+i+""+id].animate({
				//opacity : 0,
				r : path_details[i].circle_zoom_out,
			},25);
		}
	}
}
//X axis hover
function x_axis_hover(id){
	if(instruction.x_axis_hover_design == true){
		for(var i = 0; i<1; i++){
			var  p  = "M "+ ((2*paddingx)+id*((width-(4*paddingx))/(data.length-1))) +" " + (2*paddingy) + " l 0 "+  ( (height - (4*paddingy)) ) ;
			if(elems["px"+i]){
				elems["px"+i].animate({
					opacity : 1,
					path : p,
				}, 150);
			}		
		}
		
	}
}
//Y axis hover
function y_axis_hover(id){
	if(instruction.y_axis_hover_design == true){
		for(var i = 0; i<parseInt(instruction.path_no); i++){
			var  p  = "M "+ 2*paddingx +" " + ( (height - (2*paddingy)) - ((Object.values(data[id].value)[i] - min_value)*((height-(4*paddingy))/max)) ) + " l "+  (width-(4*paddingx)) +" 0";
			if(elems["py"+i]){
				elems["py"+i].animate({
					opacity : 1,
					path : p,
				}, 150);
			}
		}
	}
	
}
//X axis hover out
function x_axis_hover_out(id){
	for(var i = 0; i<1; i++){
		if(elems["px"+i]){
			elems["px"+i].animate({
				opacity : 0,
			}, 150);
		}
	}
}
//Y axis hover out
function y_axis_hover_out(id){
	for(var i = 0; i<parseInt(instruction.path_no); i++){
		if(elems["py"+i]){
			elems["py"+i].animate({
				opacity : 0,
			}, 150);
		}
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
	if(instruction.select_area == true){
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
	
}
function mousemove(e){
	//console.log(clicked_position+" "+ e.clientX + " : "+ (e.clientX - clicked_position) + " : "+ (clicked_position - e.clientX));
	if(instruction.select_area == true){
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
}
function mouseup(){
	var id = parseInt(this.id.replace('r',''));	
	unclicked_id = id;
	if(instruction.select_area == true){
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
			all_function();
		}
	}
}
