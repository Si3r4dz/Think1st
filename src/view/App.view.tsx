import '../styles/App.css'
import MockData from '../consts/mockup.json'
import { useState } from 'react'
import { AiOutlineCaretLeft } from 'react-icons/ai'
import file from '../interfaces/file'
import FileExplorer from '../components/FileExplorer'

const mainFolderName = 'Folder główny'

const App = () => {
    const [folderName, setFolderName] = useState(mainFolderName)
    const [selectedData, setSelectedData] = useState<typeof MockData>(MockData)
    const [selectedChildrenIDs, setSelectedChildrenIDs] = useState<number[]>([])

    const handleOnPrevButtonClick = () => {
        const tmpIdTable = selectedChildrenIDs
        let tempArr = MockData
        let name = mainFolderName
        tmpIdTable.pop()
        if (tmpIdTable.length === 0) {
            setSelectedData(MockData)
            setFolderName(name)
        } else {
            tmpIdTable.forEach((val) => {
                const item = tempArr.filter((obj) => obj.id === val)[0]
                name += ` - ${item.name}`
                tempArr = item.children as Array<file>
            })
            setFolderName(name)
            setSelectedData(tempArr)
        }
        tempArr = []
        setSelectedChildrenIDs(tmpIdTable)
}

    const handleOnElementClick = (element: file, isFolder: boolean, key: number) => {
        if (!isFolder) alert(`Plik o nazwie ${element.name} został klikniety`)
        else {
            setSelectedData(element.children)
            setFolderName((state) => state + ` - ${element.name}`)
            setSelectedChildrenIDs((state) => [...state, key])
        }
    }

    return (
        <div className="container">
            <div className="file_box">
                <div className="title">
                    <span className="noselect">
                        <button onClick={handleOnPrevButtonClick} className="button" type='button' disabled={selectedChildrenIDs.length > 0 ? false : true}>
                            <AiOutlineCaretLeft />
                        </button>
                        {folderName}
                    </span>
                </div>
                <FileExplorer data={selectedData} onClick={handleOnElementClick} />
            </div>
        </div>
    )
}

export default App
