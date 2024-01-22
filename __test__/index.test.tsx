import { fireEvent, render, screen } from "@testing-library/react";

import ProductComponent from "@/components/createProduct/receta";

 

const categorias = [

  { id: 1, name: 'Postres' },

  { id: 2, name: 'Platos principales' },

  { id: 3, name: 'Entrantes' },

];

describe("probando productComponent",()=>{

  test("verificamos tipos inputs", () => {

    const onSubmit = jest.fn();

    render(

      <ProductComponent onSubmit={onSubmit} categorias={categorias}/>

    )

    const input = document.querySelector('input[name="titulo"]');

    const texTarea = document.querySelector('textarea[name="ingredientes"]');

    expect(input).toHaveAttribute('type','text');

    expect(input).toHaveAttribute('type','text');

  })

  test("verificamos envio datos", () => {

   const onSubmit = jest.fn();

    render(

      <ProductComponent onSubmit={onSubmit} categorias={categorias}/>

    )

    const inputTitulo = document.querySelector('input[name="titulo"]')  as HTMLInputElement;

    const inputDescripcion = document.querySelector('input[name="descripcion"]') as HTMLInputElement;

    if(inputTitulo && inputDescripcion){

    fireEvent.change(inputTitulo, { target: { value: 'Fideos' } })

    fireEvent.change(inputDescripcion, { target: { value: 'con salsa' } })

    fireEvent.submit(screen.getByText("Enviar"));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(inputTitulo.value).toBe("Fideos")

    expect(inputDescripcion.value).toBe("con salsa")

    }

   

  })

  // test("comprobamos si funciona el llamado a esta api",  async() => {

  //   const res = await axios('http://localhost:3000/api/recetas');

  //   // const result = await res.json();

  //   expect(res.data.length).toBeGreaterThan(0);

  // })

})