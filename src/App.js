import React, {useState, useEffect, useRef} from "react";
import "./style.css";

//target: es el objeto que dispara el evento
//value: hace referencia al valor del control
const Form = ({showed}) =>{
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");

  //userRef es un hook que returna un objeto Mutable despues de recibir un objeto del DOM, es decir, cada vez que deseamos manipular uno de los objetos del DOM necesitamos usar en userRef.
  const firstInput = useRef();

  useEffect(()=>{
      //Actualizar el DOM es un efecto secundario.
      if(showed){
          console.log(firstInput);
          firstInput.current.focus();
      }
  }, [showed])

  const sendForm = (ev)=>{
    ev.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) =>{
          setTitle('')
          setBody('')
          console.log(json)
        }
      );
  }

  return (
      <form onSubmit={ (ev)=>sendForm(ev) }>
          <div>
            <label htmlFor="title">Título</label>
            <input type="text" value={title} id ="title" onChange={ (ev)=>setTitle(ev.target.value) } ref={firstInput} />
          </div>
          <div>
            <label htmlFor="body">Publicación</label>
            <textarea id ="body" value={body} onChange={ (ev)=>setBody(ev.target.value) }></textarea>
          </div>
          <input type="submit" value="Enviar"/>
      </form>
  );
}

const Accordion = ()=>{
  const[show, setShow] = useState(false)
  return (
    <div>
      <h1>Test Formulario</h1>
      <button onClick={()=>setShow(true)}>¡Show Form!</button>
      { show && <Form showed={show}/> /*showed: allows to place the focus on the form component*/} 
    </div>
  );
}

export default function App() {
  return (
    <div><Accordion /></div>
  );
}
