import file from '../interfaces/file'
import MockData from '../consts/mockup.json'
import { AiOutlineFolderOpen, AiFillFile } from 'react-icons/ai'

interface props {
    data: typeof MockData
    onClick: (e: file, isFolder: boolean, key: number) => void
}

const FileExplorer = ({ data, onClick }: props) => {
    return (
        <div className="list">
            {data.map((element) => {
                const isFolder = element.children !== undefined
                return (
                    <div
                        key={element.id}
                        className="element"
                        onClick={() => onClick(element as file, isFolder, element.id)}
                    >
                        {isFolder ? <AiOutlineFolderOpen size={30} /> : <AiFillFile size={30} />}
                        {element.name}
                    </div>
                )
            })}
        </div>
    )
}

export default FileExplorer
