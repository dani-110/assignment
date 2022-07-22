const ReminderSchema = {
    name: "Task",
    properties: {
      _id: "int",
      name: "string",
      status: "string?",
    },
    primaryKey: "_id",
  };


export default ReminderSchema;