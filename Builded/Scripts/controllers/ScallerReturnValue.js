﻿/// <reference path="../../Res/toolkit.js" />



var ScallerReturnValue=new Object();

var currentButton;
ScallerReturnValue.sendFiles=  function()
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
            ScallerReturnValue.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ScallerReturnValue");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ScallerReturnValue.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ScallerReturnValue.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ScallerReturnValue';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('cityTitle',$('#txtScallerReturnValuecityTitle').val()));
    
                    Entity.Parameters.push( toInput('CITYPop',$('#txtScallerReturnValueCITYPop').val()));
    
        ScallerAjax('ScallerSubmit',Entity,function(data){
        Messager.ShowMessage('اطلاعات', data.Message + ' شناسه پیگیری : ' + data.retrunValue );
        
  
 

  
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
ScallerReturnValue.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtScallerReturnValuecityTitle','عنوان');
                                                                                                    
        
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


ScallerReturnValue.Serach=function(obj,data)
{
    $(obj).attr('disabled',true);
    if(data==null){
        if(ScallerReturnValue.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=ScallerReturnValue.Serach;
    var Entity=new Object();
    if(data==null){
    Entity.PageName='ScallerReturnValue';
    Entity.Parameters=new Array();
                    
                        
         }
TableViewAjax('getTableViewRecords',(data!=null?data: Entity),function(data){
          
    currentScope.ScallerReturnValuerecords= data.records;
    

        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.ScallerReturnValuerecords= data.records;
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




