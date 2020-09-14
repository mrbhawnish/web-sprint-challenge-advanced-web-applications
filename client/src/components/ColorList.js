import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const addColorState = {
  id: Date.now(),
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(addColorState);
  
  const editColor = color => {
    
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
    colors.map((element, i) => element.id === colors.id ? updateColors(res.data[i]) : null)
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
   axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      colors.filter((element, i) => element.id !== color.id)

    })
    .catch(err => console.log(err))
  };

  const addColor = () => {
   axiosWithAuth().post(`http://localhost:5000/api/colors`, colorToAdd)
   .then(res => console.log(res))
   .catch((err) => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                  e.stopPropagation()
                    deleteColor(color)
                  }
                } >
                  <Link onClick={() => window.location.reload(false)}>x</Link>
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
        
      <div className="spacer" >
      {/* stretch - build another form here to add a color */}
      
      <form onSubmit={addColor}>
      <legend>Add Your Color</legend>
     <label>
       Color Name:
        <input 
        type="text" 
        value={colorToAdd.color} 
        onChange={e =>
          setColorToAdd({ ...colorToAdd, color: e.target.value })
        }>
        </input>
        </label>
        <label>
            hex code:
        <input 
        type="text" 
        value={colorToAdd.code.hex}
        onChange={e => 
           setColorToAdd({ ...colorToAdd,
            code: {hex: e.target.value}})}>
        </input>
        </label>
        <button type="submit">Add Color</button>
      </form>
      </div>
    </div>
  );
};

export default ColorList;
