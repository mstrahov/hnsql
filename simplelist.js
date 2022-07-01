var SimpleListItem = function(texttostore="", itemname="", itemid=0){
	return {
		itemtext : texttostore,
		createdate : new Date,
		fromdb : false, 
		itemid : itemid,
		itemname : itemname,
		updatedate: new Date,		
	}
}

var SimpleListFactory = function() {
	return {
		itemlist: [],
		additem : function(texttostore="", itemname="", itemid=0){
				/*  add only non-duplicate text   */
				let existing = this.itemlist.find(v=>v.itemtext===texttostore);
				if (!existing) {
					this.itemlist.push(SimpleListItem(texttostore,itemname,itemid));
				} else {
					existing.updatedate=new Date;
				};
			},	
		additems : function(...items){
			items.forEach(v=>this.additem(v));
		},
	}	
}

var SimpleListOutput = function(simplelisttoshow, rootelementid, elementstohidearr=null) {
	
	return {
		simplelist: simplelisttoshow,
		rootelement: document.getElementById(rootelementid),
		elementstohide: elementstohidearr,
		idelementprefix: Math.floor(Math.random() * 1000).toString(),
		show: function(eventcallback) {
			if (this.elementstohide!==null) {
				this.elementstohide.forEach(v=>document.getElementById(v).style.display = 'none');
			}
			this.rootelement.innerHTML = "";
			this.rootelement.style.display = 'block';
			
			this.simplelist.itemlist.sort((a,b)=>{return b.updatedate.valueOf()!==a.updatedate.valueOf()?b.updatedate.valueOf()-a.updatedate.valueOf():this.simplelist.itemlist.findIndex(v=>v===b)-this.simplelist.itemlist.findIndex(v=>v===a)}).forEach(v=>{
				
				let itemindex = this.simplelist.itemlist.findIndex(i=>i===v);
				
				let newHolderElement = document.createElement('div');
				let newHolderElementId = 'listitem'+this.idelementprefix+"_"+itemindex;
				newHolderElement.setAttribute('id',newHolderElementId);
				newHolderElement.setAttribute('class','listitemholder');
						
				let newElementTopLine = document.createElement('div');
				newElementTopLine.setAttribute('class','listtopline');
				let HTMLline = '';
				
				if (v.itemid>0) {
					HTMLline += '<a href="https://news.ycombinator.com/item?id=' + v.itemid + '">' + v.itemid + '</a>';
				}
				if (v.itemname!=="") {
					HTMLline += '&nbsp;&nbsp;' + v.itemname; /* + '&nbsp;&nbsp;' + v.updatedate.toUTCString();  */
					
				}
				newElementTopLine.innerHTML = HTMLline;
				newHolderElement.appendChild(newElementTopLine);
				
				let newTextElement = document.createElement('div');
				let newTextElementid = 'listtextfield'+this.idelementprefix+"_"+itemindex;
				newTextElement.innerHTML = '<xmp>' + v.itemtext +'</xmp>';
				newTextElement.setAttribute('id',newTextElementid);
				newTextElement.setAttribute('class','listtextfield');
				
				newHolderElement.appendChild(newTextElement);
				this.rootelement.appendChild(newHolderElement); 

				if (eventcallback!==undefined) {
					document.getElementById(newTextElementid).addEventListener("click", eventcallback, true);					
				}
				
			});
			
	
		},
		hide: function() {
			this.rootelement.style.display = 'none';
			if (this.elementstohide!==null) {
				this.elementstohide.forEach(v=>document.getElementById(v).style.display = 'block');
			}
			
		},
		
		
	}
	
	
}