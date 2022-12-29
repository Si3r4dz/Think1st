import React from 'react'
import '../styles/App.css'
import MockData from '../consts/mockup.json'
import { useState } from 'react'
import { AiOutlineFolderOpen, AiFillFile, AiOutlineCaretLeft } from 'react-icons/ai'
interface file {
    id: number
    name: string
    children: Array<file>
}

const fileExplorer = (
    data: typeof MockData,
    onClick: (e: file, isFolder: boolean, key: number) => void
) => {
    return Object.entries(data).map(([key, element]) => {
        const isFolder = element.children !== undefined
        return (
            <div
                key={element.id}
                className={`${isFolder ? 'folder' : 'file'}`}
                onClick={() => onClick(element as file, isFolder, parseInt(key, 10))}
            >
                {isFolder ? <AiOutlineFolderOpen size={30} /> : <AiFillFile size={30} />}
                {element.name}
            </div>
        )
    })
}

const App = () => {
    const [folderName, setFolderName] = useState('Folder główny')
    const [selectedData, setSelectedData] = useState<typeof MockData>(MockData)
    const [selectedChildrenIDs, setSelectedChildrenIDs] = useState<number[]>([])

    const handleOnPrevButtonClick = () => {
        const tmp = selectedChildrenIDs
        let tempArr: any = MockData
        let name = ''
        tmp.pop()
        if (tmp.length === 0) {
            setSelectedData(MockData)
            setFolderName('Folder główny')
        } else {
            tmp.forEach((val) => {
                name = tempArr[val].name
                tempArr = tempArr[val].children
            })
            setFolderName(name)
            setSelectedData(tempArr)
        }
        tempArr = []
        setSelectedChildrenIDs(tmp)
    }

    const handleOnElementClick = (element: file, isFolder: boolean, key: number) => {
        if (!isFolder) alert(`Plik o nazwie ${element.name} został klikniety`)
        else {
            setSelectedData(element.children)
            setFolderName(element.name)
            setSelectedChildrenIDs((state) => [...state, key])
        }
    }

    return (
        <div className="container">
            <div className="file_box">
                <div className="title">
                    <AiOutlineCaretLeft onClick={handleOnPrevButtonClick} />
                    {folderName}
                </div>
                <div className="list">{fileExplorer(selectedData, handleOnElementClick)}</div>
            </div>
        </div>
    )
}

export default App
