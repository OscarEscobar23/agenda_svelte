<script>
import { createEventDispatcher } from 'svelte';
import userStore from '../Controllers/directory-store';
import { fade, fly, slide, scale } from 'svelte/transition';
import { cubicIn, bounceInOut } from 'svelte/easing';
import { onMount } from 'svelte';
import axios from 'axios';


export let name="";
export let email="";
export let phone="";
export let id;


if(id){
  console.log(id);
  const unsubscribe = userStore.subscribe(items =>{
    const selectedContact = items.find (i => i.id ==id);
    name = selectedContact.name;
    email = selectedContact.email;
    phone = selectedContact.phone;
  });
  unsubscribe();
}

const dispatch = createEventDispatcher();

function addUser(){
 let usersData = {
    name: name, 
    email: email,
    phone: phone
  }
  if(id){

    fetch(`http://127.0.0.1:8000/api/contactos/${id}`,{
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        // id: usersData.id,
        name: usersData.name, 
        email: usersData.email,
        phone: usersData.phone
      }),
    }).then(res =>{
      if(!res){
                throw new Error('Fail');
            }

      userStore.updateUser(id,usersData);
      console.log(res);

    }).catch(err => {
      console.error(err);
    });
  
  }else{
    
    fetch('http://127.0.0.1:8000/api/contactos',{ 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        name: usersData.name, 
        email: usersData.email,
        phone: usersData.phone
      })
    }).then(res => {
      if(!res){
        throw new Error('Fail');
      }
      return res;
    }).then(data => {
      userStore.addUser({...usersData});
    }).catch(err =>{
      console.log(err);
    })
    
  };
  

  dispatch ('save');
};

function close(){
    dispatch ('closed');
}

function deleteUser(){
  
   console.log(id);
    fetch(`http://127.0.0.1:8000/api/contactos/${id}`,{
      method: 'DELETE'
      
    }).then(res => {
      if(!res.ok){
        throw new Error('Fail to delete');
      }
      console.log(res);
      userStore.removeContact(id);
    }).catch(err =>{
      console.log(err);
    })
    dispatch ('save');
  }

</script>
<style>
  .modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.modals {
  position: fixed;
  top: 10vh;
  left: 10%;
  width: 50%;
  max-height: 80vh;
  background: white;
  border-radius: 5px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding:1rem;
  margin:auto;
}
input {
  display: block;
  width: 100%;
  font: inherit;
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 3px 3px 0 0;
  background: white;
  padding: 0.15rem 0.25rem;
  transition: border-color 0.1s ease-out;
}
input:focus {
  border-color: #0599fa;
  outline: none;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
}
</style>
<div class="modal-backdrop" on:click={close}></div>
<div class="modals" transition:fly={{delay:250,duration:300,y:-500,easing:cubicIn}} >
    <form action="" class="form-control" on:submit|preventDefault="{addUser}">
        <label for="name">Nombre:</label>
        <input type="text" name="name" placeholder="Nombre" class="input-group" bind:value={name}  >
        <label for="email">Correo:</label>
        <input type="email" name="email" placeholder="Correo" class="input-group" bind:value={email}>
        <label for="phone">Telefono</label>
        <input type="text" name="phone" id="" placeholder="+52"class="input-group" bind:value ={phone}>
    </form>
    <button on:click="{addUser}">Guardar</button>
    <button on:click="{close}">Cerrar</button>
    <button on:click="{deleteUser}">Eliminar</button>
  
</div>