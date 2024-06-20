import { PanelPlugin } from '@grafana/data';
import { AppOptions } from './types';
import { ProTablePanel } from 'components/ProTablePanel';
import HttpAddPartsEditor from 'components/HttpAddPartsEditor.tsx';
import SchemaEditor from 'components/SchemaEditor.tsx';
import { preset1 } from 'presets';

export const plugin = new PanelPlugin<AppOptions>(ProTablePanel).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      category: ['编辑表格配置'],
      id: 'config',
      path: 'config',
      name: 'SchemaConfig',
      description: '“简化配置" 关注的是常用项的修改,"原始JSON"一般用于粘贴完整JSON',
      editor: SchemaEditor,
      defaultValue: preset1,
    })
    .addCustomEditor({
      category: ['请求附加字段'],
      id: 'http_add_parts',
      path: 'http_add_parts',
      name: 'HTTP Add Parts',
      editor: HttpAddPartsEditor,
      defaultValue: [],
    })
    .addTextInput({
      category: ['别名'],
      path: 'var_page',
      name: 'var_page',
      description: '当有多个plugin同时存在于dashboard中,使用别名来区分变量观察者',
      defaultValue: 'page_num',
    })
    .addTextInput({
      category: ['别名'],
      path: 'var_size',
      name: 'var_size',
      description: '当有多个plugin同时存在于dashboard中,使用别名来区分变量观察者',
      defaultValue: 'page_size',
    });
});
