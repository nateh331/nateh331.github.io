//generates grid with input fields
function createGrid(rows, cols){
    $('#rows').val(rows);
    $('#cols').val(cols);
    var grid="<tr><td></td>";
    for(var a=0;a<cols;a++){
        grid += '<td style="height:150px; width: 50px; max-width:50px"><input type="search" style="rotate: 90deg; height: 50px; width: 150px; margin-left:-50px" class="cellCol" id="col'+a.toString().padStart(2, '0')+'"></input></td>';
    }
    grid += '</tr>'
    
    for(var i=0;i<rows;i++){
        grid += '<tr>';
        grid += '<td><input type="search" style="height: 50px" class="cellRow" id="row'+i.toString().padStart(2, '0')+'"></input></td>';
        for(var j=0;j<cols;j++){
            grid += '<td id="row-'+i.toString().padStart(2, '0')+'col-'+j.toString().padStart(2, '0')+'" class="cell empty"></td>';
            //grid += '<td id="row-'+i+'col-'+j+'" class="cell empty">(' + i + ',' + j + ')</td>';
        }
        grid += '</tr>';
    }
    $('#grid').html(grid);
}

createGrid(5,5);

//clear the grid
function clearGrid(){
    $('.cell').each(function(){
        $(this).addClass('empty');
        $(this).removeClass('full');
        $(this).removeClass('locked');
    });
}

//function to toggle cells
$('#grid').on('click', '.cell', function(){
    if($(this).hasClass('empty')){
        $(this).addClass('full');
        $(this).removeClass('empty');
        $(this).removeClass('locked');
    }else{
        $(this).addClass('empty');
        $(this).removeClass('full');
    }
});

//funtion to generate grid on click
$('#generategrid').click(function(){
    createGrid($('#rows').val(),$('#cols').val());
});

//print and read row values
function printRows(){
    var str="";

    $('.cellRow').each(function(){
        str+=$(this).attr('id');
        str+=": ";
        str+=$(this).val().split(',');
        str+="\n";
    });

    alert(str);
}

//read single input row
function readRow(row){
    var grid=[];

    $('.cellRow').each(function(){
        if($(this).val()==""){
            grid.push([0]);
        }else{
            var str_nums = $(this).val().split(',');
            var nums = [];
            for(var i=0; i < str_nums.length;i++){
                if(parseInt(str_nums[i]) != 0){
                    nums.push(parseInt(str_nums[i]));
                }
            }
            if(nums.length == 0){
                grid.push([0]);
            }else{
                grid.push(nums);
            }
        }
    });

    //alert("readRows:" + JSON.stringify((grid)));
    return grid[row];
}

function readRows(){
    var grid=[];

    $('.cellRow').each(function(){
        if($(this).val()==""){
            grid.push([0]);
        }else{
            var str_nums = $(this).val().split(',');
            var nums = [];
            for(var i=0; i < str_nums.length;i++){
                if(parseInt(str_nums[i]) != 0 && isNaN(parseInt(str_nums[i])) == false){
                    nums.push(parseInt(str_nums[i]));
                }
            }
            if(nums.length == 0){
                grid.push([0]);
            }else{
                grid.push(nums);
            }
        }
    });

    //alert("readRows:" + JSON.stringify((grid)));
    return grid;
}

//link button to read rows
$('#readrows').click(function(){
    printRows();
    readRows();
});

//print and read col values
function printCols(){
    var str="";

    $('.cellCol').each(function(){
        str+=$(this).attr('id');
        str+=": ";
        str+=$(this).val().split(',');
        str+="\n";
    });

    alert(str);
}

//read single input col
function readCol(col){
    var grid=[];

    $('.cellCol').each(function(){
        if($(this).val()==""){
            grid.push([0]);
        }else{
            var str_nums = $(this).val().split(',');
            var nums = [];
            for(var i=0; i < str_nums.length;i++){
                if(parseInt(str_nums[i]) != 0){
                    nums.push(parseInt(str_nums[i]));
                }
            }
            if(nums.length == 0){
                grid.push([0]);
            }else{
                grid.push(nums);
            }
        }
    });

    return grid[col];
}

function readCols(){
    var grid=[];

    $('.cellCol').each(function(){
        if($(this).val()==""){
            grid.push([0]);
        }else{
            var str_nums = $(this).val().split(',');
            var nums = [];
            for(var i=0; i < str_nums.length;i++){
                if(parseInt(str_nums[i]) != 0 && isNaN(parseInt(str_nums[i])) == false){
                    nums.push(parseInt(str_nums[i]));
                }
            }
            if(nums.length == 0){
                grid.push([0]);
            }else{
                grid.push(nums);
            }
        }
    });

    //alert("readCols:" + JSON.stringify((grid)));
    return grid;
}

//link button to read cols
$('#readcols').click(function(){
    printCols();
    readCols();
});

//read grid Rows
function readGridRow(row){
    var arr = []
    var current = 0;
    //generates array for grid row
    $("td[id*='row-"+row.toString().padStart(2, '0')+"']").each(function(){
        if($(this).hasClass("full")){
            current += 1;
        }else{
            arr.push(current);
            current = 0;
        }
    });

    if(current != 0){
        arr.push(current);
    }

    //removes zero's
    arr = arr.filter(function(val){
        return val !==0;
    });

    //fill with a zero if empty
    if(arr.length == 0){
        arr.push(0);
    }

    //alert(JSON.stringify(arr));
    return arr;
}

//link button to read grid rows
$('#readgridrows').click(function(){
    readGridRows();
});

//generate grid row list
function readGridRows(){
    len = readRows().length;
    grid = [];

    for(var i=0; i<len; i++){
        grid.push(readGridRow(i));
    }
    
    //alert("readGridRows:" + JSON.stringify(grid));
    return grid;
}
//check single row input v grid
function checkRow(row){
    //alert("readgridrow: "+JSON.stringify(readGridRow(row)));
    //alert("readrow: "+JSON.stringify(readRow(row)));
    if(JSON.stringify(readGridRow(row))==JSON.stringify(readRow(row))){
        //alert("solved");
        return true;
    }else{
        //alert("nope");
        return false;
    }
}

//check input rows vs grid rows
function checkRows(){
    if(JSON.stringify(readGridRows())==JSON.stringify(readRows())){
        //alert("solved");
        return true;
    }else{
        //alert("nope");
        return false;
    }
}

//link button to check grid rows
$('#checkrows').click(function(){
    checkRows();
});

//read grid Col
function readGridCol(col){
    var arr = []
    var current = 0;
    //generates array for grid col
    $("td[id*='col-"+col.toString().padStart(2, '0')+"']").each(function(){
        if($(this).hasClass("full")){
            current += 1;
        }else{
            arr.push(current);
            current = 0;
        }
    });

    if(current != 0){
        arr.push(current);
    }

    //removes zero's
    arr = arr.filter(function(val){
        return val !==0;
    });

    //fill with a zero if empty
    if(arr.length == 0){
        arr.push(0);
    }

    //alert(arr);
    return arr;
}

//link button to read grid cols
$('#readgridcols').click(function(){
    readGridCols();
});

//generate grid col list
function readGridCols(){
    len = readCols().length;
    grid = [];

    for(var i=0; i<len; i++){
        grid.push(readGridCol(i));
    }
    
    //alert("readGridCols:" + JSON.stringify(grid));
    return grid;
}

//check single col input v grid
function checkCol(col){
    //alert("readgridrow: "+JSON.stringify(readGridRow(row)));
    //alert("readrow: "+JSON.stringify(readRow(row)));
    if(JSON.stringify(readGridCol(col))==JSON.stringify(readCol(col))){
        //alert("solved");
        return true;
    }else{
        //alert("nope");
        return false;
    }
}

//check input cols vs grid cols
function checkCols(){
    if(JSON.stringify(readGridCols())==JSON.stringify(readCols())){
        //alert("solved");
        return true;
    }else{
        //alert("nope");
        return false;
    }
}

//link button to check grid rows
$('#checkcols').click(function(){
    checkCols();
});

//check if solved
function checkSolved(){
    if(checkCols() && checkRows()){
        alert("solved");
        return true;
    }else{
        //alert("nah dawg");
        return false;
    }
}

//link button to check if solved
$('#checksolved').click(function(){
    checkSolved();
});

//stole from https://stackoverflow.com/questions/40264376/get-all-the-possible-unique-permutations
function swap(a, i, j) {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
}

function reverseSuffix(a, start) {
    if (start === 0) {
        a.reverse();
    }
    else {
        let left = start;
        let right = a.length - 1;

        while (left < right)
            swap(a, left++, right--);
    }
}

function nextPermutation(a) {
    // 1. find the largest index `i` such that a[i] < a[i + 1].
    // 2. find the largest `j` (> i) such that a[i] < a[j].
    // 3. swap a[i] with a[j].
    // 4. reverse the suffix of `a` starting at index (i + 1).
    //
    // For a more intuitive description of this algorithm, see:
    //   https://www.nayuki.io/page/next-lexicographical-permutation-algorithm
    const reversedIndices = [...Array(a.length).keys()].reverse();

    // Step #1; (note: `.slice(1)` maybe not necessary in JS?)
    const i = reversedIndices.slice(1).find(i => a[i] < a[i + 1]);

    if (i === undefined) {
        a.reverse();
        return false;
    } 

    // Steps #2-4
    const j = reversedIndices.find(j => a[i] < a[j]);
    swap(a, i, j);
    reverseSuffix(a, i + 1);
    return true;
}

function* uniquePermutations(a) {
    const b = a.slice().sort();

    do {
        yield b.slice();
    } while (nextPermutation(b));
}

// got from https://stackoverflow.com/questions/44636199/all-distributions-of-items-between-buckets
function getCombination(max, count) {

    function fork(index, temp) {
        var sum = temp.reduce((a, b) => a + b, 0);
        if (max.some((a, i) => (temp[i] || 0) > a) || index === max.length || sum > count) {
            return;
        }
        if (sum === count) {
            result.push(temp);
            return;
        }
        fork(index, max.map((a, i) => (temp[i] || 0) + (i === index)));
        fork(index + 1, temp);
    }

    var result = [];
    fork(0, []);
    return result;
}

function placeZeros(row,numEmpty){
    var numSpots= row.length+1;
    var spotArr = [];
    for(var i=0;i<numSpots;i++){
        spotArr.push(numEmpty);
    }
    //if only one perm
    if(numEmpty <= 0 || row.length-1 == numEmpty){
        var perm = [[]];
        for(var i=0;i<numSpots;i++){
            perm[0].push(0);
        }
        return perm;
    }
    numEmpty = numEmpty-(row.length-1);
    return getCombination(spotArr,numEmpty)
}

//alert(JSON.stringify(placeZeros([1,2,3], 2)));
//alert(JSON.stringify(placeZeros([1,2,3], 0)));

function nonoPerms(nums, numEmpty, length){
    row = nums;
    //get distribution of possible empty spots
    var zeroDist = placeZeros(row,numEmpty);
    //alert("zeroDist= "+JSON.stringify(zeroDist));
    var perms = [];
    for(var i=0; i<zeroDist.length;i++){
        var perm = [];
        for(var j=0; j<zeroDist[i].length;j++){
            //alert("working j="+j);
            for(var k=0; k<zeroDist[i][j]; k++){
                perm.push(0);
            }
            if(row[j] != undefined){
                perm.push(row[j]);
            }
            //push in necessary 0 between numbers
            if(row[j+1] != undefined){
                perm.push(0);
            }
            //alert("test: "+perm);
        }
        perms.push(perm);
    }
    //let perms = Array.from(uniquePermutations(row));
    //alert(JSON.stringify(perms));
    return perms;
    
    var validPerms = [];
    //alert("row: "+ row);
    //alert("perms: "+JSON.stringify(perms));
    for(var i=0;i<perms.length;i++){
        var pos = 0;
        var valid = true;
        for(var j=0; j<perms[i].length;j++){
            //make sure nums in order
            if(perms[i][j] == row[pos]){
                pos++;
            }else if(perms[i][j] != 0){
                valid = false;
                break;
            }
            //make sure no nums are next to each other
            if(((perms[i][j-1] == 0 || perms[i][j-1] == undefined) && (perms[i][j+1] == 0 || perms[i][j+1] == undefined)) == false && perms[i][j] != 0){
                //alert(perms[i] + " failed at "+j+" bad "+perms[i][j]);
                valid = false;
                break;
            }
        }
        if(valid){
            validPerms.push(perms[i]);
        }
    }
    //alert("validPerms: "+ JSON.stringify(validPerms));
    return validPerms;    
}

//generate permutations of input row
function generatePer(grid, rowNum){
    var length = readCols().length;
    var row =grid[rowNum];
    numEmpty = length;
    for(var i = 0; i<row.length; i++){
        numEmpty -= row[i];
    }
    //if empty row
    if(numEmpty == length){
        var emptyArr = [[]];
        for(var j=0;j<length;j++){
            emptyArr[0].push(0);
        }
        return emptyArr;
    }

    //alert(JSON.stringify(row));
    //alert(JSON.stringify(nonoPerms(row, numEmpty)));
    return nonoPerms(row, numEmpty, length);
}

//generate permutations of input row
function generatePerCol(grid, colNum){
    var length = readRows().length;
    var col =grid[colNum];
    numEmpty = length;
    for(var i = 0; i<col.length; i++){
        numEmpty -= col[i];
    }
    //if empty row
    if(numEmpty == length){
        var emptyArr = [[]];
        for(var j=0;j<length;j++){
            emptyArr[0].push(0);
        }
        return emptyArr;
    }

    //alert(JSON.stringify(row));
    //alert(JSON.stringify(nonoPerms(row, numEmpty)));
    return nonoPerms(col, numEmpty, length);
}

//generate all permutations for all rows
function generatePers(grid){
    var allPerms = [];
    var length = grid.length;
    for(var i=0; i<length; i++){
        allPerms.push(generatePer(readRows(), i));
    }

    //alert(JSON.stringify(allPerms));
    return allPerms;
}

//generate all permutations for all rows
function generatePersCols(grid){
    var allPerms = [];
    var length = grid.length;
    for(var i=0; i<length; i++){
        allPerms.push(generatePerCol(readCols(), i));
    }

    //alert(JSON.stringify(allPerms));
    return allPerms;
}

//link button to make row perms
$('#rowperm').click(function(){
    generatePers(readRows());
});

//function to get binary perm
function binPerm(perm){
    var binPerm=[];
    for(var i=0;i<perm.length;i++){
        if(perm[i] == 0 || perm[i] ==1 || perm[i] == '0' || perm[i] == '1'){
            binPerm.push(parseInt(perm[i]));
        }else{
            for(var j=0;j<parseInt(perm[i]);j++){
                binPerm.push(1);
            }
        }
    }
    return binPerm;
}

//function to map a row perm to the grid
function mapTo(perm, row){
    var binPerm=[];
    for(var i=0;i<perm.length;i++){
        if(perm[i] == 0 || perm[i] ==1){
            binPerm.push(perm[i]);
        }else{
            for(var j=0;j<perm[i];j++){
                binPerm.push(perm[i]);
            }
        }
    }
    //alert('binPerm: ' + binPerm);
    var pos = 0;
    $("td[id*='row-"+row.toString().padStart(2, '0')+"']").each(function(){
        if(binPerm[pos] != 0){
            $(this).addClass('full');
            $(this).removeClass('empty');
        }else{
            $(this).addClass('empty');
            $(this).removeClass('full');
        }
        pos++;
    });

}

//function to map a col perm to the grid
function mapToCol(perm, col){
    var binPerm=[];
    for(var i=0;i<perm.length;i++){
        if(perm[i] == 0 || perm[i] ==1){
            binPerm.push(perm[i]);
        }else{
            for(var j=0;j<perm[i];j++){
                binPerm.push(perm[i]);
            }
        }
    }
    //alert('binPerm: ' + binPerm);
    var pos = 0;
    $("td[id*='col-"+col.toString().padStart(2, '0')+"']").each(function(){
        if(binPerm[pos] != 0){
            $(this).addClass('full');
            $(this).removeClass('empty');
        }else{
            $(this).addClass('empty');
            $(this).removeClass('full');
        }
        pos++;
    });

}

//taken from https://stackoverflow.com/questions/26703700/dynamic-nested-for-loops-to-be-solved-with-recursion
function createCombinations(fields, currentCombinations) {
    //prevent side-effects
    var tempFields = fields.slice();
  
    //recursively build a list combinations
    var delimiter = ' | ';
    if (!tempFields || tempFields.length == 0) {
      return currentCombinations;
    }
    else {
      var combinations = [];
      var field = tempFields.pop();
  
      for (var valueIndex = 0; valueIndex < field.length; valueIndex++) {
        var valueName = field[valueIndex];
  
        if (!currentCombinations || currentCombinations.length == 0) {
          var combinationName = valueName;
          combinations.push(combinationName);
        }
        else {
          for (var combinationIndex = 0; combinationIndex < currentCombinations.length; combinationIndex++) {
            var currentCombination = currentCombinations[combinationIndex];
            var combinationName = valueName + delimiter + currentCombination;
            combinations.push(combinationName);
          }
        }
      }
      return createCombinations(tempFields, combinations);
    }
  }

//rotate combos rows to cols
function rotateCombos(combos){
    var rowSize = 0;
    var colSize = 0;
    $('.cellRow').each(function(){rowSize++;});
    $('.cellCol').each(function(){colSize++;});

    var strArr=[];

    for(var i=0;i<combos.length;i++){
        var temp = combos[i].split('|');
        var rowArr = [];
        for(var j=0;j<temp.length;j++){
            var temp2 = temp[j].split(',');
            for(var k = 0; k <temp2.length;k++){
                temp2[k] = parseInt(temp2[k]);
            }
            rowArr.push(binPerm(temp2));
        }
        
        //alert("rows:"+JSON.stringify(rowArr));

        var colArr = [];
        for(var a=0;a<colSize;a++){
            var arr = [];
            for(var b=0;b<rowSize;b++){
                arr.push(rowArr[b][a]);
            }
            colArr.push(arr);
        }

        var colArr2 =[];
        for(var a=0;a<colArr.length;a++){
            var arr = [];
            var current = 0;
            for(var b=0;b<colArr[a].length;b++){
                if(colArr[a][b]==1){
                    current+=1;
                }else{
                    if(current>0){
                    arr.push(current);
                    }
                    current=0;
                    arr.push(current);
                }
            }
            if(current != 0){
                arr.push(current);
            }
            colArr2.push(arr);
        }

        var colStr = ""
        for(var a=0;a<colArr2.length;a++){
            colStr += colArr2[a];
            if(a+1<colArr2.length){
            colStr += " | ";
            }
        }
        strArr.push(colStr);
    }

    return strArr;
}

//pers[row][permutation number for that row]
//finds all permutations for all rows and compares
function solve(){
    
    var colPers = generatePersCols(readCols());
    
    var colTotalPos = 1;
    var colPosArr = [];
    for(var i=0;i<colPers.length;i++){
        colTotalPos *= colPers[i].length;
        colPosArr.push(colPers[i].length);
        //set to first permutation
        mapToCol(colPers[i][0],i);
        if(checkSolved()){
            return;
        }   
    }

    //alert("cols posArr: " + JSON.stringify(colPosArr));
    //alert("cols totalPos: " + colTotalPos);
    var colCombos = createCombinations(colPers,0);
    //alert("colCombos: "+colCombos.length);
    //alert("colCombos " + JSON.stringify(colCombos));

    let colComboDict = new Map();
    for(var i=0;i<colCombos.length;i++){
        colComboDict.set(colCombos[i],true);
    }

    var pers = generatePers(readRows());
    var totalPos = 1;
    var posArr = [];
    for(var i=0;i<pers.length;i++){
        totalPos *= pers[i].length;
        posArr.push(pers[i].length);
        //set to first permutation
        mapTo(pers[i][0],i);
        if(checkSolved()){
            return;
        }   
    }

    //alert("posArr: " + JSON.stringify(posArr));
    //alert("totalPos: " + totalPos);
    var posnum = 0;
    var combos = createCombinations(pers,0);
    //alert("row combos: "+combos.length);
    //alert("row Combos " + JSON.stringify(combos[0]));
    
    //generates the row combos in the format of col combos
    var strArr = rotateCombos(combos);
    for(var i=0; i<strArr.length;i++){
        if(colComboDict.get(strArr[i])){
            //alert(strArr[i]);
            var temp = combos[i].split('|');
            posnum++;
            for(var j=0;j<temp.length;j++){

                var temp2 = temp[j].split(',');
                for(var k = 0; k <temp2.length;k++){
                    temp2[k] = parseInt(temp2[k]);
                }
                mapTo(temp2,j);
                if(checkSolved()){
                    return;
                }
            }
            $("#posnum").html(posnum);
        }
    }
    alert("Did not solve");
}

function lockRow(row){
    if(checkRow(row)){
        $("td[id*='row-"+row.toString().padStart(2, '0')+"']").each(function(){
            if($(this).hasClass('empty')){
                $(this).addClass('locked');
            }
        });

    }
}

function lockCol(col){
    if(checkCol(col)){
        $("td[id*='col-"+col.toString().padStart(2, '0')+"']").each(function(){
            if($(this).hasClass('empty')){
                $(this).addClass('locked');
            }
        });

    }
}

//will need to be adjusted to read partial rows
function fitLargeGroupRow(row, colsNum){
    var inputList = readRow(row);
    var binRow = binPerm(readGridBinRow(row));
    var total = 0;
    for(var i=0;i<inputList;i++){
        total+=0;
    }
    if(inputList.length==1){
        var group=inputList[0];
        var rowArr = [];
        var margin = colsNum-group;
        var known = colsNum -2*margin;
        if(known>0){
            for(var i=0;i<margin;i++){
                rowArr.push(binRow[i]);
                //alert(binRow[i]);
            }
            for(var i=margin;i<known+margin;i++){
                rowArr.push(1);
            }
            for(var i=margin+known;i<margin+known+margin;i++){
                rowArr.push(binRow[i]);
            }
            mapTo(rowArr, row);
        }
    }else{
        return;
    }
}

function fitLargeGroupCol(col, rowsNum){
    var inputList = readCol(col);
    var binCol = binPerm(readGridBinCol(col));
    var total = 0;
    for(var i=0;i<inputList;i++){
        total+=0;
    }
    if(inputList.length==1){
        var group=inputList[0];
        var colArr = [];
        var margin = rowsNum-group;
        var known = rowsNum -2*margin;
        if(known>0){
            for(var i=0;i<margin;i++){
                colArr.push(binCol[i]);
            }
            for(var i=margin;i<known+margin;i++){
                colArr.push(1);
            }
            for(var i=margin+known;i<margin+known+margin;i++){
                colArr.push(binCol[i]);
            }
            mapToCol(colArr, col);
        }
    }else{
        return;
    }
}

function readGridBinRow(row){
    var arr = [];
    //generates array for grid row
    $("td[id*='row-"+row.toString().padStart(2, '0')+"']").each(function(){
        //alert($(this).attr('id'));
        if($(this).hasClass("full")){
            arr.push(1);
        }else{
            arr.push(0);
        }
    });

    //alert(row + " row, arr: " + arr);
    return arr;
}

function readGridBinCol(col){
    var arr = [];
    //generates array for grid row
    $("td[id*='col-"+col.toString().padStart(2, '0')+"']").each(function(){
        //alert($(this).attr('id'));
        if($(this).hasClass("full")){
            arr.push(1);
        }else{
            arr.push(0);
        }
    });

    //alert(row + " row, arr: " + arr);
    return arr;
}

function readGridRowLocks(row){
    var arr = [];
    //generates array for grid row
    $("td[id*='row-"+row.toString().padStart(2, '0')+"']").each(function(){
        //alert($(this).attr('id'));
        if($(this).hasClass("full")){
            arr.push(1);
        }else if($(this).hasClass("locked")){
            arr.push(0);
        }else{
            arr.push("?");
        }
    });

    //alert(row + " row, arr: " + arr);
    return arr;
}

function readGridColLocks(col){
    var arr = [];
    //generates array for grid row
    $("td[id*='col-"+col.toString().padStart(2, '0')+"']").each(function(){
        //alert($(this).attr('id'));
        if($(this).hasClass("full")){
            arr.push(1);
        }else if($(this).hasClass("locked")){
            arr.push(0);
        }else{
            arr.push("?");
        }
    });

    //alert(row + " row, arr: " + arr);
    return arr;
}

//link button to test lock grid check
$('#rgrl').click(function(){
    readGridRowLocks(0);
});

function reducePers(pers){
    //alert("pers= "+ JSON.stringify(pers));
    newPers = [];
    //for each row
    for(var i=0;i<pers.length;i++){
        newPers.push([]);
        var rowLock = readGridRowLocks(i);
        //for the perms of the row
        for(var j=0;j<pers[i].length;j++){
            var bin = binPerm(pers[i][j]);
            var valid = true;
            for(var k=0;k<bin.length;k++){
                if(bin[k] != rowLock[k] && rowLock[k]!='?'){
                    valid = false;
                }
            }
            if(valid){
                newPers[i].push(pers[i][j]);
            }
        }

    }
    //alert("newpers= "+ JSON.stringify(newPers));
    return newPers;
}

//link button to test lock grid check
$('#reducepers').click(function(){
    //reducePers(generatePers(readRows()));
});

function reducePersCols(pers){
    //alert("pers= "+ JSON.stringify(pers));
    newPers = [];
    //for each row
    for(var i=0;i<pers.length;i++){
        newPers.push([]);
        var colLock = readGridColLocks(i);
        //for the perms of the row
        for(var j=0;j<pers[i].length;j++){
            var bin = binPerm(pers[i][j]);
            var valid = true;
            for(var k=0;k<bin.length;k++){
                if(bin[k] != colLock[k] && colLock[k]!='?'){
                    valid = false;
                }
            }
            if(valid){
                newPers[i].push(pers[i][j]);
            }
        }

    }
    //alert("newpers= "+ JSON.stringify(newPers));
    return newPers;

}

//check if cell is constant across all row pers
function checkConst(pers, row){
    var compPer = binPerm(pers[row][0]);
        for(var j=0;j<pers[row].length;j++){
            var bin = binPerm(pers[row][j]);
            for(var k=0;k<bin.length;k++){
                if(bin[k] != compPer[k]){
                    compPer[k]='?';
                }
            }
        }
    
    for(var i=0;i<compPer.length;i++){
        if(compPer[i] != '?'){
            $("td[id*='row-"+row.toString().padStart(2, '0')+'col-'+i.toString().padStart(2, '0')+"']").each(function(){
                if(compPer[i]==1){
                    $(this).addClass('full');
                    $(this).removeClass('empty');
                }else{
                    $(this).addClass('empty');
                    $(this).addClass('locked');
                    $(this).removeClass('full');
                }
            });
        }
    }
}

function checkConsts(pers){
    for(var i=0;i<pers.length;i++){
        checkConst(pers,i);
    }
}

//check if cell is constant across all row pers
function checkConstCol(colPers, col){
    var compPer = binPerm(colPers[col][0]);
        for(var j=0;j<colPers[col].length;j++){
            var bin = binPerm(colPers[col][j]);
            for(var k=0;k<bin.length;k++){
                if(bin[k] != compPer[k]){
                    compPer[k]='?';
                }
            }
        }
    for(var i=0;i<compPer.length;i++){
        if(compPer[i] != '?'){
            $("td[id*='row-"+i.toString().padStart(2, '0')+'col-'+col.toString().padStart(2, '0')+"']").each(function(){
                if(compPer[i]==1){
                    $(this).addClass('full');
                    $(this).removeClass('empty');
                }else{
                    $(this).addClass('empty');
                    $(this).addClass('locked');
                    $(this).removeClass('full');
                }
            });
        }
    }
}

function checkConstCols(colPers){
    for(var i=0;i<colPers.length;i++){
        checkConstCol(colPers,i);
    }
}
//will have recursive element
/*
fill in definite rows and cols, marking full and known empties
check to see if any rows and cols are now solved
    fill in definite fulls and empties
check to see if any rows and cols are partially solved
    fill in definite row and empties
generate new permutations factoring in definites
rerun to see if any new definites emerge
if so, run above again
if not, try brute force
 */
function logicSolve(pers, colPers, pass){
    //var colPers = generatePersCols(readCols());
    //var pers = generatePers(readRows());
    clearGrid();

    //fills in definite rows
    var totalPos = 1;
    var posArr = [];
    for(var i=0;i<pers.length;i++){
        var pos = pers[i].length;
        totalPos *= pos;
        posArr.push(pos);
        if(pos==1){
            mapTo(pers[i][0],i);
            lockRow(i);
        }
        else{
            fitLargeGroupRow(i,colPers.length);
        }  
    }

    //fill in definite cols
    var colTotalPos = 1;
    var colPosArr = [];
    for(var i=0;i<colPers.length;i++){
        var pos = colPers[i].length;
        colTotalPos *= pos;
        colPosArr.push(pos);
        if(pos==1){
            mapToCol(colPers[i][0],i);
            lockCol(i);
        }else{
            fitLargeGroupCol(i,pers.length);
        }  
    }
    //alert("posArr: " + JSON.stringify(posArr)+ " totalPos: " + totalPos);
    //alert("cols posArr: " + JSON.stringify(colPosArr)+" cols totalPos: " + colTotalPos);

    //check if any rows are now solved
    for(var i=0;i<pers.length;i++){
        lockRow(i);
    }

    //check if any cols are now solved
    for(var i=0;i<colPers.length;i++){
        lockCol(i);
    }  

    pers = reducePers(pers);
    colPers = reducePersCols(colPers);

    var totalPos = 1;
    var posArr = [];
    for(var i=0;i<pers.length;i++){
        totalPos *= pers[i].length;
        posArr.push(pers[i].length);
    }

    var colTotalPos = 1;
    var colPosArr = [];
    for(var i=0;i<colPers.length;i++){
        colTotalPos *= colPers[i].length;
        colPosArr.push(colPers[i].length);
    }

    //alert("posArr: " + JSON.stringify(posArr)+ " totalPos: " + totalPos);
    //alert("cols posArr: " + JSON.stringify(colPosArr)+" cols totalPos: " + colTotalPos);

    if(totalPos == 0 || colTotalPos == 0){
        alert("Unsolvable");
        clearGrid();
        return;
    }


    checkConsts(pers);
    checkConstCols(colPers);

    pers = reducePers(pers);
    colPers = reducePersCols(colPers);

    //need to add if anything across all valid perms is consistant, add it
    if(totalPos == 1 && colTotalPos == 1){
        solve(pers, colPers);
    }else if(pass<100){
        logicSolve(pers,colPers,pass+1);
    }else{
        //brute force endcase 
        //filter through perms where current positions exist
        solve(pers, colPers);
    }
}

function solve(pers, colPers){

    //var pers = generatePers(readRows());
    //var colPers = generatePersCols(readCols());

    var totalPos = 1;
    var posArr = [];
    for(var i=0;i<pers.length;i++){
        totalPos *= pers[i].length;
        posArr.push(pers[i].length);
    }
    //alert("posArr: " + JSON.stringify(posArr)+" total row pos: "+ totalPos);
    
    var colTotalPos = 1;
    var colPosArr = [];
    for(var i=0;i<colPers.length;i++){
        colTotalPos *= colPers[i].length;
        colPosArr.push(colPers[i].length);
    }
    //alert("cols posArr: " + JSON.stringify(colPosArr)+" cols totalPos: " + colTotalPos);

    if(totalPos>1000000){
        alert("Too complex");
        return;
    }
    if(colTotalPos>1000000){
        alert("Too complex");
        return;
    }
    if(totalPos == 0 || colTotalPos == 0){
        alert("Unsolvable");
        return;
    }
    var colCombos = createCombinations(colPers,0);

    let colComboDict = new Map();
    for(var i=0;i<colCombos.length;i++){
        colComboDict.set(colCombos[i],true);
    }
    
    var posnum = 0;
    var combos = createCombinations(pers,0);
    
    //generates the row combos in the format of col combos
    var strArr = rotateCombos(combos);
    for(var i=0; i<strArr.length;i++){
        if(colComboDict.get(strArr[i])){
            //alert(strArr[i]);
            var temp = combos[i].split('|');
            posnum++;
            for(var j=0;j<temp.length;j++){

                var temp2 = temp[j].split(',');
                for(var k = 0; k <temp2.length;k++){
                    temp2[k] = parseInt(temp2[k]);
                }
                mapTo(temp2,j);
                if(checkSolved()){
                    return;
                }
            }
            $("#posnum").html(posnum);
        }
    }
    alert("Did not solve");
}

//link button to make row perms
$('#solve').click(function(){
    logicSolve(generatePers(readRows()),generatePersCols(readCols()),0);
});

function pull(){
    $("#pullText").val(readRows().length+":"+readCols().length+":"+JSON.stringify(readRows())+":"+JSON.stringify(readCols()));
}

$('#pull').click(function(){
    pull();
});

function push(){
    var text = $("#pushText").val();
    var info = text.split(':');
    var rows = JSON.parse(info[2]);
    var cols = JSON.parse(info[3]);

    createGrid(info[0],info[1]);

    var i = 0;
    $('.cellRow').each(function(){
        $(this).val(rows[i]);
        i++;
    })

    i=0;
    $('.cellCol').each(function(){
        $(this).val(cols[i]);
        i++;
    })
}

$('#push').click(function(){
    push();
});

function test0(){
    createGrid(8,8);
    $("#row00").val("8");
    $("#row01").val("1,2,1");
    $("#row02").val("1,2,1");
    $("#row03").val("3,3");
    $("#row04").val("2,2");
    $("#row05").val("2,2");
    $("#row06").val("2,2,2");
    $("#row07").val("8");

    $("#col00").val("8");
    $("#col01").val("1,5");
    $("#col02").val("1,1,1");
    $("#col03").val("3,2");
    $("#col04").val("3,2");
    $("#col05").val("1,1,1");
    $("#col06").val("1,5");
    $("#col07").val("8");
}

function test1(){
    createGrid(5,5);
    $("#row00").val("2,2");
    $("#row01").val("");
    $("#row02").val("1,1");
    $("#row03").val("1,1");
    $("#row04").val("3");

    $("#col00").val("1,1");
    $("#col01").val("1,1,1");
    $("#col02").val("1");
    $("#col03").val("1,1,1");
    $("#col04").val("1,1");
}

function test2(){
    createGrid(10,10);
    $("#row00").val("8");
    $("#row01").val("1,2,1");
    $("#row02").val("1,2,1");
    $("#row03").val("3,3");
    $("#row04").val("2,2");
    $("#row05").val("2,2");
    $("#row06").val("2,2,2");
    $("#row07").val("8");
    $("#row08").val("8");
    $("#row09").val("8");

    $("#col00").val("8");
    $("#col01").val("1,5");
    $("#col02").val("1,1,1");
    $("#col03").val("3,2");
    $("#col04").val("3,2");
    $("#col05").val("1,1,1");
    $("#col06").val("1,5");
    $("#col07").val("8");
    $("#col08").val("1,5");
    $("#col09").val("8");
}

function test3(){
    createGrid(10,10);
    $("#row00").val("4");
    $("#row01").val("6");
    $("#row02").val("2,4");
    $("#row03").val("9");
    $("#row04").val("9");
    $("#row05").val("6");
    $("#row06").val("7");
    $("#row07").val("1,1,1,1");
    $("#row08").val("2,1,1,2");
    $("#row09").val("2,2");

    $("#col00").val("2");
    $("#col01").val("2,1");
    $("#col02").val("8");
    $("#col03").val("7,1");
    $("#col04").val("2,7");
    $("#col05").val("7");
    $("#col06").val("10");
    $("#col07").val("6,1");
    $("#col08").val("3,3");
    $("#col09").val("1");
}

function test4(){
    createGrid(15,15);
    $("#row00").val("8");
    $("#row01").val("2,2,2");
    $("#row02").val("4,1,5");
    $("#row03").val("3,5");
    $("#row04").val("1,2,2");
    $("#row05").val("4,2,5");
    $("#row06").val("3,2,3");
    $("#row07").val("2,3,3,2");
    $("#row08").val("1,2,2,5");
    $("#row09").val("4,4,5");
    $("#row10").val("13,1");
    $("#row11").val("2,9,2");
    $("#row12").val("2,7,2");
    $("#row13").val("2,4");
    $("#row14").val("9");

    $("#col00").val("8");
    $("#col01").val("2,3,4");
    $("#col02").val("3,2,2,2");
    $("#col03").val("4,1,4,2");
    $("#col04").val("1,1,2,3,1");
    $("#col05").val("1,1,4,1");
    $("#col06").val("2,2,6,1");
    $("#col07").val("3,2,5,1");
    $("#col08").val("1,4,1");
    $("#col09").val("1,1,2,5");
    $("#col10").val("1,2,10");
    $("#col11").val("3,1,5,2");
    $("#col12").val("3,2,3,2");
    $("#col13").val("8,2");
    $("#col14").val("9");
}

function test5(){
    createGrid(20,20);
    $("#row00").val("2");
    $("#row01").val("2,4");
    $("#row02").val("3,2,3");
    $("#row03").val("3,1,7");
    $("#row04").val("10,5");
    $("#row05").val("2,2,3");
    $("#row06").val("12,3,1");
    $("#row07").val("1,5,5,4");
    $("#row08").val("3,2,9,3");
    $("#row09").val("1,1,4,2,2,2,2");
    $("#row10").val("4,8,4,1");
    $("#row11").val("3,3,3");
    $("#row12").val("12,1,2");
    $("#row13").val("12,1");
    $("#row14").val("13,2");
    $("#row15").val("13,4");
    $("#row16").val("1,10,3,1");
    $("#row17").val("1,12,1");
    $("#row18").val("2,2");
    $("#row19").val("16");

    $("#col00").val("3,3,4");
    $("#col01").val("4,1,1,2,2");
    $("#col02").val("3,11,1");
    $("#col03").val("4,8,1");
    $("#col04").val("6,7,1");
    $("#col05").val("1,5,6,1");
    $("#col06").val("1,2,2,6,1");
    $("#col07").val("1,5,6,1");
    $("#col08").val("1,3,1,6,1");
    $("#col09").val("1,1,3,6,1");
    $("#col10").val("1,5,6,1");
    $("#col11").val("7,1,6,1");
    $("#col12").val("2,6,4,1,1");
    $("#col13").val("1,2,4,4,2,1");
    $("#col14").val("5,2,2,3,1");
    $("#col15").val("6,9,1");
    $("#col16").val("6,2,2,2");
    $("#col17").val("2,3,2,4");
    $("#col18").val("1,3,2");
    $("#col19").val("1,7");
}

function test6(){
    createGrid(15,15);
    $("#row00").val("4");
    $("#row01").val("1,5");
    $("#row02").val("5,1,1");
    $("#row03").val("4,1");
    $("#row04").val("6,1,2");
    $("#row05").val("3,3,2");
    $("#row06").val("7,1");
    $("#row07").val("11,1,1");
    $("#row08").val("2,3,4,3");
    $("#row09").val("13");
    $("#row10").val("9,3");
    $("#row11").val("3,9");
    $("#row12").val("6,5");
    $("#row13").val("1,8");
    $("#row14").val("8");

    $("#col00").val("8");
    $("#col01").val("8,1");
    $("#col02").val("5,6");
    $("#col03").val("9,3");
    $("#col04").val("3,9");
    $("#col05").val("13");
    $("#col06").val("3,4,3,2");
    $("#col07").val("1,1,11");
    $("#col08").val("1,7");
    $("#col09").val("2,3,3");
    $("#col10").val("2,1,6");
    $("#col11").val("1,4");
    $("#col12").val("1,1,5");
    $("#col13").val("5,1");
    $("#col14").val("4");
}

function test7(){
    createGrid(25,25);
    $("#row00").val("4");
    $("#row01").val("3");
    $("#row02").val("2");
    $("#row03").val("8,2");
    $("#row04").val("12,4");
    $("#row05").val("2,9,5");
    $("#row06").val("13,2");
    $("#row07").val("20");
    $("#row08").val("4,2,5,6");
    $("#row09").val("6,5,2,1,1");
    $("#row10").val("5,1,1,2,3,2,1");
    $("#row11").val("5,2,8");
    $("#row12").val("6,1,2,10");
    $("#row13").val("7,1,1,2,7");
    $("#row14").val("15,6");
    $("#row15").val("13,1,6");
    $("#row16").val("13,1,7");
    $("#row17").val("25");
    $("#row18").val("1,22");
    $("#row19").val("16");
    $("#row20").val("6");
    $("#row21").val("1");
    $("#row22").val("2");
    $("#row23").val("23");
    $("#row24").val("18");

    $("#col00").val("1,10,1");
    $("#col01").val("1,9,1");
    $("#col02").val("1,10,2");
    $("#col03").val("12,1");
    $("#col04").val("14,1");
    $("#col05").val("5,8,1");
    $("#col06").val("5,7,1");
    $("#col07").val("1,2,1,1,7,2");
    $("#col08").val("5,7,2");
    $("#col09").val("6,8,2");
    $("#col10").val("6,1,7,2");
    $("#col11").val("5,1,9,2");
    $("#col12").val("7,2,7,2");
    $("#col13").val("9,1,3,2");
    $("#col14").val("8,2,4,2");
    $("#col15").val("7,2,3,2");
    $("#col16").val("5,2,1,3,2");
    $("#col17").val("2,1,3,3,2");
    $("#col18").val("2,1,5,4,2");
    $("#col19").val("2,14,2");
    $("#col20").val("1,2,1,8,2");
    $("#col21").val("2,2,1,9,2");
    $("#col22").val("1,2,11,2");
    $("#col23").val("1,2,1,8,2");
    $("#col24").val("1,2,3,6,2");
}

function test8(){
    createGrid(30,30);
    $("#row00").val("4,7,4");
    $("#row01").val("2,13,2");
    $("#row02").val("19");
    $("#row03").val("19");
    $("#row04").val("17");
    $("#row05").val("17");
    $("#row06").val("4,5,4,5");
    $("#row07").val("3,2,3,2,3,8");
    $("#row08").val("3,2,2,3,7");
    $("#row09").val("2,3,2,9");
    $("#row10").val("2,3,2,9");
    $("#row11").val("1,1,1,1,1,11");
    $("#row12").val("2,9,14");
    $("#row13").val("1,3,1,12");
    $("#row14").val("2,1,1,13");
    $("#row15").val("2,1,14");
    $("#row16").val("4,11,5");
    $("#row17").val("3,10,7");
    $("#row18").val("2,9,8");
    $("#row19").val("1,10,8");
    $("#row20").val("2,6,2,9");
    $("#row21").val("3,6,3,9");
    $("#row22").val("4,7,3,9");
    $("#row23").val("5,6,4,9");
    $("#row24").val("19,9");
    $("#row25").val("1,5,3,9");
    $("#row26").val("1,1,5,1,12");
    $("#row27").val("1,5,1,16");
    $("#row28").val("9,17");
    $("#row29").val("19");

    $("#col00").val("4,3,3");
    $("#col01").val("13,2,1");
    $("#col02").val("1,7,3,4,1,1");
    $("#col03").val("8,2,5,1");
    $("#col04").val("6,10,1");
    $("#col05").val("5,2,2,3,3,1");
    $("#col06").val("6,2,1,2,1,2");
    $("#col07").val("7,1,1,1,3");
    $("#col08").val("8,2,2,5");
    $("#col09").val("8,6,7");
    $("#col10").val("8,2,2,7");
    $("#col11").val("7,1,8,1");
    $("#col12").val("6,2,1,10,1,1");
    $("#col13").val("5,2,2,9,2");
    $("#col14").val("6,15");
    $("#col15").val("8,1,7,2,3");
    $("#col16").val("1,7,2,6,3,3");
    $("#col17").val("13,6,4,3");
    $("#col18").val("4,3,13,4");
    $("#col19").val("2,14,4");
    $("#col20").val("14,4");
    $("#col21").val("12,10");
    $("#col22").val("11,12");
    $("#col23").val("10,13");
    $("#col24").val("9,13");
    $("#col25").val("23");
    $("#col26").val("23");
    $("#col27").val("21");
    $("#col28").val("21");
    $("#col29").val("19");
}

function test9(){
    createGrid(25,25);
    $("#row00").val("");
    $("#row01").val("");
    $("#row02").val("");
    $("#row03").val("");
    $("#row04").val("");
    $("#row05").val("");
    $("#row06").val("");
    $("#row07").val("");
    $("#row08").val("");
    $("#row09").val("");
    $("#row10").val("");
    $("#row11").val("");
    $("#row12").val("");
    $("#row13").val("");
    $("#row14").val("");
    $("#row15").val("");
    $("#row16").val("");
    $("#row17").val("");
    $("#row18").val("");
    $("#row19").val("");
    $("#row20").val("");
    $("#row21").val("");
    $("#row22").val("");
    $("#row23").val("");
    $("#row24").val("");

    $("#col00").val("");
    $("#col01").val("");
    $("#col02").val("");
    $("#col03").val("");
    $("#col04").val("");
    $("#col05").val("");
    $("#col06").val("");
    $("#col07").val("");
    $("#col08").val("");
    $("#col09").val("");
    $("#col10").val("");
    $("#col11").val("");
    $("#col12").val("");
    $("#col13").val("");
    $("#col14").val("");
    $("#col15").val("");
    $("#col16").val("");
    $("#col17").val("");
    $("#col18").val("");
    $("#col19").val("");
    $("#col20").val("");
    $("#col21").val("");
    $("#col22").val("");
    $("#col23").val("");
    $("#col24").val("");
}
$('#test0').click(function(){
    test0();
});

$('#test1').click(function(){
    test1();
});

$('#test2').click(function(){
    test2();
});

$('#test3').click(function(){
    test3();
});

$('#test4').click(function(){
    test4();
});

$('#test5').click(function(){
    test5();
});

$('#test6').click(function(){
    test6();
});

$('#test7').click(function(){
    test7();
});

$('#test8').click(function(){
    test8();
});