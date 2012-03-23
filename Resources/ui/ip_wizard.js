IpWizard = function(cb) {
	var win = Ti.UI.createWindow({
		title:'Server Address',
		fullscreen: true,
		backgroundColor: 'black'
	});
	
	var label = Ti.UI.createLabel({
		text: 'Enter your server address',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:16,
			fontWeight:'bold'
		},
		shadowColor:'#4C4C4C',
		shadowOffset:{x:1,y:1},
		color:"white",
		top: 60,
		textAlign:"center",
		width:"auto",
		height: 150
	});
	
	var http = Ti.UI.createLabel({
		text: 'http://',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:16,
			fontWeight:'bold'
		},
		shadowColor:'#4C4C4C',
		shadowOffset:{x:1,y:1},
		color:"white",
		top: 170,
		left:"35%"
	});
	
	var ip = Ti.UI.createTextField({
		paddingLeft:5,
		borderRadius:4,
    width:250,  
    height:35, 
    hintText:'IP Address',
		backgroundColor: "#ffffff",
    keyboardType:Ti.UI.KEYBOARD_EMAIL,  
    returnKeyType:Ti.UI.RETURNKEY_NEXT,
		top:170
	});
	
	var ok = Ti.UI.createButton({
		backgroundImage:'/images/empty_button.png',
		height:40,
		width:80,
		top: 230,
		title:"Ok",
		color: "#ffffff"
	});
	
	win.add(label);
	win.add(ip);
	win.add(http);
	win.add(ok);
	
	
	var doLogin = function() {
		if(isAndroid) {
			cb(ip.value);
			win.close();
		} else {
			win.close();
			setTimeout(function(){
				cb(ip.value);
			}, 1000);
		}
		
	}

	ok.addEventListener('click', doLogin);
		
	win.open();
}
