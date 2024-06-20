import { RemoteSchemaEditableProTableConfig } from '@bomon/schema-pro-component/src/components/EditableProTable';

// bafojo
const preset1 = `{
  "editableProTableProps": {
    "rowKey": "id",
    "columns": [
      { "title": "用户名", "dataIndex": "uname", "editable": true, "valueType": "text" },
      { "title": "昵称", "dataIndex": "nickname", "editable": true, "valueType": "text" },
      {
        "title": "性别",
        "dataIndex": "sex",
        "editable": true,
        "valueType": "select",
        "fieldProps": {
          "options": [
            { "label": "男", "value": "1" },
            { "label": "女", "value": "2" },
            { "label": "未知", "value": "3" }
          ]
        }
      },
      { "title": "手机", "dataIndex": "mobile", "editable": true, "valueType": "text" },
      { "title": "邮箱", "dataIndex": "email", "editable": true, "valueType": "text" },
      { "title": "启用", "dataIndex": "enabled", "editable": true, "valueType": "switch" }
    ]
  },
  "actions": {
    "queryList": "http://localhost:3001/system/user/list",
    "create": "http://localhost:3001/system/user/create",
    "updateById": "http://localhost:3001/system/user/update",
    "deleteById": "http://localhost:3001/system/user/deleteById"
  }
}`;

export { preset1 };
