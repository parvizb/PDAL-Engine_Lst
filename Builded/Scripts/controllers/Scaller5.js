﻿/// <reference path="../../Res/toolkit.js" />



var Scaller5=new Object();

var currentButton;
Scaller5.sendFiles=  function()
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
            Scaller5.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Scaller5");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}





Scaller5.DownloadNow= function (obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Scaller5.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
 
    var Entity=new Object();
    Entity.PageName='Scaller5';
    Entity.Parameters=new Array();
    
var urlx="/Home/DownloadNow?PageName="  + Entity.PageName + "&Params=";
if(Entity.Parameters.length!=0)
{
    for(var i=0;i<Entity.Parameters.length;i++)
    {
        urlx+=Entity.Parameters[i].key + "|" + Entity.Parameters[i].value +"|";

    }

}

window.open(urlx);
 
$(obj).attr('disabled',false);
}

Scaller5.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Scaller5.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Scaller5';
    Entity.Parameters=new Array();
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
Scaller5.Validate= function()
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


Scaller5.Serach=function(obj,dataP)
{
    $(obj).attr('disabled',true);
    if(dataP==null){
        if(Scaller5.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=Scaller5.Serach;
    var Entity=new Object();
    if(dataP===undefined){
    Entity.PageName='Scaller5';
    Entity.Parameters=new Array();
    }
 
TableViewAjax('getTableViewRecords',(dataP!==undefined?dataP: Entity),function(data){
          
    currentScope.Scaller5records= data.records;
        totalRecords= data.RecordTotal;
    GenPagingLinks();
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Scaller5records= data.records;
                  
        dlgScope.$apply(function(){});

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




