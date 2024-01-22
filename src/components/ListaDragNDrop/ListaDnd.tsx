"use client"
import { useState } from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import ItemLista from "./ItemLista"


const ListaDND = () => {

    const [ingredients, setIngredients] = useState([
        { id: 1, name: "Harina", cuantity: "1kg" },
        { id: 2, name: "Levadura Seca", cuantity: "17gr" },
        { id: 3, name: "Agua", cuantity: "600ml" },
        { id: 4, name: "Sal", cuantity: "de 3 a 5 gr" }
    ])


    const handleDragEnd = () => {
        return "coso"
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
                items={ingredients}
                strategy={verticalListSortingStrategy}>
                <div className="p-5 flex flex-col gap-3">
                {ingredients.map((ingredient) => {
                    return <ItemLista id={ingredient.id} name={ingredient.name} cuantity={ingredient.cuantity} />
                })}
                </div>
            
            </SortableContext>

        </DndContext>
    )
}

export default ListaDND