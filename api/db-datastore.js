// change the namespace to something else than 'tutorial'// MAKE ME
const ds = require('@google-cloud/datastore')({ namespace: '730418_task2' });

const kind = 'files';

function key(id) {
  return ds.key([kind, id]);
}

module.exports.list = async () => {
  // asynchronously get a list of entities with names
  let [data] = await ds.createQuery(kind).select('name').order('name').run();
  // extract only the names
  data = data.map((val) => val.name);
  return data;
};

module.exports.get = async (id) => {
  // asynchronously get the entity
  const [data] = await ds.get(key(id));
  if (data && data.val) return data.val.toString();
  return '0';
};

module.exports.put = async (id) => {
  const [data] = await ds.get(key(id));
  const val = 0;
  const entity = {
    key: key(id),
    data: { name: id, val},
  }
  const [updatedData] = await ds.save(entity);

  if(updatedData.indexUpdates > 0) return `${val}`;
  return '';
};

module.exports.post = async (id, val) => {
  const [data] = await ds.get(key(id));
  if (data && data.val){
	  try{
	   val = parseInt(val) + parseInt(data.val);
	  }
	  catch(e){
		  console.log("couldnt parse int")
	 }
  }
  const entity = {
    key: key(id),
    data: { name: id, val},
  }
  const [updatedData] = await ds.save(entity);

  if(updatedData.indexUpdates > 0) return `${val}`;
  return '';
};

module.exports.delete = async(id) => {
  const [data] = await ds.delete(key(id));
  if(data.indexUpdates > 0) return 'ok';
  return '';	
}
