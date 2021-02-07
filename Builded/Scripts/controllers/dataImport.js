/// <reference path="../../Res/toolkit.js" />



var dataImport=new Object();

var currentButton;
dataImport.sendFiles=  function()
{
    var data = new FormData();
 
            var tmp=$('#txtdataImportfileXls')[0];
    if(tmp.files.length>0){
        data.append('fileXls', tmp.files[0]);
    }
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
            dataImport.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=dataImport");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


dataImport.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(dataImport.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        {
           
        if(window.fileUploaded!=true)
        {
            dataImport.sendFiles();
            return ;
        }


    }
        var Entity=new Object();
    Entity.PageName='dataImport';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('fileXls',$('#txtdataImportfileXls').val()));
    
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
dataImport.Validate= function()
{
    Validator.ClearErrors();
            var tmp=$('#txtdataImportfileXls')[0];
        if(tmp.files.length>0)
    {
        if(tmp.files[0].size/1024 > 3000)
        {
            Messager.errors.push(' اندازه فایل در کادر فایل اکسل  بیش از اندازه مجاز یعنی 3000 کیلوبایت می باشد ');
        }
    }
            if(tmp.files.length>0)
    {
        var ex=tmp.files[0].name;
        ex=ex.substring(ex.lastIndexOf('.')+1);
        ex=ex.toLowerCase();
        var isCommit=false;
        var cc=new Array();
                cc.push('xls'.toLowerCase());
                isCommit=cc.indexOf(ex)!=-1;
        if(isCommit==false)
        {
            Messager.errors.push(' پسوند فایل در کادر فایل اکسل  مجاز نیست پسوند های مجاز  ' + JSON.stringify(cc));
  

        }
    }
        
                                                Validator.CheckEmpty('txtdataImportfileXls','فایل اکسل');
                                                                
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


dataImport.Serach=function(obj,data)
{
    $(obj).attr('disabled',true);
    if(data==null){
        if(dataImport.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=dataImport.Serach;
    var Entity=new Object();
    if(data==null){
    Entity.PageName='dataImport';
    Entity.Parameters=new Array();
                    
         }
TableViewAjax('getTableViewRecords',(data!=null?data: Entity),function(data){
          
    currentScope.dataImportrecords= data.records;
    

        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.dataImportrecords= data.records;
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




