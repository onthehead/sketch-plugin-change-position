function allMove(context){
	movSels(context, false, "Move");
};
function allDup(context){
	movSels(context, true, "Copy");
};

function movSels(context, cd, bt){
	var doc = context.document;
	var sels = context.selection;
	if (sels.count() > 0){
		var dist = getDefBounds(sels);
		var ui = [COSAlertWindow new];
			ui.setMessageText("Change Position");
			ui.addTextLabelWithValue("Position X: " + dist.x);
			ui.addTextFieldWithValue(dist.x);
			ui.addTextLabelWithValue("Position Y: " + dist.y);
			ui.addTextFieldWithValue(dist.y);
			ui.addTextLabelWithValue("Add X: ");
			ui.addTextFieldWithValue(0);
			ui.addTextLabelWithValue("Add Y: ");
			ui.addTextFieldWithValue(0);
			ui.addButtonWithTitle(bt);
			ui.addButtonWithTitle("Cancel");
		var tfX = ui.viewAtIndex(1);
		var tfY = ui.viewAtIndex(3);
		var tfAddX = ui.viewAtIndex(5);
		var tfAddY = ui.viewAtIndex(7);
		tfX.setNextKeyView(tfY);
		tfY.setNextKeyView(tfAddX);
		tfAddX.setNextKeyView(tfAddY);
		tfAddY.setNextKeyView(tfX);
		ui.alert().window().setInitialFirstResponder(tfX);
		
		var res = ui.runModal();
	
		var moveX = tfX.stringValue() - dist.x;
		var moveY = tfY.stringValue() - dist.y;
		var addX = parseFloat(tfAddX.stringValue());
		var addY = parseFloat(tfAddY.stringValue());
		
		
		
		for (var i = 0; i < sels.count(); i++){
			var tar;
			if (cd === true){
				tar = sels[i].duplicate();
			} else {
				tar = sels[i];
			}
			tar.frame().left = tar.frame().left() + moveX + addX;
			tar.frame().top = tar.frame().top() + moveY + addY;
			if (cd === true){
				sels[i].select_byExpandingSelection(false, true);
				tar.select_byExpandingSelection(true, true);
			} else {
				tar.select_byExpandingSelection(false, true);
				tar.select_byExpandingSelection(true, true);
			}
		}
	}
	
	function getDefBounds(arr){
		var arrX = [];
		var arrY = [];
		var arrW = [];
		var arrH = [];
		for (var i = 0; i < arr.count(); i++) {
			var x = arr[i].frame().left();
			var w = x + arr[i].frame().width();
			var y = arr[i].frame().top();
			var h = y + arr[i].frame().height();
			arrX.push(x);
			arrW.push(w);
			arrY.push(y);
			arrH.push(h);
		}
		var numX = Math.min.apply(null, arrX);
		var numW = Math.max.apply(null, arrW);
		var numY = Math.min.apply(null, arrY);
		var numH = Math.max.apply(null, arrH);
		var obj = {}
			obj.x = numX;
			obj.y = numY;
			obj.w = numW - numX;
			obj.h = numH - numY;
		return obj;
	}
}