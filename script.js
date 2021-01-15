var obj_csv = {
    size:0,
    dataFile:[]
};
		 
function readImage(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();
		reader.readAsBinaryString(input.files[0]);
		reader.onload = function (e) {
			obj_csv.size = e.total;
			obj_csv.dataFile = e.target.result;
            var x = parseData(obj_csv.dataFile);
	 	}
 	}
}
 
function parseData(data){
    let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
	checkData(csvData);
}

function checkData(data){
	var l = data.length;
	var x = [];
	var y = [];
	var f = 0, output_length = 0;;
	for(var i = 1; i < l-1; i++){
		if(data[i][0] != ""){
			for(var j = i+1; j < l; j++){
				if(data[i][0] == data[j][0] && data[i][1] == data[j][1] && data[i][2] != data[j][2]){
					if(data[i][3] < data[j][3])
						y = [data[i][3], data[j][3],1];
					else
						y = [data[j][3], data[i][3],1];

					f = 0;
					output_length = x.length;
					for(var k = 0; k < output_length; k++){
						if(x[k][0] == y[0] && x[k][1] == y[1]){
							x[k][2]++;
							f = 1;
							break;
						}
					}
					if(f == 0)
						x.push(y);	
				}
			}
		}
	}

	var header = ["node1", "node2", "weight"]
	export_csv(header, x, ",", "output");
	
}

function export_csv(arrayHeader, arrayData, delimiter, fileName) {
    let header = arrayHeader.join(delimiter) + '\n';
    let csv = header;
    arrayData.forEach( obj => {
        let row = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                row.push(obj[key]);
            }
        }
        csv += row.join(delimiter)+"\n";
    });

    let csvData = new Blob([csv], { type: 'text/csv' });  
    let csvUrl = URL.createObjectURL(csvData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
}