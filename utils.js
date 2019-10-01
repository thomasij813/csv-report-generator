const fs = require('fs');

const parseJsonIntoArray = (json) => {
    let headers = {};
    let rows = [];
    let i = 0;

    const recurse = (root) => {
        const localHeaders = Object.keys(root);

        let row = localHeaders
            .filter(header => header !== 'children')
            .reduce((row, header) => {
                if (!headers.hasOwnProperty(header)) {
                    headers[header] = i;
                    i++;
                }
                let headerIndex = headers[header];
                row[headerIndex] = root[header];
                return row;
            }, []);

        rows.push(row);

        if (root.children.length > 0) {
            root.children.forEach(recurse);
        }
    };
    
    recurse(json);

    const firstRow = Object.keys(headers).reduce((row, header) => {
        row.push(header)
        return row;
    }, [])
    rows.unshift(firstRow);

    return rows;
}

var turnRowIntoString = (row) => {
    return row.map(val => typeof val !== 'string' ? JSON.stringify(val) : val)
        .map(val => val.indexOf(',') >= 0 ? `"${val}"` : val)
        .join(',');
}

const createFile = (json) => {
    const outPutString = parseJsonIntoArray(json)
        .map(turnRowIntoString)
        .join('\n');

    return new Promise((resolve, reject) => {
        fs.writeFile('file.csv', outPutString, (err) =>{
            if (err) { reject(err); }
            resolve('file.csv');
        })
    })
};

module.exports = createFile;