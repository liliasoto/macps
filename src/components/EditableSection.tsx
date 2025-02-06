"use client"

import React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface EditableSectionProps {
  items: string[]
  onSave: (items: string[]) => void
  onCancel: () => void
}

const EditableSection: React.FC<EditableSectionProps> = ({ items, onSave, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [editedItems, setEditedItems] = useState(items)

  const handleChange = (value: string) => {
    const newItems = [...editedItems]
    newItems[currentIndex] = value
    setEditedItems(newItems)
  }

  const handleSave = () => {
    onSave(editedItems.filter((item) => item.trim() !== ""))
  }

  const handleNavigation = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction
      if (newIndex < 0) return 0
      if (newIndex >= editedItems.length) {
        setEditedItems([...editedItems, ""])
        return editedItems.length
      }
      return newIndex
    })
  }

  return (
    <div className="editable-section">
      <div className="navigation-controls">
        <button onClick={() => setCurrentIndex(0)} disabled={currentIndex === 0}>
          <ChevronsLeft size={20} />
        </button>
        <button onClick={() => handleNavigation(-1)} disabled={currentIndex === 0}>
          <ChevronLeft size={20} />
        </button>
        <span>
          {currentIndex + 1} / {editedItems.length}
        </span>
        <button onClick={() => handleNavigation(1)}>
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => setCurrentIndex(editedItems.length - 1)}
          disabled={currentIndex === editedItems.length - 1}
        >
          <ChevronsRight size={20} />
        </button>
      </div>
      <textarea
        value={editedItems[currentIndex] || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Ingrese el texto aquí..."
      />
      <div className="action-buttons">
        <button onClick={handleSave} className="btn-primary">
          Guardar
        </button>
        <button onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default EditableSection

