
const path = require('path');
const fs = require('fs');

export function fs_read_infra(rootpath: String, callback: Function) {
  console.log("root path is : " + rootpath);

  fs.readdir(rootpath, function (err: any, orders: any) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    console.log("dirs");
    console.log(orders);
    let promises = orders.map((order: any) => {
      const itemsPath = path.join(rootpath, order);
      return new Promise((resolve, reject) => {
        fs.readdir(itemsPath, function (err: any, items: any) {
          if (err) {
            reject(err);
          } else {
            let records:any = [];
            for (var i in items) {
              const qty = fs.readFileSync(path.join(itemsPath, items[i]), 'utf-8');
              records.push({
                "order_id": order,
                "item" : items[i],
                "qty" : qty
              });
            }
            resolve(records);
          }
        });
      })
    });
    Promise.all(promises)
    .then(results => {
      console.log("promise result: ");
      console.log(results);
      callback(null, results);
    })
    .catch(e => {
      console.error(e);
    })
  });
}