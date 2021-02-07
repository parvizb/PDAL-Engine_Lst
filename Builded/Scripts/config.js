var currentScope=null;
var SelectableRow=null;
var OkDailogSelect=null;
var dlgScope=null;
function DoDailog()
{
    OkDailogSelect(SelectableRow);
    BackPage();

}

function ResetCheck()
{
    $('[tablecheck]').each(function(){
        $(this).attr( 'checked',   angular.element($(this)[0]).scope().record.selected );

    });


}


var mainApp = angular.module("Web_App_Base", ['ngRoute']);
mainApp.controller("dlgController",function ($scope, $routeParams) {
    $scope.ShowBoolean=function(v)
    {
        return ShowBoolean(v);

    }

});
mainApp.controller("mainController",function ($scope, $routeParams) {
    if(currentScope!=null)
    {
        console.log(currentScope.$id); 
    }
 
    currentScope=$scope;
    console.log(currentScope.$id);
    routeParams=$routeParams;
    $scope.ShowBoolean=function(v)
    {
        return ShowBoolean(v);

    }
    $scope.SelectRow=function(a)
    {
        SelectableRow=a;
     

    }
    $scope.SelectNow=function(a)
    {
        $scope.SelectRow(a);
        window.DoDailog();

    }
    $scope.mergeArray=function(a1,b1)
    {
        console.log(a1);
        console.log(b1);
        var keys=   Object.keys(b1);
        for(var i=0;i<keys.length;i++)
        {
            a1[keys[i]]=b1[keys[i]];

        }

    }
    $scope.records=function()
    {
        var d = getDailOpen();
        return $scope[  (d!=""? d : window.pageName) +"records"]; 


    }
    $scope.groupby =function(data ,p )
    {
        var groups =new Array();
        var pindex=new Array();

        if(data===undefined)
        {
            return ;

        }

        if(data.length>0)
        {
            var ke=Object.keys(data[0]);
            for(var g=0;g<p.length;g++)
            {
                pindex.push( ke.indexOf(p[g]));

            }
            var keys=new Array();

            for(var n=0;n<data.length;n++)
            {
                var key="";
                for(var m=0;m<p.length;m++)
                {
                    var re=Object.values(data[n])[pindex[m]];
                    if(key!="")
                    {
                        key+="|" ;
                    }
                    key+=re;
                }
                if(groups[key]===undefined)
                {
                    keys.push(key);
                    groups[key]=new Object();
                    groups[key].subRecords=new Array();
                    groups[key].headers=new Array();
                    for(var m=0;m<p.length;m++)
                    {
                          groups[key].headers[p[m]]=  Object.values(data[n])[pindex[m]];
                         
                    }

                }
                groups[key].subRecords.push(data[n]);
                 
            }
            var results=new Array();
            for(var i=0;i<keys.length;i++)
            {
                results.push(groups[keys[i]]);

            }

            return results;
        }


    }




    $scope.AjaxActions=window.AjaxActions;
    $scope.CheckAll=function(val)
    {
              
           
        $('[tableCheck]').each(function()
        {
            var s=angular.element( $(this)).scope();
                     
            s.record.selected=true;

        });

    }
    $scope.In=window.In;
    $scope.routeParams=window.routeParams;
    $scope.Num=function(v)
    {
      
        if (v == "") {
            return 0;
        }
        
        try
        {
            if(v===undefined)
            {
                return 0;
            }
            v=v.toString();
            return parseFloat(v.replace(/,/g,''));
        }
        catch(ex)
        {
            return 0;

        }
    }
    $scope.GenId=function()
    {

        return   Math.round(Math.random()*500000);

    }
    $scope.Para=window.Para;
    $scope.Sum=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var sum=0;
        for(var l=0;l<currentScope.records().length;l++)
        {
            sum+=$scope.Num(currentScope.records()[l][name]);

        }
        return sum;
    }
    $scope.GroupSum=function(name,data)
    {
       
        if(data===undefined)
        {
            return 0;

        }
        var sum=0;
        for(var l=0;l<data.length;l++)
        {
            sum+=$scope.Num(data[l][name]);

        }
        return sum;
    }
    $scope.Max=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var Max=-9999999999999;
        for(var l=0;l<currentScope.records().length;l++)
        {
            
            var mi=    $scope.Num(currentScope.records()[l][name]);
            if(mi>Max)
            {
                Max=mi;
            }
        }
        return Max;
    }
    $scope.GroupMax=function(name,data)
    {
     
        if(data===undefined)
        {
            return 0;

        }
        var Max=-9999999999999;
        for(var l=0;l<data.length;l++)
        {
            
            var mi=    $scope.Num(data[l][name]);
            if(mi>Max)
            {
                Max=mi;
            }
        }
        return Max;
    }
    $scope.Min=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var Min=9999999999999;
        for(var l=0;l<currentScope.records().length;l++)
        {
            
            var mi=    $scope.Num(currentScope.records()[l][name]);
            if(mi<Min)
            {
                Min=mi;
            }
        }
        return Min
    }
    $scope.GroupMin=function(name,data)
    {
      
        if(data===undefined)
        {
            return 0;

        }
        var Min=9999999999999;
        for(var l=0;l<data.length;l++)
        {
            
            var mi=    $scope.Num(data[l][name]);
            if(mi<Min)
            {
                Min=mi;
            }
        }
        return Min
    }
    $scope.SubSum=function(name)
    {
         
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var sum=0;
        var d = getDailOpen();
           
        $('[fliterrows="' +  (d!=""? d : window.pageName) + 'records"]').each(function () {     var l=angular.element($(this)[0]).scope();
            sum+=  $scope.Num(l.record[name]);
            

        });
   
    
        return sum;
    }
    $scope.Query=window.Query;
    $scope.Avg=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var sum=0;
        var count=0;
        for(var l=0;l<currentScope.records().length;l++)
        {
            sum+=$scope.Num(currentScope.records()[l][name]);
            count+=1;
        }
        return sum/count;
    }
    $scope.GroupAvg=function(name,data)
    {
   
        if(data===undefined)
        {
            return 0;

        }
        var sum=0;
        var count=0;
        for(var l=0;l<data.length;l++)
        {
            sum+=$scope.Num(data[l][name]);
            count+=1;
        }
        return sum/count;
    }
    $scope.Count=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
     
        return currentScope.records().length;
    }
    $scope.GroupCount=function(name,data)
    {
       
        if(data===undefined)
        {
            return 0;

        }
     
        return data.length;
    }
    $scope.$apply();
    $scope.Round=function(v)
    {
        return Math.round(v);


    }
    $scope.ShowMoney=function(v)
    {
  
        try
        {
            if(typeof(v)=='undefined')
            {
                return "-";
            }
       
            return ShowAsMoney(v);
        }
        catch(ex)
        {
            window.xx=v;
            return v;

        }
    };
    $scope.ChageTableOrder =function(colName)
    {
        $scope.currentOrder=colName;
        $scope.rev=  !$scope.rev;
    }
    $scope.RemoveItem=function(item,con)
    {
        console.log(JSON.stringify(item));
        if (con == null) {
            window.currentItem = item;
            ConfirmAsk("آیا مطممن هستید؟", function () { setTimeout('currentScope.RemoveItem(currentItem, "Yes");', 100); });
            return;
        }
        if($scope.DeletedRows===undefined)
        {
            $scope.DeletedRows=new Array();
        }
        if(item.RowState===undefined)
        {
                   
            $scope.DeletedRows.push(     $scope.records().splice(  $scope.records().indexOf(item),1)[0])
        }
        else
        {
            if(item.RowState==='Added')
            {
                $scope.records().splice(  $scope.records().indexOf(item),1);

            }
            else
            {
                item.RowState='Deleted';
                $scope.DeletedRows.push(     $scope.records().splice(  $scope.records().indexOf(item),1)[0])
            }
        }
        if(con!=null)
        {
            currentScope.$apply({});

        }
    }
    $scope.NormalResult=window.NormalResult;
    
    $scope.MergeNow=window.MergeNow;
    $scope.ChangeState=function(item)
    {
        console.log("ChangeState",item.RowState);
        window.lastRecord=item;
        if(item.RowState===undefined)
        {
            item.RowState='Changed';
        }
        if(item.RowState=='NoChange')
        {
            item.RowState='Changed';
        }
        console.log("ChangeState",item.RowState);
    }
    GenStyleForTableResponse();

});

var routeParams=null;
mainApp.config(['$routeProvider',
function ($routeProvider/*, $locationProvider*/) {
    //$locationProvider.hashPrefix('!');
    $routeProvider.
                
    when('/SimpleTable1', {
        templateUrl: 'SimpleTable1.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable2', {
        templateUrl: 'SimpleTable2.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable3', {
        templateUrl: 'SimpleTable3.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable4', {
        templateUrl: 'SimpleTable4.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable5', {
        templateUrl: 'SimpleTable5.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable6', {
        templateUrl: 'SimpleTable6.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable7', {
        templateUrl: 'SimpleTable7.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable8', {
        templateUrl: 'SimpleTable8.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable9', {
        templateUrl: 'SimpleTable9.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable10', {
        templateUrl: 'SimpleTable10.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable11', {
        templateUrl: 'SimpleTable11.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable12', {
        templateUrl: 'SimpleTable12.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable13', {
        templateUrl: 'SimpleTable13.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable14', {
        templateUrl: 'SimpleTable14.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable16', {
        templateUrl: 'SimpleTable16.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable17', {
        templateUrl: 'SimpleTable17.htm',
        controller: 'mainController' }
            ).
    
                
    when('/SimpleTable18', {
        templateUrl: 'SimpleTable18.htm',
        controller: 'mainController' }
            ).
    
                
    when('/person_Serach', {
        templateUrl: 'person_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/person_Insert', {
        templateUrl: 'person_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/person_Edit/:id', {
        templateUrl: 'person_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/Scaller1', {
        templateUrl: 'Scaller1.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Scaller2', {
        templateUrl: 'Scaller2.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Scaller3', {
        templateUrl: 'Scaller3.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Scaller4', {
        templateUrl: 'Scaller4.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Scaller5', {
        templateUrl: 'Scaller5.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Scaller6', {
        templateUrl: 'Scaller6.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Scaller7', {
        templateUrl: 'Scaller7.htm',
        controller: 'mainController' }
            ).
    
                
    when('/OtherInformation', {
        templateUrl: 'OtherInformation.htm',
        controller: 'mainController' }
            ).
    
                
    when('/UsingIcon', {
        templateUrl: 'UsingIcon.htm',
        controller: 'mainController' }
            ).
    
                
    when('/PoivtTable', {
        templateUrl: 'PoivtTable.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Paging', {
        templateUrl: 'Paging.htm',
        controller: 'mainController' }
            ).
    
                
    when('/CustomView', {
        templateUrl: 'CustomView.htm',
        controller: 'mainController' }
            ).
    
                
    when('/DownloadTest', {
        templateUrl: 'DownloadTest.htm',
        controller: 'mainController' }
            ).
    
                
    when('/GroupBySample', {
        templateUrl: 'GroupBySample.htm',
        controller: 'mainController' }
            ).
    
                
    when('/DailogSample', {
        templateUrl: 'DailogSample.htm',
        controller: 'mainController' }
            ).
    
                
    when('/DailogUse', {
        templateUrl: 'DailogUse.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Select2', {
        templateUrl: 'Select2.htm',
        controller: 'mainController' }
            ).
    
                when('/welcome', {
        templateUrl: 'welcome.html',
        controller: 'mainController'}
    
    );
}]);


