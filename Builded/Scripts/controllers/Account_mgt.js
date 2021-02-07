/// <reference path="../../Res/toolkit.js" />



var Account_mgt=new Object();

var currentButton;
Account_mgt.sendFiles=  function()
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
            Account_mgt.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Account_mgt");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Account_mgt.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Account_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Account_mgt';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('PAccId',routeParams.pid ));
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
Account_mgt.Validate= function()
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


Account_mgt.Serach=function(obj,dataP)
{
    $(obj).attr('disabled',true);
    if(dataP==null){
        if(Account_mgt.Validate()==false)
        {
            $(obj).attr('disabled',false);
            return ;
        }
    }
    window.CurrentSerachMethod=Account_mgt.Serach;
    var Entity=new Object();
    if(dataP===undefined){
    Entity.PageName='Account_mgt';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('PAccId',routeParams.pid ));
}
 
TableViewAjax('getTableViewRecords',(dataP!==undefined?dataP: Entity),function(data){
          
    currentScope.Account_mgtrecords= data.records;
    

          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Account_mgtrecords= data.records;
                  
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


Account_mgt.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.Account_mgtrecords.push(temp);
    currentScope.$apply();
                                                    
}

Account_mgt.Save_Validate=function()
{
    Validator.ClearErrors();
                                                                                                                                    if(typeof ( currentScope.Account_mgtrecords)!="undefined") {
    for (var l=0;l<currentScope.Account_mgtrecords.length;l++)
{
    var r=currentScope.Account_mgtrecords[l];

    if(r.RowState !='Added'){
    continue;
}
   
Validator.CheckEmpty('AccName_' + r.rndId,'عنوان حساب',r.viewIndex+1);
}
}
    if(typeof ( currentScope.Account_mgtrecords)!="undefined") {
    for (var l=0;l<currentScope.Account_mgtrecords.length;l++)
{
    var r=currentScope.Account_mgtrecords[l];

    if(r.RowState !='Changed'){
    continue;
}
   
Validator.CheckEmpty('AccId_' + r.rndId,'شناسه حساب',r.viewIndex+1);
   
Validator.CheckEmpty('AccName_' + r.rndId,'عنوان حساب',r.viewIndex+1);
}
}
    if(typeof ( currentScope.Account_mgtrecords)!="undefined") {
    for (var l=0;l<currentScope.Account_mgtrecords.length;l++)
{
    var r=currentScope.Account_mgtrecords[l];

    if(r.RowState !='Deleted'){
    continue;
}
   
Validator.CheckEmpty('AccId_' + r.rndId,'شناسه حساب',r.viewIndex+1);
}
}
if(typeof ( currentScope.Account_mgtrecords)!="undefined") {
for(var l=0;l<currentScope.Account_mgtrecords.length;l++)
{ 
    var record=currentScope.Account_mgtrecords[l];
    
}
}





if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
Account_mgt.Save=function()
{ 
    if(  Account_mgt.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
      
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.Account_mgtrecords.length;l++)
{
    var r=currentScope.Account_mgtrecords[l];

    if(r.RowState !='Added'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('AccCode', ( r['AccCode']===undefined ? "": r['AccCode'])  ));

rec.push(toInput('AccName', ( r['AccName']===undefined ? "": r['AccName'])  ));

rec.push(toInput('PAccId', routeParams.pid  ) );
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                if(r.RowState !='Added'){
            continue;
        }
                var rec=new Array();//hi
                                rec.push(toInput('AccCode', ( r['AccCode']===undefined ? "": r['AccCode'])  ));
                                        rec.push(toInput('AccName', ( r['AccName']===undefined ? "": r['AccName'])  ));
                                                rec.push(toInput('PAccId', routeParams.pid  ) );
informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
  
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.Account_mgtrecords.length;l++)
{
    var r=currentScope.Account_mgtrecords[l];

    if(r.RowState !='Changed'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('AccId', ( r['AccId']===undefined ? "": r['AccId'])  ));

rec.push(toInput('AccCode', ( r['AccCode']===undefined ? "": r['AccCode'])  ));

rec.push(toInput('AccName', ( r['AccName']===undefined ? "": r['AccName'])  ));

rec.push(toInput('PAccId', routeParams.pid  ) );
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                if(r.RowState !='Changed'){
            continue;
        }
                var rec=new Array();//hi
                                rec.push(toInput('AccId', ( r['AccId']===undefined ? "": r['AccId'])  ));
                                        rec.push(toInput('AccCode', ( r['AccCode']===undefined ? "": r['AccCode'])  ));
                                        rec.push(toInput('AccName', ( r['AccName']===undefined ? "": r['AccName'])  ));
                                                rec.push(toInput('PAccId', routeParams.pid  ) );
informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
  
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.Account_mgtrecords.length;l++)
{
    var r=currentScope.Account_mgtrecords[l];

    if(r.RowState !='Deleted'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('AccId', ( r['AccId']===undefined ? "": r['AccId'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                if(r.RowState !='Deleted'){
            continue;
        }
                var rec=new Array();//hi
                                rec.push(toInput('AccId', ( r['AccId']===undefined ? "": r['AccId'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='Account_mgt';
Enity.CommandName='Save';
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

