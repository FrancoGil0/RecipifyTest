"use client";

function ProductComponent({ onSubmit, categorias }) {

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">Título</span>
        <input type="text" className="form-control border border-dark" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name="titulo" />
      </div>
      <br />
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Descripción</span>
        <input type="text" className="form-control border border-dark" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="descripcion" />
      </div>

      <div className="input-group">
        <span className="input-group-text">Ingredientes</span>
        <textarea className="form-control border border-dark" aria-label="With textarea" name="ingredientes"></textarea >
      </div>

      <br />


<select className="form-select border border-dark" aria-label="Default select example" name="categoria">
        <option value="">Elegir categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
        ))}
      </select>
      <br />
<br />
<br />
      <br />
      <button className="btn btn-danger" type="submit">Enviar</button>
    </form>
  );
}

export default ProductComponent;
