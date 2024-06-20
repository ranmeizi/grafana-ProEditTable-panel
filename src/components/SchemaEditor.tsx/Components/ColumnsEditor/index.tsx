// 完全替换
import { ProColumnType } from '@ant-design/pro-components';
import { Field, Input, Card, ToolbarButton, Collapse, IconButton, Button, HorizontalGroup, Modal } from '@grafana/ui';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DragDropContextProps } from 'react-beautiful-dnd';

export default function ColumnsEditor({ value, onChange }: any) {
  const [collapseKey, setCollapseKey] = useState(value?.[0]?.dataIndex);
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const onDragEnd: DragDropContextProps['onDragEnd'] = (result) => {
    // dropped outside the list
    if (!result.destination) {
      console.log('stop?');
      return;
    }

    const columns: any[] = value;
    // 交换
    const temp = columns.splice(result.source.index, 1);
    columns.splice(result.destination.index, 0, ...temp);

    onChange([...columns]);
  };

  // 打开 新增表单
  const onAdd = () => {
    setEditIndex(-1);
  };

  // 打开 编辑表单
  const onEdit = (index: number) => {
    setEditIndex(index);
  };

  // 新增
  const onFormAdd = (value) => {};

  // 编辑
  const onFormEdit = (index, value) => {};

  const onClose = () => {
    setEditIndex(undefined);
  };

  return (
    <>
      <Modal title="编辑列" isOpen={editIndex !== undefined} onDismiss={onClose} onClickBackdrop={onClose}>
        <div>hi,列编辑</div>
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided, snapshot) => (
            <div style={{ height: '100%', overflowY: 'auto' }} ref={provided.innerRef} {...provided.droppableProps}>
              {value.map((item: any, index: number) => (
                <Draggable key={item.dataIndex} draggableId={item.dataIndex} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <ColumnItem
                          value={item}
                          open={item.dataIndex === collapseKey}
                          onOpen={() => setCollapseKey(item.dataIndex)}
                          dragHandleProps={provided.dragHandleProps}
                          onEdit={() => onEdit(index)}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

type ColumnItemProps = {
  value: ProColumnType;
  open: boolean;
  onOpen: () => void;
  dragHandleProps: any;
  onEdit: () => void;
};

function ColumnItem({ value, open, onOpen, dragHandleProps, onEdit }: ColumnItemProps) {
  const { title, dataIndex } = value;
  return (
    <Card style={{ padding: 0 }} onMouseUp={onOpen}>
      <Card.Description>
        <div style={{ position: 'relative', display: 'flex', marginTop: '-8px', paddingLeft: '36px', width: '100%' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '36px' }} {...dragHandleProps}>
            <Button style={{ height: '100%', pointerEvents: 'none' }} icon="bars" variant="secondary" />
          </div>
          <div style={{ width: '100%' }}>
            <Collapse isOpen={open} label={<div style={{ textAlign: 'start' }}>{`${title}(${dataIndex})`}</div>}>
              <pre>{JSON.stringify(value, null, 4)}</pre>
            </Collapse>
            <div style={{ width: '100%' }}>
              <HorizontalGroup justify="flex-end">
                <Button icon="edit" variant="secondary" onClick={onEdit}></Button>
                <Button icon="trash-alt" variant="secondary"></Button>
              </HorizontalGroup>
            </div>
          </div>
        </div>
      </Card.Description>
    </Card>
  );
}
