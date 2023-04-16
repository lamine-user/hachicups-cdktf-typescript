import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import {fs_read_infra} from './fsiac';

import { provider, order } from '@cdktf/provider-hashicups'

const path = require('path');

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, fs_tree: any) {
    super(scope, id);

    new provider.HashicupsProvider(this, "hashicups",
      {
        username:"education", 
        password:"test123"
    });

    console.log("fs tree in stack is : ");
    console.log(fs_tree);

    for (var i in fs_tree) {
      let fs_order = fs_tree[i];
      let orders_cdktf = [];
      let order_id = fs_order[0].order_id;
      for (var j in fs_order) {
        let item = fs_order[j];
        orders_cdktf.push({
          quantity: item.qty,
          coffee: {
            id : 1 // This is the cofee id, we sell the same cofee type unfortunatly !
          }
        });
      }
      new order.Order(this, order_id, {
        items: orders_cdktf
      });
    }
  }
}

fs_read_infra(path.join(__dirname, 'orders'), function(err: any, fs_tree: any){
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  const app = new App();
  new MyStack(app, "iac", fs_tree);

  app.synth();

})


