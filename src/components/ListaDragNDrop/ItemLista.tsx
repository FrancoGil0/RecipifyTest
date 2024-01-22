import { ingredient } from "@/interfaces/recipeInterfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ItemLista = (ingredient: ingredient ) => {

    const {attributes,listeners,setNodeRef,transform,transition} =useSortable({id:ingredient.id})
    const style={
        transform:CSS.Transform.toString(transform),
        transition
    }

    return (
        <div 
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="h-[30px] bg-stone-300 text-xl flex justify-between px-2 rounded-lg">
            <span>{ingredient.name}</span> <span>{ingredient.cuantity}</span>
        </div>
    )

}
export default ItemLista