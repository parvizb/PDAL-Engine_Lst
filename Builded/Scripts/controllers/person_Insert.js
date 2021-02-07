﻿/// <reference path="../../Res/toolkit.js" />



var person_Insert=new Object();

var currentButton;
person_Insert.sendFiles=  function()
{
    var data = new FormData();
 
                                                                                                    var tmp=$('#txtperson_InsertpicImage')[0];
    if(tmp.files.length>0){
        data.append('picImage', tmp.files[0]);
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
            person_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=person_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}





person_Insert.DownloadNow= function (obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(person_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
 
    var Entity=new Object();
    Entity.PageName='person_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('name',$('#txtperson_Insertname').val()));
    
                    Entity.Parameters.push( toInput('grade',$('#txtperson_Insertgrade').val()));
    
                    Entity.Parameters.push( toInput('cityid',$('#txtperson_Insertcityid').val()));
    
                    Entity.Parameters.push( toInput('sextype',$('#txtperson_Insertsextype').val()));
    
                    Entity.Parameters.push( toInput('salaryBase',$('#txtperson_InsertsalaryBase').val()));
    
                    Entity.Parameters.push( toInput('examResult',$('#txtperson_InsertexamResult').val()));
    
                    Entity.Parameters.push( toInput('dateBrith',$('#txtperson_InsertdateBrith').val()));
    
                    Entity.Parameters.push( toInput('startTime',$('#txtperson_InsertstartTime').val()));
    
                    Entity.Parameters.push( toInput('smailBio',$('#txtperson_InsertsmailBio').val()));
    
                    Entity.Parameters.push( toInput('smailHtml',tinymce.editors['txtperson_InsertsmailHtml'].contentDocument.body.innerHTML));
    
                    Entity.Parameters.push( toInput('favColor',$('#txtperson_InsertfavColor').val()));
    
                    Entity.Parameters.push( toInput('picImage',$('#txtperson_InsertpicImage').val()));
    
                    Entity.Parameters.push( toInput('isBroken', $('#txtperson_InsertisBroken').val()) );
    
        
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

person_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(person_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        {
           
        if(window.fileUploaded!=true)
        {
            person_Insert.sendFiles();
            return ;
        }


    }
        var Entity=new Object();
    Entity.PageName='person_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('name',$('#txtperson_Insertname').val()));
    
                    Entity.Parameters.push( toInput('grade',$('#txtperson_Insertgrade').val()));
    
                    Entity.Parameters.push( toInput('cityid',$('#txtperson_Insertcityid').val()));
    
                    Entity.Parameters.push( toInput('sextype',$('#txtperson_Insertsextype').val()));
    
                    Entity.Parameters.push( toInput('salaryBase',$('#txtperson_InsertsalaryBase').val()));
    
                    Entity.Parameters.push( toInput('examResult',$('#txtperson_InsertexamResult').val()));
    
                    Entity.Parameters.push( toInput('dateBrith',$('#txtperson_InsertdateBrith').val()));
    
                    Entity.Parameters.push( toInput('startTime',$('#txtperson_InsertstartTime').val()));
    
                    Entity.Parameters.push( toInput('smailBio',$('#txtperson_InsertsmailBio').val()));
    
                    Entity.Parameters.push( toInput('smailHtml',tinymce.editors['txtperson_InsertsmailHtml'].contentDocument.body.innerHTML));
    
                    Entity.Parameters.push( toInput('favColor',$('#txtperson_InsertfavColor').val()));
    
                    Entity.Parameters.push( toInput('picImage',$('#txtperson_InsertpicImage').val()));
    
                    Entity.Parameters.push( toInput('isBroken', $('#txtperson_InsertisBroken').val()) );
    
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
person_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtperson_Insertname','نام');
                                                                                                    
                                                                                    
                                                                Validator.CheckRegSelect2('txtperson_Insertcityid','شهر');
                                    
                                                                                    
                                                                Validator.CheckRegInteger('txtperson_InsertsalaryBase','حقوق پایه');
                                                            
                                                        Validator.CheckRegFloat('txtperson_InsertexamResult','نمره آزمون');
                                                            
                                                                                Validator.CheckRegDate('txtperson_InsertdateBrith','تاریخ تولد');
                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                        var tmp=$('#txtperson_InsertpicImage')[0];
        if(tmp.files.length>0)
    {
        if(tmp.files[0].size/1024 > 2048)
        {
            Messager.errors.push(' اندازه فایل در کادر تصویر پرسنلی  بیش از اندازه مجاز یعنی 2048 کیلوبایت می باشد ');
        }
    }
            if(tmp.files.length>0)
    {
        var ex=tmp.files[0].name;
        ex=ex.substring(ex.lastIndexOf('.')+1);
        ex=ex.toLowerCase();
        var isCommit=false;
        var cc=new Array();
                cc.push('jpg'.toLowerCase());
                cc.push('png'.toLowerCase());
                isCommit=cc.indexOf(ex)!=-1;
        if(isCommit==false)
        {
            Messager.errors.push(' پسوند فایل در کادر تصویر پرسنلی  مجاز نیست پسوند های مجاز  ' + JSON.stringify(cc));
  

        }
    }
        
                                                Validator.CheckEmpty('txtperson_InsertpicImage','تصویر پرسنلی');
                                                                    
                                                                                
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


person_Insert.Serach=function(obj,dataP)
{
    $(obj).attr('disabled',true);
    if(dataP==null){
        if(person_Insert.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=person_Insert.Serach;
    var Entity=new Object();
    if(dataP===undefined){
    Entity.PageName='person_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('name',$('#txtperson_Insertname').val()));
    
        

            Entity.Parameters.push( toInput('grade',$('#txtperson_Insertgrade').val()));
    
        

            Entity.Parameters.push( toInput('cityid',$('#txtperson_Insertcityid').val()));
    
        

            Entity.Parameters.push( toInput('sextype',$('#txtperson_Insertsextype').val()));
    
        

            Entity.Parameters.push( toInput('salaryBase',$('#txtperson_InsertsalaryBase').val()));
    
        

            Entity.Parameters.push( toInput('examResult',$('#txtperson_InsertexamResult').val()));
    
        

            Entity.Parameters.push( toInput('dateBrith',$('#txtperson_InsertdateBrith').val()));
    
        

            Entity.Parameters.push( toInput('startTime',$('#txtperson_InsertstartTime').val()));
    
        

            Entity.Parameters.push( toInput('smailBio',$('#txtperson_InsertsmailBio').val()));
    
        

            Entity.Parameters.push( toInput('smailHtml',tinymce.editors['txtperson_InsertsmailHtml'].contentDocument.body.innerHTML));
    
        

            Entity.Parameters.push( toInput('favColor',$('#txtperson_InsertfavColor').val()));
    
        

            Entity.Parameters.push( toInput('picImage',$('#txtperson_InsertpicImage').val()));
    
        

            Entity.Parameters.push( toInput('isBroken', $('#txtperson_InsertisBroken').val()) );
    
        

}
 
TableViewAjax('getTableViewRecords',(dataP!==undefined?dataP: Entity),function(data){
          
    currentScope.person_Insertrecords= data.records;
        totalRecords= data.RecordTotal;
    GenPagingLinks();
        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.person_Insertrecords= data.records;
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




