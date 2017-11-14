//npm install mongodb --save-dev
var mysql = require('mysql');

//联接 mysql 服务器
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'datatest',
    user: 'root',
    password: '',
});


connection.connect();
console.log('连接数据库');
//table:查询表，data：查询信息，callback:回调函数
module.exports = {
    getData: function(table, callback){
        connection.query("SELECT * FROM" +' '+ table, function(err, result){
            if (err) {
                console.log(err)
            } else {
                callback(result);
            } 
        })
    },
    //查询:SELECT data FROM table
    query: function(table, data, callback) {
        connection.query("SELECT" +' '+ data +' '+ "FROM" + ' '+table, function(err, result) {

            if (err) {
                console.log(err)
            } else {
                callback(result);
            } 
        
        });
    },
    //搜索
/*    
    
    //分页
   
    //更新
    
    //删除
    
    //查询：SELECT data FROM table WHERE key="need"
    queryFrom: function(table, data, key, needData, callback) {
        var str = 'SELECT' +' '+ data + ' '+'FROM' +' '+table +' '+'WHERE' +' '+key +'=' + needData;
        console.log(str)
        connection.query(str, function(err, result) {
            if (err) {
                console.log('查询出错！')
            } else {
                callback(result);
            }
        });        
    },
    queryCashier: function(barcode,callback){
        connection.query("SELECT * FROM goodsinfor INNER JOIN goodsprice ON goodsinfor.goodsId = goodsprice.goodsId WHERE goodsinfor.codeStr = "+barcode,function(err, result){
             if (err) {
                 console.log('查询出错！')
            } else {
                callback(result);
            }
        });
    },
     //模糊查询：SELECT data FROM table WHERE key like '%needData%'
    queryAbout: function(table, data, key, needData, callback) {
        var str = 'SELECT' +' '+ data + ' '+'FROM' +' '+table +' '+'WHERE' +' '+key +' '+'like' +' '+"'%"+ needData +"%'";
        console.log(str)
        connection.query(str, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                callback(result);
            }
        });


    },

    //分页
    paging: function(table, startNum, Num, callback) {
        var queryData = 'SELECT SQL_CALC_FOUND_ROWS *' +' '+ 'FROM' + ' '+ table +' '+'limit'+' '+ startNum + ','+ Num;
        connection.query(queryData, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                callback(result);
            } 
        
        });
    },
    //获取表的总数
    account: function(callback){
         connection.query('SELECT FOUND_ROWS()', function(err, result) {
            if (err) {
                console.log(err)
            } else {
                callback(result);
            } 
        
        });
    },
    
    //修改,UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing',WHERE LastName = 'Wilson'
    update: function(id,arr,callback) {
        var updateStr = 'UPDATE goodsinfor SET name=?,specifi=?,codeStr=?,place=?,discount=?,type=? WHERE goodsId='+ id;
        console.log(updateStr);
        console.log(arr)
        var _arr = [10,2,4,5,9,19]
         connection.query(updateStr,arr, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                callback(result);
            } 
        
        });
    },
    //根据ID删除,适合各种id
      yedelete: function(table, key, serData, callback) {
        var delStr = 'DELETE FROM ' +' '+ table +' '+' WHERE ' +' '+key + '=' + serData;
        console.log(delStr);
        connection.query(delStr, function(err,result){
            if(err){
                console.log('删除出错')
            }else{
                callback(result);
            }
        })
    },*/



}