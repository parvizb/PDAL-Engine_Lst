/// <reference path="../../Res/toolkit.js" />



var FeatSelector=new Object();

var currentButton;
FeatSelector.sendFiles=  function()
{
    var data = new FormData();
 
                $('#loadingBar').show();
    $('#fileStatus').show();
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var progress = Math.round(evt.loaded * 100 / evt.total);
            $('#progessStatus').css('width'  , progress + '%');
            $('#progessStatus').attr('aria-valuenow'  , progress *2);
        }
    }, false);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200 ) {
            window.fileUploaded=true;
            $('#loadingBar').hide();
            $('#fileStatus').hide();
            FeatSelector.Submit(currentButton);
        } else {
            if((xhr.status==500) && (xhr.readyState == 4))
            {
                $('#fileStatus').hide();
                $('#loadingBar').hide();
                var dos=document.createElement("s");
                dos.innerHTML=xhr.responseText;
                 
                alert("خطا در ارسال فایل ها" +  dos.getElementsByTagName("title")[0].innerHTML );
                    
            }
         
        }
    };
    xhr.open('POST', "Home/SendFiles?PageName=FeatSelector");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


FeatSelector.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(FeatSelector.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='FeatSelector';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('FeatId',routeParams.FeatId ));
ScallerAjax('ScallerSubmit',Entity,function(data){
        Messager.ShowMessage('اطلاعات', data.Message  );
        
  
 

  
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
 
                    BackPage();
         
     
     
  


    $(obj).attr('disabled',false);
    return;
       
},function(data)
{
    $(obj).attr('disabled',false);
    return;

});
};
FeatSelector.Validate= function()
{
    Validator.ClearErrors();
        
        
    if(Messager.errors.length!=0)
    {
        Validator.ShowErrors();
        return false ;
    }
    
    if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
        return false ;
    }


    return Messager.errors.length==0;
}


FeatSelector.Serach=function(obj,dataP)
{
    $(obj).attr('disabled',true);
    if(dataP==null){
        if(FeatSelector.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=FeatSelector.Serach;
    var Entity=new Object();
    if(dataP===undefined){
    Entity.PageName='FeatSelector';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('FeatId',routeParams.FeatId ));


}
 
TableViewAjax('getTableViewRecords',(dataP!==undefined?dataP: Entity),function(data){
          
    currentScope.FeatSelectorrecords= data.records;
        totalRecords= data.RecordTotal;
    GenPagingLinks();
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.FeatSelectorrecords= data.records;
                  
        dlgScope.$apply(function(){});

    }
            for(var l=0;l<currentScope.FeatSelectorrecords.length;l++)
{ 
    var record=currentScope.FeatSelectorrecords[l];
    if(record.isSet=='1')
    {
        currentScope.FeatSelectorrecords[l].selected=true;
        $('#selected_' + currentScope.FeatSelectorrecords[l].rndId).attr('checked',true);
}
}
$('[type="Select2Ajax"]').each(function(){
    $(this).val($(this).attr('valc'));

});
NormalResult();
        
$(obj).attr('disabled',false);
return;
          
},function(data)
{
    $(obj).attr('disabled',false);
    return;

});


}




window.targetElement=null;



FeatSelector.Apply_Validate=function()
{
    Validator.ClearErrors();
                                                    if(typeof ( currentScope.FeatSelectorrecords)!="undefined") {
    for (var l=0;l<currentScope.FeatSelectorrecords.length;l++)
{
    var r=currentScope.FeatSelectorrecords[l];

        if(r.selected == true){
      continue;
}
if(r.RowState !='Added'){
    continue;
}
}
}
    if(typeof ( currentScope.FeatSelectorrecords)!="undefined") {
    for (var l=0;l<currentScope.FeatSelectorrecords.length;l++)
{
    var r=currentScope.FeatSelectorrecords[l];

        if(r.selected == false){
      continue;
}
}
}
if(typeof ( currentScope.FeatSelectorrecords)!="undefined") {
for(var l=0;l<currentScope.FeatSelectorrecords.length;l++)
{ 
    var record=currentScope.FeatSelectorrecords[l];
    
}
}





if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
FeatSelector.Apply=function()
{ 
    if(  FeatSelector.Apply_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
      
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
        var rec=new Array();//hi
        //YOU ARE ASL
            rec.push(toInput('FeatId', routeParams.FeatId  ) );
informationRecords.push(rec);
t.push(informationRecords);
DataPass.push(t);
  
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.FeatSelectorrecords.length;l++)
{
    var r=currentScope.FeatSelectorrecords[l];

        if(r.selected == false){
      continue;
}
var rec=new Array();//hi


rec.push(toInput('FeatId', routeParams.FeatId  ) );

rec.push(toInput('GamesId', ( r['GameId']===undefined ? "": r['GameId'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                var rec=new Array();//hi
                                        rec.push(toInput('FeatId', routeParams.FeatId  ) );
                        rec.push(toInput('GamesId', ( r['GameId']===undefined ? "": r['GameId'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='FeatSelector';
Enity.CommandName='Apply';
Enity.records=DataPass;
ScallerAjax('BatchCommand',Enity,function(data){

    
    Messager.ShowMessage('اطلاعات', data.Message );
 
     
  
 

    Messager.ShowMessage('اطلاعات', data.Message);
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
    ///you are asl
    if(data.code==0)
    {
        window.returnValue=data.retrunValue;




                      
         
         
     
                        BackPage();
                 
         
    }
    try
    {
        $(obj).attr('disabled',false);
    }
    catch
    {

    }
    return;
},function(data)
{
    try
    {
        $(obj).attr('disabled',false);
    }
    catch
    {

    }
    return;
});
console.log(JSON.stringify(Enity));
}

