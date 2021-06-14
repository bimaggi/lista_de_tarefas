 import React, { useState,useEffect } from 'react';
import './App.css';
import Form from './components/Form'
import Item from './components/Item';
import List from './components/List'
import Modal from './components/Modal';

const SAVED_ITEMS ='savedItems'

function App(){

  const [items, setItems]= useState([])
  const [show, setShowModal]= useState(false)

  useEffect(()=>{
    let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS))
    if(savedItems){
      setItems(savedItems)
    }
  },[]) //esse array vazio, é para que o useeffect renderize a pagina quando carregar a pagina a primeira vez e não sempre que houver aletração de states
  
  useEffect(()=>{
    //esse use effect é para que toda vez que alterar o item, isso seja salvo no locaStorage
      localStorage.setItem(SAVED_ITEMS, JSON.stringify(items))
  },[items])


  function onAddItem(text){
      let it = new Item(text)
    
    setItems([...items,it])
    onHideModal();
  }

  function onItemDeleted(item){
    let filterItems = items.filter(it => it.id !== item.id)
    setItems(filterItems)
  }

  function onDone(item){

    let updatedItems =items.map(it =>{
      if(it.id === item.id){
        it.done = !it.done
      }
      return it;
    })
    setItems(updatedItems);
  }

  function onHideModal(){
    setShowModal(false)
  }

  return (
    <>
    <div className="container">
      <header>
        <h1>Minhas tarefas</h1>
        <button onClick={()=>{setShowModal(true)}} className= "addButton">+</button>
      </header>
      <List onDone={onDone} items={items} onItemDeleted={onItemDeleted}/>
      <Modal show={show} onHideModal={onHideModal}><Form onAddItem={onAddItem}/></Modal>
      
    </div>
    <footer>
        <p><a href="https://www.linkedin.com/in/marcia-bimaggi-marcia-beserra-de-oliveira-9303801b9/" target="_blank"><strong>Copyright&copy 2021; Created and powered by Marcia Bimaggi</strong></a></p> 
    </footer>
   </>
    
  );
}

export default App;
