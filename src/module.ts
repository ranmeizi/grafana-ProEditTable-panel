import { PanelPlugin } from '@grafana/data';
import { AppOptions } from './types';
import { ProTablePanel } from 'components/ProTablePanel';
import HttpAddPartsEditor from 'components/HttpAddPartsEditor.tsx';

export const plugin = new PanelPlugin<AppOptions>(ProTablePanel).setPanelOptions((builder) => {
  return builder
    .addBooleanSwitch({
      category: ['Base'],
      path: 'use_data_query',
      name: 'use_data_query',
      description: 'true- use DataSource query,false- use request url query',
      defaultValue: true,
    })
    .addTextInput({
      category: ['Base'],
      path: 'row_key',
      name: 'row_key',
      defaultValue: '',
    })
    .addTextInput({
      category: ['Requests'],
      path: 'url_list',
      name: 'URL List',
      defaultValue: '',
    })
    .addTextInput({
      category: ['Requests'],
      path: 'url_create',
      name: 'URL Create',
      defaultValue: '',
    })
    .addTextInput({
      category: ['Requests'],
      path: 'url_update',
      name: 'URL Update',
      defaultValue: '',
    })
    .addTextInput({
      category: ['Requests'],
      path: 'url_delete',
      name: 'URL Delete',
      defaultValue: '',
    })
    .addTextInput({
      category: ['Requests'],
      path: 'url_columns',
      name: 'URL Columns',
      defaultValue: '',
    })
    .addCustomEditor({
      category: ['Requests'],
      id: 'http_add_parts',
      path: 'http_add_parts',
      name: 'HTTP Add Parts',
      editor: HttpAddPartsEditor,
      defaultValue: []
    })
    .addTextInput({
      category: ['Alias'],
      path: 'var_page',
      name: 'var_page',
      description:"when there is multiple panel in dashboard, the varialbe observer shuld be distinced by alias",
      defaultValue: 'page',
    })
})
