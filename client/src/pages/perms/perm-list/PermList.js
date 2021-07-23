import React, {useEffect, useRef, useState} from 'react'
import {add, del, edit, list, search, updateSort, getMenu} from "../../../api/perm";
import CommonTable from "../../../components/CommonTable";
import {Tag} from "antd";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import ModalForm from "./ModalForm";


const columns = [
    {
        align: "center",
        width: 250,
        title: "权限名称",
        dataIndex: "title",
    },
    {
        align: "center",
        title: "权限类型",
        dataIndex: "type",
        render: t => {
            if (t === 'menu') return <Tag color="cyan">菜单</Tag>
            return <Tag color="volcano">按钮</Tag>
        },
    },
    {
        align: "center",
        title: "URL/ACTION",
        dataIndex: "str",
        render: (a, record) => {
            if (record.type === 'menu') return <Tag color="cyan">{a}</Tag>
            return <Tag color="volcano">{record.str}</Tag>
        },
    }
]


const type = 'DragableBodyRow';

function PermList() {
    const [dragTarget, setDragTarget] = useState([]);//正在拖拽的行
    const [parents, setParents] = useState([])

    const tableRef = useRef(null)

    const DragableBodyRow = row => {
        const {index, record, className, style, ...restProps} = row
        const isCanDrag = ({record, index}, dragIndex) => {
            if (dragTarget?.type !== 'menu') return false
            if (record?.parentId === dragTarget.id) return false
            if (record?.parentId !== dragTarget?.parentId) return false //父元素移动到子元素
            return dragIndex !== index;
        }
        const ref = useRef();
        const [{isOver, dropClassName}, drop] = useDrop({
            accept: type,
            canDrop(obj, monitor) {
                const {index: dragIndex} = monitor.getItem() || {};
                return isCanDrag(row, dragIndex)
            },
            collect: monitor => {
                const {index: dragIndex} = monitor.getItem() || {};
                if (!isCanDrag(row, dragIndex)) return {}
                return {
                    isOver: monitor.isOver(),
                    dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
                };
            },
            drop: async item => {
                tableRef.current.setTableDataLoading(true)
                try {
                    await updateSort([{id: dragTarget.id, sort: index}, {id: record.id, sort: item.index}])
                    tableRef.current.fetchData()
                } catch (e) {
                    tableRef.current.setTableDataLoading(false)
                }
            },
        });
        const [, drag] = useDrag({
            type,
            item: {index},
            collect: monitor => ({
                isDragging: monitor.isDragging(),
            }),
        });
        drop(drag(ref));

        return (
            <tr
                ref={ref}
                className={`${className}${isOver ? dropClassName : ''}`}
                style={{cursor: 'move', ...style}}
                {...restProps}
                onMouseEnter={() => setDragTarget(record)}
            />
        );
    };

    useEffect(() => {
        getMenu().then(res => {
            setParents([{
                id: 0,
                title: "root"
            }, ...res.data])
        })
    }, [])
    return (
        <DndProvider backend={HTML5Backend}>
            <CommonTable
                ref={tableRef}
                columns={columns}
                api={{add, del, edit, list, search}}
                renderModal={arg => <ModalForm {...arg} menu={parents}/>}
                components={
                    {
                        body: {
                            row: DragableBodyRow,
                        }
                    }
                }
                onRow={(record, index) => ({index, record})}
            />
        </DndProvider>
    )
}

export default PermList