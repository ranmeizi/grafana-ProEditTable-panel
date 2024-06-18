import { PanelPlugin } from '@grafana/data';
import { AppOptions } from './types';
import { ProTablePanel } from 'components/ProTablePanel';
import HttpAddPartsEditor from 'components/HttpAddPartsEditor.tsx';

export const plugin = new PanelPlugin<AppOptions>(ProTablePanel).setPanelOptions((builder) => {
  return builder
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
