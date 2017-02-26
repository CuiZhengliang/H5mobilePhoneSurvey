/* 折线图对象 */

var H5ComponentPolyline =function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );

  var w = cfg.width;
  var h = cfg.height;
  // 加入画布做网格线背景
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);

  // 水平网格线，10份分割
  var step = 5;
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#aaa';

  window.ctx = ctx;
  // 水平背景线
  for (var i = 0; i < step+1; i++) {
  	var y = (h/step) * i;
  	ctx.moveTo(0,y);
  	ctx.lineTo(w,y);
  }
  // 垂直背景线
  step = cfg.data.length+1;
  var text_w = w/step >> 0;
  for (var i = 0; i < step+1; i++) {
  	var x = (w/step) * i;
  	ctx.moveTo(x,0);
  	ctx.lineTo(x,h);

  	if (cfg.data[i]) {
  		var text = $('<div class="text">');
  		text.text(cfg.data[i][0]);
  		text.css('width',text_w).css('left',x/2);

  		component.append(text);
  	}
  }
  ctx.stroke();
  

  /**
   * @param  {number} per 参数值为0~1之间，作为y坐标的增长控制因子
   * @return {DOM}
   */
	  var cns = document.createElement('canvas');
	  var ctx = cns.getContext('2d');
	  cns.width = ctx.width = w;
	  cns.height = ctx.height = h;

  function drawLine(per) {
  	// 清空画布，仿制线条重叠
  	ctx.clearRect(0,0,w,h);
	  // 绘制数据点
	  ctx.beginPath();
	  ctx.lineWidth = 4;
	  ctx.strokeStyle = '#99c0ff';

	  var x = 0;
	  var y = 0;

	  var row_w = ( w / (cfg.data.length+1) );
	  for (var i = 0; i < cfg.data.length; i++) {
	  	var item = cfg.data[i];
	  	x = row_w * i + row_w;
	  	y = h*(1 - 2*item[1]*per);
	  	ctx.moveTo(x,y);
	  	ctx.arc(x,y,5,0,2*Math.PI);
	  	ctx.stroke();
	  }

	  // 连线
	  ctx.moveTo(row_w, h*(1 - 2*cfg.data[0][1]*per));
	  for (var i = 0; i < cfg.data.length; i++) {
	  	var item = cfg.data[i];
	  	x = row_w * i + row_w;
	  	y = h*(1 - 2*item[1]*per);
	  	ctx.lineTo(x,y);
	  }
	  ctx.stroke();
	  ctx.strokeStyle = 'rgba(51, 102, 153, 0)';
	  // 阴影绘制
	  ctx.lineTo(x,h);
	  ctx.lineTo(row_w,h);
	  ctx.lineTo(row_w,h*(1 - cfg.data[0][1]));

	  ctx.fillStyle = 'rgba(51, 102, 153, 0.5)';
	  ctx.fill();
	  // 写数据
	  
	  for (var i = 0; i < cfg.data.length; i++) {
	  	var item = cfg.data[i];
	  	x = row_w * i + row_w;
	  	y = h*(1 - 2*item[1]*per);
	  	ctx.fillStyle = ( item[2] ? item[2] : '#99c0ff' );
      ctx.font = '12px Verdana';
	  	ctx.fillText( ((10*item[1]).toFixed(0)) + '千万', x-10, y-10);
	  }

	  ctx.stroke();
	  component.append(cns);
  }

  component.on('onLoad',function(){
  	//折线生长动画
  	var s = 0;
  	for (var i = 0; i < 100; i++) {
  		setTimeout(function(){
  			s+=.01;
				drawLine(s);
  		},i*10+500);
  	}
  });
  component.on('onLeave',function(){
  	//折线生长动画
  	var s = 1;
  	for (var i = 0; i < 10; i++) {
  		setTimeout(function(){
  			s-=.1;
				drawLine(s);
  		},i*20);
  	}
  });

  return component;
}