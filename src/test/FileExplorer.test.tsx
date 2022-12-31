import { render, fireEvent } from '@testing-library/react'
import FileExplorer from '../components/FileExplorer'
import mockData from '../consts/mockup.json'

const mockOnClick = jest.fn()

describe('FileExplorer component', () => {
    it('renders the component', () => {
        const { getByText } = render(<FileExplorer data={mockData} onClick={mockOnClick} />)

        expect(getByText('Folder 1')).toBeInTheDocument()
        expect(getByText('backup.tmp')).toBeInTheDocument()
    })

    it('calls the onClick function with the correct arguments when a folder is clicked', () => {
        const { getByText } = render(<FileExplorer data={mockData} onClick={mockOnClick} />)
        const folderElement = getByText('Folder 1')

        fireEvent.click(folderElement)

        expect(mockOnClick).toHaveBeenCalledWith(mockData['0'], true, mockData['0'].id)
    })

    it('calls the onClick function with the correct arguments when a file is clicked', () => {
        const { getByText } = render(<FileExplorer data={mockData} onClick={mockOnClick} />)
        const fileElement = getByText('backup.tmp')

        fireEvent.click(fileElement)

        expect(mockOnClick).toHaveBeenCalledWith(mockData['2'], false, mockData['2'].id)
    })
})
