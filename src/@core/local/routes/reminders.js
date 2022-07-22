import Realm from "realm";
import ReminderSchema from '../models/reminders'

async function addData(name,data) {
    const realm = await Realm.open({
        path: "myrealm",
        schema: [ReminderSchema],
    });
    realm.write(() => {
        realm.create(name, data)
    });
}

async function getData(name) {
    const realm = await Realm.open({
        path: "myrealm",
        schema: [ReminderSchema],
    });
    const tasks = realm.objects(name).sorted('_id',true);
    console.log(`The lists of tasks are: ${tasks.map((task) => JSON.stringify(task))}`);
    return tasks
}

async function getLastID(name){
    const realm = await Realm.open({
        path: "myrealm",
        schema: [ReminderSchema],
    });
    const tasks = realm.objects(name).sorted('_id',true);
    return tasks[0]._id
}

export default {
    _addData: addData,
    _getData: getData,
    _getLastID: getLastID
}