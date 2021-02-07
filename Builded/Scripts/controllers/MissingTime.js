/// <reference path="../../Res/toolkit.js" />



var MissingTime=new Object();

var currentButton;
MissingTime.sendFiles=  function()
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
            MissingTime.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=MissingTime");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


MissingTime.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(MissingTime.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='MissingTime';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('prsName',$('#txtMissingTimeprsName').val()));
    
                    Entity.Parameters.push( toInput('startDate',$('#txtMissingTimestartDate').val()));
    
                    Entity.Parameters.push( toInput('toDate',$('#txtMissingTimetoDate').val()));
    
                    Entity.Parameters.push( toInput('startTime',$('#txtMissingTimestartTime').val()));
    
                    Entity.Parameters.push( toInput('endTime',$('#txtMissingTimeendTime').val()));
    
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
MissingTime.Validate= function()
{
    Validator.ClearErrors();
        
                                                                Validator.CheckRegInteger('txtMissingTimeprsName','شماره پرسنلی');
                                                            
                                                                                Validator.CheckRegDate('txtMissingTimestartDate','از تاریخ');
                                    
                                                                                Validator.CheckRegDate('txtMissingTimetoDate','تا تاریخ');
                                    
                                                                                    
                                                                                
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


MissingTime.Serach=function(obj,data)
{
    $(obj).attr('disabled',true);
    if(data==null){
        if(MissingTime.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=MissingTime.Serach;
    var Entity=new Object();
    if(data==null){
    Entity.PageName='MissingTime';
    Entity.Parameters=new Array();
                    
                        
                        
                        
                        
         }
TableViewAjax('getTableViewRecords',(data!=null?data: Entity),function(data){
          
    currentScope.MissingTimerecords= data.records;
    

        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.MissingTimerecords= data.records;
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




