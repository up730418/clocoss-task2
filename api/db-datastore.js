// change the namespace to something else than 'tutorial'// MAKE ME
const ds = require('@google-cloud/datastore')({ namespace: '730418_task2' });

const kind = 'files';

function key(id) {
  return ds.key([kind, id]);
}

//Return a list of names stored
module.exports.list = async () => {
  let [data] = await ds.createQuery(kind).select('name').order('name').run();
  // extract only the names
  data = data.map((val) => val.name);
  return data;
};

//Return name $id and its value
module.exports.get = async (id) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) return data.val.toString();
  return '0';
};

//Sets name with $id to $val
module.exports.put = async (id, val) => {
  const [data] = await ds.get(key(id));
  const entity = {
    key: key(id),
    data: { name: id, val},
  }
  const [updatedData] = await ds.save(entity);
	
  //Check if a record was updated
  if(updatedData.indexUpdates > 0) return `${val}`;
  return '0';
};

//Create new name $id with value $val 
//Or updated name $id and add value $val to existing value
module.exports.post = async (id, val) => {	
  const [data] = await ds.get(key(id));

  //check if name $id already exists and if so
  // get its current value and adds the new value $val
  if (data && data.val){
    try{
      val = parseInt(val) + parseInt(data.val);
    }
    catch(e){
      console.log("couldnt parse int");
      return'0';
    }
  }
  const entity = {
    key: key(id),
    data: { name: id, val},
  }
  const [updatedData] = await ds.save(entity);

  //Check a record has been updated
  if(updatedData.indexUpdates > 0) return `${val}`;
  return '0';
};

//Delete $id from the DB
module.exports.delete = async(id) => {	
  const [data] = await ds.delete(key(id));
	
  //Check a record has been updated
  if(data.indexUpdates > 0) return 'ok';
  return '0';	
}
